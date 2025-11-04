'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Star } from 'lucide-react';
import { ReviewCard } from '@/components/reviews/review-card';
import { VehicleDetailsReviewsSectionNotFound } from './vehicle-details-reviews-section-not-found';
import { VehicleDetailsReviewsSectionLoading } from './vehicle-details-reviews-section-loading';
import { createGetReviewsByCarIdQueryOptions } from '@/features/reviews/reviews.queries';
import { useQuery } from '@tanstack/react-query';

interface VehicleDetailsReviewsSectionProps {
  carId: number;
  averageRating: number | null | undefined;
}

export default function VehicleDetailsReviewsSection({ carId, averageRating }: VehicleDetailsReviewsSectionProps) {
  const { data: reviews, isLoading } = useQuery(createGetReviewsByCarIdQueryOptions({ carId }));

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <CardTitle className='flex items-center gap-2'>
              <MessageSquare className='h-5 w-5' />
              Customer Reviews
            </CardTitle>
            <CardDescription>
              {reviews && reviews.length > 0
                ? `Based on ${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`
                : 'Customer feedback and ratings'}
            </CardDescription>
            {reviews && reviews.length > 0 && (
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
                  {averageRating && (
                    <span className='text-sm font-semibold text-foreground'>{averageRating.toFixed(1)}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <VehicleDetailsReviewsSectionLoading />
        ) : reviews && reviews.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showActions={false} />
            ))}
          </div>
        ) : (
          <VehicleDetailsReviewsSectionNotFound />
        )}
      </CardContent>
    </Card>
  );
}
