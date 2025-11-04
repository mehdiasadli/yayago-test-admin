import z from 'zod';
import { idSchema } from './common.schema';

// REVIEW SCHEMA
export const ReviewSchema = z.object({
  id: idSchema(),
  carId: idSchema('Car ID'),
  userId: idSchema('User ID'),
  userFullName: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
});

// REVIEW REQUEST SCHEMA
export const ReviewRequestSchema = z.object({
  carId: idSchema('Car ID'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().optional(),
});

// ADD REVIEW
export const AddReviewRequestSchema = ReviewRequestSchema;
export const AddReviewResponseSchema = ReviewSchema;

// UPDATE REVIEW
export const UpdateReviewParamSchema = z.object({
  reviewId: idSchema('Review ID'),
});
export const UpdateReviewRequestSchema = ReviewRequestSchema.partial();
export const UpdateReviewResponseSchema = ReviewSchema;

// DELETE REVIEW
export const DeleteReviewParamSchema = z.object({
  reviewId: idSchema('Review ID'),
});
export const DeleteReviewResponseSchema = z.void();

// GET MY REVIEWS
export const GetMyReviewsResponseSchema = ReviewSchema.array();

// GET REVIEWS BY CAR ID
export const GetReviewsByCarIdParamSchema = z.object({
  carId: idSchema('Car ID'),
});
export const GetReviewsByCarIdResponseSchema = ReviewSchema.array();

// GET REVIEW COUNT
export const GetReviewCountParamSchema = z.object({
  carId: idSchema('Car ID'),
});
export const GetReviewCountResponseSchema = z.number();

// GET AVERAGE RATING
export const GetAverageRatingParamSchema = z.object({
  carId: idSchema('Car ID'),
});
export const GetAverageRatingResponseSchema = z.number();

// GET ALL REVIEWS (ADMIN) - with optional filters
export const GetAllReviewsQuerySchema = z.object({
  carId: z.number().optional(),
  userId: z.number().optional(),
});
export const GetAllReviewsResponseSchema = ReviewSchema.array();

// DELETE REVIEW BY ADMIN
export const DeleteReviewByAdminParamSchema = z.object({
  reviewId: idSchema('Review ID'),
});
export const DeleteReviewByAdminResponseSchema = z.void();

// === TYPES ===

export type ReviewSchemaType = z.infer<typeof ReviewSchema>;
export type ReviewRequestSchemaType = z.infer<typeof ReviewRequestSchema>;

export type AddReviewRequestSchemaType = z.infer<typeof AddReviewRequestSchema>;
export type AddReviewResponseSchemaType = z.infer<typeof AddReviewResponseSchema>;

export type UpdateReviewParamSchemaType = z.infer<typeof UpdateReviewParamSchema>;
export type UpdateReviewRequestSchemaType = z.infer<typeof UpdateReviewRequestSchema>;
export type UpdateReviewResponseSchemaType = z.infer<typeof UpdateReviewResponseSchema>;

export type DeleteReviewParamSchemaType = z.infer<typeof DeleteReviewParamSchema>;
export type DeleteReviewResponseSchemaType = z.infer<typeof DeleteReviewResponseSchema>;

export type GetMyReviewsResponseSchemaType = z.infer<typeof GetMyReviewsResponseSchema>;

export type GetReviewsByCarIdParamSchemaType = z.infer<typeof GetReviewsByCarIdParamSchema>;
export type GetReviewsByCarIdResponseSchemaType = z.infer<typeof GetReviewsByCarIdResponseSchema>;

export type GetReviewCountParamSchemaType = z.infer<typeof GetReviewCountParamSchema>;
export type GetReviewCountResponseSchemaType = z.infer<typeof GetReviewCountResponseSchema>;

export type GetAverageRatingParamSchemaType = z.infer<typeof GetAverageRatingParamSchema>;
export type GetAverageRatingResponseSchemaType = z.infer<typeof GetAverageRatingResponseSchema>;

export type GetAllReviewsQuerySchemaType = z.infer<typeof GetAllReviewsQuerySchema>;
export type GetAllReviewsResponseSchemaType = z.infer<typeof GetAllReviewsResponseSchema>;

export type DeleteReviewByAdminParamSchemaType = z.infer<typeof DeleteReviewByAdminParamSchema>;
export type DeleteReviewByAdminResponseSchemaType = z.infer<typeof DeleteReviewByAdminResponseSchema>;
