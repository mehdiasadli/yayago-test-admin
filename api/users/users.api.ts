import { getAuthHeaders } from '@/lib/auth-utils';
import {
  CreateUserRequestSchemaType,
  CreateUserResponseSchema,
  CreateUserResponseSchemaType,
  DeleteUserParamSchemaType,
  DeleteUserResponseSchema,
  DeleteUserResponseSchemaType,
  GetUserBookingsActiveCountParamSchemaType,
  GetUserBookingsActiveCountResponseSchema,
  GetUserBookingsActiveCountResponseSchemaType,
  GetUserBookingsCountParamSchemaType,
  GetUserBookingsCountResponseSchema,
  GetUserBookingsCountResponseSchemaType,
  GetUserBookingsParamSchemaType,
  GetUserBookingsResponseSchema,
  GetUserBookingsResponseSchemaType,
  GetUserByIdParamSchemaType,
  GetUserByIdResponseSchema,
  GetUserByIdResponseSchemaType,
  GetUsersQuerySchemaType,
  GetUsersResponseSchema,
  GetUsersResponseSchemaType,
  SetUserStatusParamSchemaType,
  SetUserStatusRequestSchemaType,
  SetUserStatusResponseSchema,
  SetUserStatusResponseSchemaType,
} from '@/schemas/users.schema';
import qs from 'qs';
import z from 'zod';

export async function getUsers(query: GetUsersQuerySchemaType): Promise<GetUsersResponseSchemaType> {
  const queryString = qs.stringify(query);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?${queryString ? `${queryString}` : 'page=0'}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();

    return GetUsersResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}

export async function getUserById(params: GetUserByIdParamSchemaType): Promise<GetUserByIdResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${params.userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the user');
    }

    const data = await response.json();

    return GetUserByIdResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}

export async function deleteUser(params: DeleteUserParamSchemaType): Promise<DeleteUserResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${params.userId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete the user');
    }

    return DeleteUserResponseSchema.parse(undefined);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}

export async function setUserStatus(
  params: SetUserStatusParamSchemaType,
  body: SetUserStatusRequestSchemaType
): Promise<SetUserStatusResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${params.userId}/status`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        ...(await getAuthHeaders()),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update user status');
    }

    return SetUserStatusResponseSchema.parse(undefined);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}

export async function getUserBookings(
  params: GetUserBookingsParamSchemaType
): Promise<GetUserBookingsResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${params.userId}/bookings`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user bookings');
    }

    const data = await response.json();

    return GetUserBookingsResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}

export async function getUserBookingsCount(
  params: GetUserBookingsCountParamSchemaType
): Promise<GetUserBookingsCountResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${params.userId}/bookings/count`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user bookings count');
    }

    const data = await response.json();

    return GetUserBookingsCountResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}

export async function getUserBookingsActiveCount(
  params: GetUserBookingsActiveCountParamSchemaType
): Promise<GetUserBookingsActiveCountResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${params.userId}/bookings/active/count`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user active bookings count');
    }

    const data = await response.json();

    return GetUserBookingsActiveCountResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}

export async function createUser(body: CreateUserRequestSchemaType): Promise<CreateUserResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();

    return CreateUserResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }

    throw error;
  }
}
