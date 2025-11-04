'use client';

import {
  createGetVehicleByIdQueryOptions,
  createGetVehicleBookingsQueryOptions,
} from '@/features/vehicles/vehicles.queries';
import { createGetReviewsByCarIdQueryOptions } from '@/features/reviews/reviews.queries';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingCard } from '@/components/bookings/booking-card';
import { Car, ShoppingBag } from 'lucide-react';
import VehicleDetailsReviewsSection from './vehicle-details-components/vehicle-details-reviews-section';
import VehicleDetailsPricing from './vehicle-details-components/vehicle-details-pricing';
import VehicleDetailsSystemInfo from './vehicle-details-components/vehicle-details-system-info';
import VehicleDetailsRevenue from './vehicle-details-components/vehicle-details-revenue';
import VehicleDetailsBookingStats from './vehicle-details-components/vehicle-details-booking-stats';
import VehicleDetailsSpecs from './vehicle-details-components/vehicle-details-specs';
import VehicleDetailsHeader from './vehicle-details-components/vehicle-details-header';

interface VehicleDetailsContentProps {
  carId: number;
}

export function VehicleDetailsContent({ carId }: VehicleDetailsContentProps) {
  const { data: vehicle, isLoading } = useQuery(createGetVehicleByIdQueryOptions({ carId }));
  const { data: bookings, isLoading: isLoadingBookings } = useQuery(createGetVehicleBookingsQueryOptions({ carId }));
  const { data: reviews, isLoading: isLoadingReviews } = useQuery(createGetReviewsByCarIdQueryOptions({ carId }));

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-32 w-32 rounded-lg' />
              <div className='space-y-2 flex-1'>
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-4 w-64' />
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <Car className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Vehicle not found</h3>
          <p className='text-sm text-muted-foreground'>The vehicle you're looking for doesn't exist.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Vehicle Header Card */}
      <Card>
        <VehicleDetailsHeader vehicle={vehicle} />
      </Card>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Vehicle Specifications */}
        <VehicleDetailsSpecs vehicle={vehicle} />

        {/* Booking Statistics */}
        <VehicleDetailsBookingStats vehicle={vehicle} />

        {/* Revenue Information */}
        <VehicleDetailsRevenue vehicle={vehicle} />
      </div>

      {/* Additional Info Row */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* System Information */}
        <VehicleDetailsSystemInfo vehicle={vehicle} />

        {/* Pricing Details */}
        <VehicleDetailsPricing vehicle={vehicle} />
      </div>

      {/* Vehicle Bookings Section */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <ShoppingBag className='h-5 w-5' />
            Bookings
          </CardTitle>
          <CardDescription>All bookings for this vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingBookings ? (
            <div className='space-y-4'>
              <Skeleton className='h-40' />
              <Skeleton className='h-40' />
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} showCar={false} />
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <ShoppingBag className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
              <p className='text-sm text-muted-foreground'>No bookings found for this vehicle</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vehicle Reviews Section */}
      <VehicleDetailsReviewsSection reviews={reviews} vehicle={vehicle} isLoading={isLoadingReviews} />
    </div>
  );
}
