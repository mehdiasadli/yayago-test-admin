import { getAuthHeaders } from '@/lib/auth-utils';
import {
  ApproveImageParamSchemaType,
  ApproveImageResponseSchemaType,
  GetPendingImagesQuerySchemaType,
  GetPendingImagesResponseSchema,
  GetPendingImagesResponseSchemaType,
  RejectImageParamSchemaType,
  RejectImageResponseSchemaType,
} from '@/schemas/admin-images.schema';
import { z } from 'zod';

// GET PENDING IMAGES
export async function getPendingImages(
  query?: GetPendingImagesQuerySchemaType
): Promise<GetPendingImagesResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/images/pending`);

  if (query?.carId !== undefined) {
    url.searchParams.append('carId', String(query.carId));
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pending images');
    }

    const data = await response.json();
    return GetPendingImagesResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// APPROVE IMAGE
export async function approveImage(params: ApproveImageParamSchemaType): Promise<ApproveImageResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/admin/images/${params.imageId}/approve`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to approve image');
    }
  } catch (error) {
    throw error;
  }
}

// REJECT IMAGE
export async function rejectImage(params: RejectImageParamSchemaType): Promise<RejectImageResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/admin/images/${params.imageId}/reject`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to reject image');
    }
  } catch (error) {
    throw error;
  }
}
