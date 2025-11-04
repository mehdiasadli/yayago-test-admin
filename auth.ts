import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  LoginResponseSchema,
  LoginSchema,
  LoginUserResponseSchema,
  RefreshTokenResponseSchema,
} from './schemas/auth.schema';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  phoneNumber: string;
  createdAt: string;
  avatarUrl: string | null;
  accessToken: string;
  refreshToken: string;
}

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends AuthUser {}

  interface Session {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends AuthUser {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }
}

export const ACCESS_TOKEN_TTL = 15 * 60; // 15 minutes
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60; // 30 days

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const body = LoginSchema.parse(credentials);

          console.log('Sending login request to /api/auth/login...', body);

          const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            console.error('Login request failed:', loginResponse.statusText, errorData);
            return null;
          }

          const loginData = LoginResponseSchema.parse(await loginResponse.json());

          console.log('Login request successful:', loginData);

          // Check if user is ADMIN
          if (loginData.role !== 'ADMIN') {
            console.error('Access denied: User is not an admin');
            return null;
          }

          console.log(`Sending user request to /api/users/${loginData.userId}...`);

          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${loginData.userId}`, {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
          });

          if (!userResponse.ok) {
            console.error('User request failed:', userResponse.statusText);
            return null;
          }

          const usersResponseData = await userResponse.json();

          console.log('Users response data:', usersResponseData);

          const userData = LoginUserResponseSchema.parse(usersResponseData);

          console.log('User request successful:', userData);

          return {
            id: String(userData.id),
            name: userData.fullName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            avatarUrl: userData.avatarUrl,
            createdAt: userData.createdAt.toISOString(),
            accessToken: loginData.token,
            refreshToken: loginData.refreshToken,
          } as AuthUser;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: REFRESH_TOKEN_TTL,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign-in: populate token with user data
      if (user) {
        return {
          ...user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_TTL,
        };
      }

      // If update is called with data, use that data directly
      if (trigger === 'update' && session) {
        return {
          ...token,
          ...session,
        };
      }

      // Check if token needs refresh
      const now = Math.floor(Date.now() / 1000);
      const isExpired = token.expiresAt <= now;
      const shouldProactivelyRefresh = token.expiresAt - now < 60;

      if (isExpired || shouldProactivelyRefresh) {
        try {
          console.log('Refreshing token...');

          const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: token.refreshToken,
            }),
          });

          if (!refreshResponse.ok) {
            console.error('Token refresh failed:', refreshResponse.status);
            return null;
          }

          const refreshTokenData = RefreshTokenResponseSchema.parse(await refreshResponse.json());

          return {
            ...token,
            accessToken: refreshTokenData.token,
            expiresAt: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_TTL,
          };
        } catch (error) {
          console.error('Error refreshing token:', error);
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.user.id = token.id;
        session.user.email = token.email || '';
        session.user.name = token.name || '';
        session.user.role = token.role;
        session.user.phoneNumber = token.phoneNumber;
        session.user.avatarUrl = token.avatarUrl;
        session.user.createdAt = token.createdAt;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiresAt = token.expiresAt;
      }
      return session;
    },
  },
});
