import { getAuthHeaders } from '@/lib/auth-utils';
import {
  GetCarImagesParamSchemaType,
  GetCarImagesResponseSchema,
  GetCarImagesResponseSchemaType,
  GetPrimaryImageParamSchemaType,
  GetPrimaryImageResponseSchema,
  GetPrimaryImageResponseSchemaType,
  UploadImageParamSchemaType,
  UploadImageQuerySchemaType,
  UploadImageResponseSchema,
  UploadImageResponseSchemaType,
  BulkUploadImagesParamSchemaType,
  BulkUploadImagesRequestSchemaType,
  BulkUploadImagesResponseSchemaType,
  SetPrimaryImageParamSchemaType,
  SetPrimaryImageResponseSchema,
  SetPrimaryImageResponseSchemaType,
  ApproveImageParamSchemaType,
  ApproveImageResponseSchemaType,
  RejectImageParamSchemaType,
  RejectImageResponseSchemaType,
  DeleteImageParamSchemaType,
  DeleteImageResponseSchemaType,
  DeleteAllCarImagesParamSchemaType,
  DeleteAllCarImagesResponseSchemaType,
  ImageUploadProgress,
} from '@/schemas/car-images.schema';
import { z } from 'zod';

// GET CAR IMAGES
export async function getCarImages(params: GetCarImagesParamSchemaType): Promise<GetCarImagesResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${params.carId}/images`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch car images');
    }

    const data = await response.json();
    return GetCarImagesResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET PRIMARY IMAGE
export async function getPrimaryImage(
  params: GetPrimaryImageParamSchemaType
): Promise<GetPrimaryImageResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${params.carId}/images/primary`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch primary image');
    }

    const data = await response.json();
    return GetPrimaryImageResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// UPLOAD SINGLE IMAGE
export async function uploadImage(
  params: UploadImageParamSchemaType,
  file: File,
  query?: UploadImageQuerySchemaType
): Promise<UploadImageResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${params.carId}/images`);

  if (query?.isPrimary !== undefined) {
    url.searchParams.append('isPrimary', String(query.isPrimary));
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const authHeaders = await getAuthHeaders();
    // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
    const headers: Record<string, string> = {};
    if (authHeaders.Authorization) {
      headers.Authorization = authHeaders.Authorization;
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to upload image');
    }

    const data = await response.json();
    return UploadImageResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// BULK UPLOAD IMAGES (Client-side simulation - uploads one by one)
export async function bulkUploadImages(
  params: BulkUploadImagesParamSchemaType,
  request: BulkUploadImagesRequestSchemaType,
  onProgress?: (progress: ImageUploadProgress[]) => void
): Promise<BulkUploadImagesResponseSchemaType> {
  const { files, primaryIndex } = request;
  const uploadedImages: UploadImageResponseSchemaType[] = [];
  const failedFiles: { fileName: string; error: string }[] = [];

  // Initialize progress tracking
  const progressState: ImageUploadProgress[] = files.map((file) => ({
    fileName: file.name,
    status: 'pending',
  }));

  if (onProgress) {
    onProgress([...progressState]);
  }

  // Upload files one by one
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const isPrimary = primaryIndex === i;

    // Update status to uploading
    progressState[i].status = 'uploading';
    if (onProgress) {
      onProgress([...progressState]);
    }

    try {
      const uploadedImage = await uploadImage(params, file, { isPrimary });
      uploadedImages.push(uploadedImage);

      // Update status to success
      progressState[i].status = 'success';
      progressState[i].imageData = uploadedImage;
      if (onProgress) {
        onProgress([...progressState]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload';
      failedFiles.push({
        fileName: file.name,
        error: errorMessage,
      });

      // Update status to error
      progressState[i].status = 'error';
      progressState[i].error = errorMessage;
      if (onProgress) {
        onProgress([...progressState]);
      }
    }
  }

  return {
    uploadedImages,
    failedFiles: failedFiles.length > 0 ? failedFiles : undefined,
  };
}

// SET PRIMARY IMAGE
export async function setPrimaryImage(
  params: SetPrimaryImageParamSchemaType
): Promise<SetPrimaryImageResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/images/${params.imageId}/primary`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to set primary image');
    }

    const data = await response.json();
    return SetPrimaryImageResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// APPROVE IMAGE (Admin)
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

// REJECT IMAGE (Admin)
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

// DELETE IMAGE
export async function deleteImage(params: DeleteImageParamSchemaType): Promise<DeleteImageResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/images/${params.imageId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }
  } catch (error) {
    throw error;
  }
}

// DELETE ALL CAR IMAGES
export async function deleteAllCarImages(
  params: DeleteAllCarImagesParamSchemaType
): Promise<DeleteAllCarImagesResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${params.carId}/images`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete all car images');
    }
  } catch (error) {
    throw error;
  }
}
