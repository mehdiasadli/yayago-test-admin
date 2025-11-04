import { getAuthHeaders } from '@/lib/auth-utils';
import {
  AddReviewRequestSchemaType,
  AddReviewResponseSchema,
  AddReviewResponseSchemaType,
  DeleteReviewParamSchemaType,
  DeleteReviewResponseSchemaType,
  GetAverageRatingParamSchemaType,
  GetAverageRatingResponseSchema,
  GetAverageRatingResponseSchemaType,
  GetMyReviewsResponseSchema,
  GetMyReviewsResponseSchemaType,
  GetReviewCountParamSchemaType,
  GetReviewCountResponseSchema,
  GetReviewCountResponseSchemaType,
  GetReviewsByCarIdParamSchemaType,
  GetReviewsByCarIdResponseSchema,
  GetReviewsByCarIdResponseSchemaType,
  UpdateReviewParamSchemaType,
  UpdateReviewRequestSchemaType,
  UpdateReviewResponseSchema,
  UpdateReviewResponseSchemaType,
} from '@/schemas/reviews.schema';
import { z } from 'zod';

// ADD REVIEW
export async function addReview(body: AddReviewRequestSchemaType): Promise<AddReviewResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`;

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
      throw new Error('Failed to add review');
    }

    const data = await response.json();
    return AddReviewResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// UPDATE REVIEW
export async function updateReview(
  params: UpdateReviewParamSchemaType,
  body: UpdateReviewRequestSchemaType
): Promise<UpdateReviewResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${params.reviewId}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update review');
    }

    const data = await response.json();
    return UpdateReviewResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// DELETE REVIEW
export async function deleteReview(params: DeleteReviewParamSchemaType): Promise<DeleteReviewResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${params.reviewId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete review');
    }
  } catch (error) {
    throw error;
  }
}

// GET MY REVIEWS
export async function getMyReviews(): Promise<GetMyReviewsResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/my-reviews`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch my reviews');
    }

    const data = await response.json();
    return GetMyReviewsResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET REVIEWS BY CAR ID
export async function getReviewsByCarId(
  params: GetReviewsByCarIdParamSchemaType
): Promise<GetReviewsByCarIdResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/cars/${params.carId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    return GetReviewsByCarIdResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET REVIEW COUNT
export async function getReviewCount(params: GetReviewCountParamSchemaType): Promise<GetReviewCountResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/cars/${params.carId}/count`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch review count');
    }

    const data = await response.json();
    return GetReviewCountResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET AVERAGE RATING
export async function getAverageRating(
  params: GetAverageRatingParamSchemaType
): Promise<GetAverageRatingResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/cars/${params.carId}/average-rating`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch average rating');
    }

    const data = await response.json();
    return GetAverageRatingResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}
