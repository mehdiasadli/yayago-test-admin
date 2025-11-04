import {
  GetAverageRatingParamSchemaType,
  GetAllReviewsQuerySchemaType,
  GetReviewCountParamSchemaType,
  GetReviewsByCarIdParamSchemaType,
  UpdateReviewParamSchemaType,
} from '@/schemas/reviews.schema';

export const reviewsKeys = {
  all: ['reviews'] as const,
  lists: () => [...reviewsKeys.all, 'list'] as const,
  myReviews: () => [...reviewsKeys.lists(), 'my-reviews'] as const,
  byCarId: (params: GetReviewsByCarIdParamSchemaType) => [...reviewsKeys.lists(), 'by-car', params] as const,
  allReviews: (query?: GetAllReviewsQuerySchemaType) => [...reviewsKeys.lists(), 'all', query] as const,
  details: () => [...reviewsKeys.all, 'detail'] as const,
  detail: (params: UpdateReviewParamSchemaType) => [...reviewsKeys.details(), params] as const,
  reviewCount: (params: GetReviewCountParamSchemaType) => [...reviewsKeys.byCarId(params), 'count'] as const,
  averageRating: (params: GetAverageRatingParamSchemaType) =>
    [...reviewsKeys.byCarId(params), 'average-rating'] as const,
};
