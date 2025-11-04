import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingCard } from '@/components/bookings/booking-card';
import { BookingSchemaType } from '@/schemas/bookings.schema';
import { UserDetailsBookingsSectionLoading } from './user-details-bookings-section-loading';
import { UserDetailsBookingsSectionNotFound } from './user-details-bookings-section-not-found';
import { createGetUserBookingsQueryOptions } from '@/features/users/users.queries';
import { useQuery } from '@tanstack/react-query';

interface UserDetailsBookingsSectionProps {
  userId: number;
}

export function UserDetailsBookingsSection({ userId }: UserDetailsBookingsSectionProps) {
  const { data: bookings, isLoading } = useQuery(createGetUserBookingsQueryOptions({ userId }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Car className='h-5 w-5' />
          Bookings
        </CardTitle>
        <CardDescription>All bookings made by this user</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <UserDetailsBookingsSectionLoading />
        ) : bookings && bookings.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} showUser={false} />
            ))}
          </div>
        ) : (
          <UserDetailsBookingsSectionNotFound />
        )}
      </CardContent>
    </Card>
  );
}
