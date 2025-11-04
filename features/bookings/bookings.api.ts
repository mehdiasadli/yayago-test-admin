import { getAuthHeaders } from '@/lib/auth-utils';
import {
  CreateBookingRequestSchemaType,
  CreateBookingResponseSchema,
  CreateBookingResponseSchemaType,
  GetBookingByIdParamSchemaType,
  GetBookingByIdResponseSchema,
  GetBookingByIdResponseSchemaType,
  GetBookingsByUserIdParamSchemaType,
  GetBookingsByUserIdResponseSchema,
  GetBookingsByUserIdResponseSchemaType,
  SetBookingStatusParamSchemaType,
  SetBookingStatusQuerySchemaType,
  SetBookingStatusResponseSchema,
  SetBookingStatusResponseSchemaType,
} from '@/schemas/bookings.schema';
import { z } from 'zod';

// CREATE BOOKING
export async function createBooking(body: CreateBookingRequestSchemaType): Promise<CreateBookingResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/create`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    const data = await response.json();
    return CreateBookingResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET BOOKING BY ID
export async function getBookingById(params: GetBookingByIdParamSchemaType): Promise<GetBookingByIdResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${params.bookingId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }

    const data = await response.json();
    return GetBookingByIdResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET BOOKINGS BY USER ID
export async function getBookingsByUserId(
  params: GetBookingsByUserIdParamSchemaType
): Promise<GetBookingsByUserIdResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user/${params.userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user bookings');
    }

    const data = await response.json();
    return GetBookingsByUserIdResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// UPDATE BOOKING STATUS
export async function updateBookingStatus(
  params: SetBookingStatusParamSchemaType,
  query: SetBookingStatusQuerySchemaType
): Promise<SetBookingStatusResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${params.bookingId}/status`);
  url.searchParams.append('status', query.status);

  try {
    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to update booking status');
    }

    const data = await response.json();
    return SetBookingStatusResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}
