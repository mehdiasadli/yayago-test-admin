import { getSession } from 'next-auth/react';

/**
 * Get the current access token on the client side
 * @returns The access token or null if not authenticated
 */
export async function getToken(): Promise<string | null> {
  const session = await getSession();
  return session?.accessToken ?? null;
}

/**
 * Get authorization headers with the current access token
 * @returns Headers object with Authorization header or empty object if not authenticated
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}
