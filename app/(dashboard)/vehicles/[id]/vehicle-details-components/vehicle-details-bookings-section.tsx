import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import { BookingCard } from '@/components/bookings/booking-card';
import { createGetVehicleBookingsQueryOptions } from '@/features/vehicles/vehicles.queries';
import { useQuery } from '@tanstack/react-query';
import { VehicleDetailsBookingsSectionNotFound } from './vehicle-details-bookings-section-not-found';
import { VehicleDetailsBookingsSectionLoading } from './vehicle-details-bookings-section-loading';

interface VehicleDetailsBookingsSectionProps {
  carId: number;
}

export function VehicleDetailsBookingsSection({ carId }: VehicleDetailsBookingsSectionProps) {
  const { data: bookings, isLoading } = useQuery(createGetVehicleBookingsQueryOptions({ carId }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5' />
          Bookings
        </CardTitle>
        <CardDescription>All bookings for this vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <VehicleDetailsBookingsSectionLoading />
        ) : bookings && bookings.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} showCar={false} />
            ))}
          </div>
        ) : (
          <VehicleDetailsBookingsSectionNotFound />
        )}
      </CardContent>
    </Card>
  );
}
