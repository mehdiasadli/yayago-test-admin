import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReview, deleteReview, deleteReviewByAdmin, updateReview } from './reviews.api';
import { reviewsKeys } from './reviews.keys';
import {
  AddReviewRequestSchemaType,
  DeleteReviewByAdminParamSchemaType,
  DeleteReviewParamSchemaType,
  UpdateReviewParamSchemaType,
  UpdateReviewRequestSchemaType,
} from '@/schemas/reviews.schema';

// ADD REVIEW
export function useAddReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddReviewRequestSchemaType) => addReview(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.myReviews() });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.byCarId({ carId: data.carId }) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.reviewCount({ carId: data.carId }) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.averageRating({ carId: data.carId }) });
    },
  });
}

// UPDATE REVIEW
export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params, body }: { params: UpdateReviewParamSchemaType; body: UpdateReviewRequestSchemaType }) =>
      updateReview(params, body),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.detail(variables.params) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.myReviews() });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.byCarId({ carId: data.carId }) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.averageRating({ carId: data.carId }) });
    },
  });
}

// DELETE REVIEW
export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params, carId }: { params: DeleteReviewParamSchemaType; carId: number }) => deleteReview(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.myReviews() });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.byCarId({ carId: variables.carId }) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.reviewCount({ carId: variables.carId }) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.averageRating({ carId: variables.carId }) });
    },
  });
}

// DELETE REVIEW BY ADMIN
export function useDeleteReviewByAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params, carId }: { params: DeleteReviewByAdminParamSchemaType; carId: number }) =>
      deleteReviewByAdmin(params),
    onSuccess: (_, variables) => {
      // Invalidate all review-related queries to refresh data
      queryClient.invalidateQueries({ queryKey: reviewsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.byCarId({ carId: variables.carId }) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.reviewCount({ carId: variables.carId }) });
      queryClient.invalidateQueries({ queryKey: reviewsKeys.averageRating({ carId: variables.carId }) });
    },
  });
}
