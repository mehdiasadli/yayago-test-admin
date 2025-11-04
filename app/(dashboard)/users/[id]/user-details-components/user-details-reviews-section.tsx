'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MessageSquare, Star } from 'lucide-react';
import { ReviewCard } from '@/components/reviews/review-card';
import { UserDetailsReviewsSectionNotFound } from './user-details-reviews-section-not-found';
import { UserDetailsReviewsSectionLoading } from './user-details-reviews-section-loading';
import { createGetAllReviewsQueryOptions } from '@/features/reviews/reviews.queries';
import { useQuery } from '@tanstack/react-query';

interface UserDetailsReviewsSectionProps {
  userId: number;
}

export default function UserDetailsReviewsSection({ userId }: UserDetailsReviewsSectionProps) {
  // Fetch reviews for the specific user using the admin endpoint with userId filter
  const { data: reviews, isLoading } = useQuery(createGetAllReviewsQueryOptions({ userId }));

  // Calculate average rating from reviews
  const averageRating =
    reviews && reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : null;

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <CardTitle className='flex items-center gap-2'>
              <MessageSquare className='h-5 w-5' />
              User Reviews
            </CardTitle>
            <CardDescription>
              {reviews && reviews.length > 0
                ? `${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'} written`
                : 'Reviews written by this user'}
            </CardDescription>
            {reviews && reviews.length > 0 && averageRating && (
              <div className='flex items-center gap-4 pt-1'>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          averageRating && index < Math.round(averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-sm font-semibold text-foreground'>{averageRating.toFixed(1)}</span>
                  <span className='text-xs text-muted-foreground'>average rating</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <UserDetailsReviewsSectionLoading />
        ) : reviews && reviews.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showActions={true} variant='vehicle' />
            ))}
          </div>
        ) : (
          <UserDetailsReviewsSectionNotFound />
        )}
      </CardContent>
    </Card>
  );
}
