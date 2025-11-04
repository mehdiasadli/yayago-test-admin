import z from 'zod';
import { idSchema } from './common.schema';
import { CarImageSchema, ImageStatusEnum } from './car-images.schema';

// GET PENDING IMAGES
export const GetPendingImagesQuerySchema = z.object({
  carId: z.number().optional(),
});
export const GetPendingImagesResponseSchema = CarImageSchema.array();

// APPROVE IMAGE (Admin)
export const ApproveImageParamSchema = z.object({
  imageId: idSchema('Image ID'),
});
export const ApproveImageResponseSchema = z.void();

// REJECT IMAGE (Admin)
export const RejectImageParamSchema = z.object({
  imageId: idSchema('Image ID'),
});
export const RejectImageResponseSchema = z.void();

// === TYPES ===

export type GetPendingImagesQuerySchemaType = z.infer<typeof GetPendingImagesQuerySchema>;
export type GetPendingImagesResponseSchemaType = z.infer<typeof GetPendingImagesResponseSchema>;

export type ApproveImageParamSchemaType = z.infer<typeof ApproveImageParamSchema>;
export type ApproveImageResponseSchemaType = z.infer<typeof ApproveImageResponseSchema>;

export type RejectImageParamSchemaType = z.infer<typeof RejectImageParamSchema>;
export type RejectImageResponseSchemaType = z.infer<typeof RejectImageResponseSchema>;

export { ImageStatusEnum };
export type { ImageStatusEnumType } from './car-images.schema';
