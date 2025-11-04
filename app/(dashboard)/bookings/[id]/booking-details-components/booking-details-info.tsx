import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookingSchemaType } from '@/schemas/bookings.schema';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface BookingDetailsInfoProps {
  booking: BookingSchemaType;
}

export default function BookingDetailsInfo({ booking }: BookingDetailsInfoProps) {
  const formatTime = (time: { hour: number; minute: number } | null) => {
    if (!time) return 'N/A';
    return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
  };

  const calculateDuration = () => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='h-5 w-5' />
          Booking Details
        </CardTitle>
        <CardDescription>Rental period and pricing</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm text-muted-foreground'>Booking ID</span>
          <span className='text-sm font-medium font-mono'>#{booking.id}</span>
        </div>
        <Separator />
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm text-muted-foreground'>Duration</span>
          <span className='text-sm font-medium'>{calculateDuration()} days</span>
        </div>
        <Separator />
        <div className='py-2 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Start Date</span>
            <span className='text-sm font-medium'>{format(new Date(booking.startDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1 text-sm text-muted-foreground'>
              <Clock className='h-3 w-3' />
              <span>Pickup</span>
            </div>
            <span className='text-sm font-medium'>{formatTime(booking.pickupTime)}</span>
          </div>
        </div>
        <Separator />
        <div className='py-2 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>End Date</span>
            <span className='text-sm font-medium'>{format(new Date(booking.endDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1 text-sm text-muted-foreground'>
              <Clock className='h-3 w-3' />
              <span>Return</span>
            </div>
            <span className='text-sm font-medium'>{formatTime(booking.returnTime)}</span>
          </div>
        </div>
        <Separator />
        <div className='flex items-center justify-between py-2 bg-primary/5 -mx-6 px-6 rounded'>
          <div className='flex items-center gap-2 text-sm font-medium'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span>Total Amount</span>
          </div>
          <span className='text-lg font-bold text-primary'>
            {booking.currency} {booking.totalPrice.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
