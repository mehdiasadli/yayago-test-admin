'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Star } from 'lucide-react';
import { ReviewCard } from '@/components/reviews/review-card';
import { ReviewSchemaType } from '@/schemas/reviews.schema';
import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { Skeleton } from '@/components/ui/skeleton';

interface VehicleDetailsReviewsSectionProps {
  reviews?: ReviewSchemaType[];
  vehicle: VehicleSchemaType;
  isLoading: boolean;
}

export default function VehicleDetailsReviewsSection({
  reviews,
  vehicle,
  isLoading,
}: VehicleDetailsReviewsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <MessageSquare className='h-5 w-5' />
              Customer Reviews
            </CardTitle>
            <CardDescription>
              {reviews && reviews.length > 0 ? (
                <div className='flex items-center gap-4 mt-2'>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            vehicle?.averageRating && index < Math.round(vehicle.averageRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-muted text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    {vehicle?.averageRating && (
                      <span className='text-sm font-semibold text-foreground'>{vehicle.averageRating.toFixed(1)}</span>
                    )}
                  </div>
                  <span className='text-sm text-muted-foreground'>
                    Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              ) : (
                'Customer feedback and ratings'
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='space-y-4'>
            <Skeleton className='h-32' />
            <Skeleton className='h-32' />
            <Skeleton className='h-32' />
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showActions={false} />
            ))}
          </div>
        ) : (
          <div className='text-center py-8'>
            <MessageSquare className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
            <p className='text-sm text-muted-foreground'>No reviews yet for this vehicle</p>
            <p className='text-xs text-muted-foreground mt-1'>
              Reviews will appear here once customers start rating this vehicle
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
