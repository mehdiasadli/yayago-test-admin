import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, DollarSign, Car, User } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookingSchemaType } from '@/schemas/bookings.schema';

interface BookingCardProps {
  booking: BookingSchemaType;
  showUser?: boolean;
  showCar?: boolean;
}

export function BookingCard({ booking, showUser = true, showCar = true }: BookingCardProps) {
  const formatTime = (time: string | { hour: number; minute: number } | null) => {
    if (!time) return 'Not specified';
    if (typeof time === 'string') return time;
    return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
  };

  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed' || statusLower === 'active') return 'success';
    if (statusLower === 'pending') return 'warning';
    if (statusLower === 'cancelled') return 'destructive';
    return 'secondary';
  };

  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Booking</span>
              <span className='font-mono text-sm font-semibold'>#{booking.id}</span>
            </div>
            {showCar && (
              <Link href={`/vehicles/${booking.carId}`} className='flex items-center gap-2'>
                <Car className='h-4 w-4 text-muted-foreground' />
                <span className='font-semibold'>
                  {booking.carBrand} {booking.carModel}
                </span>
              </Link>
            )}
            {showUser && (
              <Link href={`/users/${booking.userId}`} className='flex items-center gap-2'>
                <User className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>{booking.userFullName}</span>
              </Link>
            )}
          </div>
          <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='grid gap-3 sm:grid-cols-2'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Calendar className='h-4 w-4' />
              <span>Pickup</span>
            </div>
            <div className='text-sm font-medium'>{format(new Date(booking.startDate), 'MMM dd, yyyy')}</div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='h-3.5 w-3.5' />
              <span>{formatTime(booking.pickupTime)}</span>
            </div>
          </div>

          <div className='space-y-1'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Calendar className='h-4 w-4' />
              <span>Return</span>
            </div>
            <div className='text-sm font-medium'>{format(new Date(booking.endDate), 'MMM dd, yyyy')}</div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='h-3.5 w-3.5' />
              <span>{formatTime(booking.returnTime)}</span>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between pt-2 border-t'>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
            <span className='text-lg font-bold'>
              {booking.totalPrice} {booking.currency}
            </span>
          </div>
          <Button asChild variant='outline' size='sm'>
            <Link href={`/bookings/${booking.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
