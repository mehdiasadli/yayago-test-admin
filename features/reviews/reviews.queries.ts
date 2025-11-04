import { queryOptions } from '@tanstack/react-query';
import { getAllReviews, getAverageRating, getMyReviews, getReviewCount, getReviewsByCarId } from './reviews.api';
import { reviewsKeys } from './reviews.keys';
import {
  GetAllReviewsQuerySchemaType,
  GetAverageRatingParamSchemaType,
  GetReviewCountParamSchemaType,
  GetReviewsByCarIdParamSchemaType,
} from '@/schemas/reviews.schema';

// GET MY REVIEWS
export function createGetMyReviewsQueryOptions() {
  return queryOptions({
    queryKey: reviewsKeys.myReviews(),
    queryFn: () => getMyReviews(),
  });
}

// GET REVIEWS BY CAR ID
export function createGetReviewsByCarIdQueryOptions(params: GetReviewsByCarIdParamSchemaType) {
  return queryOptions({
    queryKey: reviewsKeys.byCarId(params),
    queryFn: () => getReviewsByCarId(params),
  });
}

// GET REVIEW COUNT
export function createGetReviewCountQueryOptions(params: GetReviewCountParamSchemaType) {
  return queryOptions({
    queryKey: reviewsKeys.reviewCount(params),
    queryFn: () => getReviewCount(params),
  });
}

// GET AVERAGE RATING
export function createGetAverageRatingQueryOptions(params: GetAverageRatingParamSchemaType) {
  return queryOptions({
    queryKey: reviewsKeys.averageRating(params),
    queryFn: () => getAverageRating(params),
  });
}

// GET ALL REVIEWS (ADMIN) - with optional filters
export function createGetAllReviewsQueryOptions(query?: GetAllReviewsQuerySchemaType) {
  return queryOptions({
    queryKey: reviewsKeys.allReviews(query),
    queryFn: () => getAllReviews(query),
  });
}
