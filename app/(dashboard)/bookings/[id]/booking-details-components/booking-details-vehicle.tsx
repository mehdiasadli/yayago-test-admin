import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingSchemaType } from '@/schemas/bookings.schema';
import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { Car, ExternalLink, Fuel, Gauge, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface BookingDetailsVehicleProps {
  booking: BookingSchemaType;
  vehicle?: VehicleSchemaType;
  isLoading: boolean;
}

export default function BookingDetailsVehicle({ booking, vehicle, isLoading }: BookingDetailsVehicleProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Car className='h-5 w-5' />
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </div>
        </CardContent>
      </Card>
    );
  }

  const primaryImage = vehicle?.images?.find((img) => img.isPrimary) || vehicle?.images?.[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Car className='h-5 w-5' />
          Vehicle Information
        </CardTitle>
        <CardDescription>Details about the rented vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        {vehicle ? (
          <div className='space-y-6'>
            {/* Vehicle Header */}
            <div className='flex items-start gap-4'>
              {/* Vehicle Image */}
              <div className='relative h-24 w-24 rounded-lg overflow-hidden bg-muted shrink-0'>
                {primaryImage ? (
                  <img
                    src={primaryImage.imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='h-full w-full flex items-center justify-center'>
                    <Car className='h-8 w-8 text-muted-foreground' />
                  </div>
                )}
              </div>

              {/* Vehicle Info */}
              <div className='flex-1 space-y-2'>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {booking.carBrand} {booking.carModel}
                  </h3>
                  <p className='text-sm text-muted-foreground'>Year: {vehicle.year}</p>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                  <Badge variant={vehicle.available ? 'success' : 'secondary'} className='text-white'>
                    {vehicle.available ? 'Available' : 'Unavailable'}
                  </Badge>
                  {vehicle.featured && (
                    <Badge variant='primary' className='text-white'>
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Vehicle Specs */}
            <div className='grid grid-cols-2 gap-4'>
              {vehicle.fuelType && (
                <div className='flex items-center gap-2'>
                  <Fuel className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <p className='text-xs text-muted-foreground'>Fuel Type</p>
                    <p className='text-sm font-medium'>{vehicle.fuelType}</p>
                  </div>
                </div>
              )}
              {vehicle.transmission && (
                <div className='flex items-center gap-2'>
                  <Gauge className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <p className='text-xs text-muted-foreground'>Transmission</p>
                    <p className='text-sm font-medium'>{vehicle.transmission}</p>
                  </div>
                </div>
              )}
              {vehicle.seatCount && (
                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <p className='text-xs text-muted-foreground'>Seats</p>
                    <p className='text-sm font-medium'>{vehicle.seatCount}</p>
                  </div>
                </div>
              )}
              <div className='flex items-center gap-2'>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-xs text-muted-foreground'>Price/Day</p>
                  <p className='text-sm font-medium'>
                    {vehicle.currency} {vehicle.pricePerDay.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Button */}
            <Button asChild variant='outline' className='w-full'>
              <Link href={`/vehicles/${booking.carId}`}>
                <ExternalLink className='h-4 w-4 mr-2' />
                View Full Vehicle Details
              </Link>
            </Button>
          </div>
        ) : (
          <div className='text-center py-8'>
            <Car className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
            <p className='text-sm text-muted-foreground'>Vehicle information not available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
