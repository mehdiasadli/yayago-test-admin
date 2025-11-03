import z from 'zod';
import { idSchema } from './common.schema';

// IMAGE SCHEMA (already defined in vehicles.schema, but including here for completeness)
export const CarImageSchema = z.object({
  id: idSchema(),
  carId: idSchema('Car ID'),
  imageUrl: z.string(),
  imageName: z.string(),
  imageSize: z.number(),
  mimeType: z.string(),
  isPrimary: z.boolean(),
  uploadDate: z.coerce.date(),
  createdAt: z.coerce.date(),
});

// PARAMS
export const CarIdParamSchema = z.object({
  carId: idSchema('Car ID'),
});

export const ImageIdParamSchema = z.object({
  imageId: idSchema('Image ID'),
});

// GET CAR IMAGES
export const GetCarImagesParamSchema = CarIdParamSchema;
export const GetCarImagesResponseSchema = CarImageSchema.array();

// GET PRIMARY IMAGE
export const GetPrimaryImageParamSchema = CarIdParamSchema;
export const GetPrimaryImageResponseSchema = CarImageSchema;

// UPLOAD IMAGE
export const UploadImageParamSchema = CarIdParamSchema;
export const UploadImageQuerySchema = z.object({
  isPrimary: z.boolean().optional(),
});
export const UploadImageRequestSchema = z.object({
  file: z.instanceof(File),
});
export const UploadImageResponseSchema = CarImageSchema;

// BULK UPLOAD (client-side only - uploads one by one)
export const BulkUploadImagesParamSchema = CarIdParamSchema;
export const BulkUploadImagesRequestSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, 'At least one file is required'),
  primaryIndex: z.number().optional(), // Index of which file should be primary
});
export const BulkUploadImagesResponseSchema = z.object({
  uploadedImages: CarImageSchema.array(),
  failedFiles: z
    .array(
      z.object({
        fileName: z.string(),
        error: z.string(),
      })
    )
    .optional(),
});

// SET PRIMARY IMAGE
export const SetPrimaryImageParamSchema = ImageIdParamSchema;
export const SetPrimaryImageResponseSchema = CarImageSchema;

// APPROVE IMAGE (Admin)
export const ApproveImageParamSchema = ImageIdParamSchema;
export const ApproveImageResponseSchema = z.void();

// REJECT IMAGE (Admin)
export const RejectImageParamSchema = ImageIdParamSchema;
export const RejectImageResponseSchema = z.void();

// DELETE IMAGE
export const DeleteImageParamSchema = ImageIdParamSchema;
export const DeleteImageResponseSchema = z.void();

// DELETE ALL CAR IMAGES
export const DeleteAllCarImagesParamSchema = CarIdParamSchema;
export const DeleteAllCarImagesResponseSchema = z.void();

// === TYPES ===

export type CarImageSchemaType = z.infer<typeof CarImageSchema>;
export type CarIdParamSchemaType = z.infer<typeof CarIdParamSchema>;
export type ImageIdParamSchemaType = z.infer<typeof ImageIdParamSchema>;

export type GetCarImagesParamSchemaType = z.infer<typeof GetCarImagesParamSchema>;
export type GetCarImagesResponseSchemaType = z.infer<typeof GetCarImagesResponseSchema>;

export type GetPrimaryImageParamSchemaType = z.infer<typeof GetPrimaryImageParamSchema>;
export type GetPrimaryImageResponseSchemaType = z.infer<typeof GetPrimaryImageResponseSchema>;

export type UploadImageParamSchemaType = z.infer<typeof UploadImageParamSchema>;
export type UploadImageQuerySchemaType = z.infer<typeof UploadImageQuerySchema>;
export type UploadImageRequestSchemaType = z.infer<typeof UploadImageRequestSchema>;
export type UploadImageResponseSchemaType = z.infer<typeof UploadImageResponseSchema>;

export type BulkUploadImagesParamSchemaType = z.infer<typeof BulkUploadImagesParamSchema>;
export type BulkUploadImagesRequestSchemaType = z.infer<typeof BulkUploadImagesRequestSchema>;
export type BulkUploadImagesResponseSchemaType = z.infer<typeof BulkUploadImagesResponseSchema>;

export type SetPrimaryImageParamSchemaType = z.infer<typeof SetPrimaryImageParamSchema>;
export type SetPrimaryImageResponseSchemaType = z.infer<typeof SetPrimaryImageResponseSchema>;

export type ApproveImageParamSchemaType = z.infer<typeof ApproveImageParamSchema>;
export type ApproveImageResponseSchemaType = z.infer<typeof ApproveImageResponseSchema>;

export type RejectImageParamSchemaType = z.infer<typeof RejectImageParamSchema>;
export type RejectImageResponseSchemaType = z.infer<typeof RejectImageResponseSchema>;

export type DeleteImageParamSchemaType = z.infer<typeof DeleteImageParamSchema>;
export type DeleteImageResponseSchemaType = z.infer<typeof DeleteImageResponseSchema>;

export type DeleteAllCarImagesParamSchemaType = z.infer<typeof DeleteAllCarImagesParamSchema>;
export type DeleteAllCarImagesResponseSchemaType = z.infer<typeof DeleteAllCarImagesResponseSchema>;

// Helper types for bulk upload progress tracking
export type ImageUploadProgress = {
  fileName: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
  imageData?: CarImageSchemaType;
};
