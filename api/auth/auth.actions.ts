'use server';

import { signIn } from '@/auth';
import { LoginSchema, LoginSchemaType } from '@/schemas/auth.schema';
import { AuthError } from 'next-auth';

export async function login(credentials: LoginSchemaType) {
  try {
    const body = LoginSchema.parse(credentials);

    const result = await signIn('credentials', {
      email: body.email,
      password: body.password,
      redirect: false,
    });

    if (!result) {
      return { success: false, error: 'Invalid credentials' };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid email or password' };
        default:
          return { success: false, error: 'Authentication failed. Please try again.' };
      }
    }

    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}
