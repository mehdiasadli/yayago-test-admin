'use client';

import { createGetBookingByIdQueryOptions } from '@/features/bookings/bookings.queries';
import { createGetVehicleByIdQueryOptions } from '@/features/vehicles/vehicles.queries';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';
import BookingDetailsHeader from './booking-details-components/booking-details-header';
import BookingDetailsInfo from './booking-details-components/booking-details-info';
import BookingDetailsCustomer from './booking-details-components/booking-details-customer';
import BookingDetailsVehicle from './booking-details-components/booking-details-vehicle';
import BookingDetailsTimeline from './booking-details-components/booking-details-timeline';

interface BookingDetailsContentProps {
  bookingId: number;
}

export function BookingDetailsContent({ bookingId }: BookingDetailsContentProps) {
  const { data: booking, isLoading: isLoadingBooking } = useQuery(createGetBookingByIdQueryOptions({ bookingId }));
  const { data: vehicle, isLoading: isLoadingVehicle } = useQuery({
    ...createGetVehicleByIdQueryOptions({ carId: booking?.carId || 0 }),
    enabled: !!booking?.carId,
  });

  if (isLoadingBooking) {
    return (
      <div className='space-y-6'>
        <Card>
          <CardContent className='p-6'>
            <div className='space-y-4'>
              <Skeleton className='h-8 w-64' />
              <Skeleton className='h-4 w-96' />
            </div>
          </CardContent>
        </Card>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <Calendar className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Booking not found</h3>
          <p className='text-sm text-muted-foreground'>The booking you're looking for doesn't exist.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Booking Header */}
      <Card>
        <BookingDetailsHeader booking={booking} />
      </Card>

      {/* Main Info Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Booking Information */}
        <BookingDetailsInfo booking={booking} />

        {/* Customer Information */}
        <BookingDetailsCustomer booking={booking} />

        {/* Timeline */}
        <BookingDetailsTimeline booking={booking} />
      </div>

      {/* Vehicle Information */}
      <BookingDetailsVehicle booking={booking} vehicle={vehicle} isLoading={isLoadingVehicle} />
    </div>
  );
}
