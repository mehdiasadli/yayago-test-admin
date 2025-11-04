import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingSchemaType } from '@/schemas/bookings.schema';
import { Clock, CheckCircle2, Calendar, XCircle } from 'lucide-react';
import { format, isPast, isFuture, isToday } from 'date-fns';

interface BookingDetailsTimelineProps {
  booking: BookingSchemaType;
}

export default function BookingDetailsTimeline({ booking }: BookingDetailsTimelineProps) {
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const now = new Date();

  const isActive = isPast(startDate) && isFuture(endDate);
  const isUpcoming = isFuture(startDate);
  const isCompleted = isPast(endDate);

  const getTimelineStatus = () => {
    if (booking.status === 'CANCELLED') {
      return {
        label: 'Cancelled',
        color: 'text-destructive',
        icon: <XCircle className='h-5 w-5' />,
        badge: 'destructive' as const,
      };
    }
    if (isCompleted) {
      return {
        label: 'Completed',
        color: 'text-green-600',
        icon: <CheckCircle2 className='h-5 w-5' />,
        badge: 'success' as const,
      };
    }
    if (isActive) {
      return {
        label: 'Active',
        color: 'text-blue-600',
        icon: <Clock className='h-5 w-5' />,
        badge: 'info' as const,
      };
    }
    return {
      label: 'Upcoming',
      color: 'text-yellow-600',
      icon: <Calendar className='h-5 w-5' />,
      badge: 'warning' as const,
    };
  };

  const status = getTimelineStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='h-5 w-5' />
          Timeline Status
        </CardTitle>
        <CardDescription>Booking progress and timeline</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Current Status</p>
            <div className='flex items-center gap-2'>
              <span className={`${status.color}`}>{status.icon}</span>
              <span className='text-xl font-bold'>{status.label}</span>
            </div>
          </div>
          <Badge variant={status.badge} className='text-white'>
            {status.label}
          </Badge>
        </div>

        <div className='space-y-3'>
          {/* Start Date */}
          <div className='flex items-start gap-3'>
            <div
              className={`mt-1 rounded-full p-1 ${
                isPast(startDate) ? 'bg-green-500/20 text-green-600' : 'bg-muted text-muted-foreground'
              }`}
            >
              <CheckCircle2 className='h-4 w-4' />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium'>{isToday(startDate) ? 'Today - ' : ''}Rental Start</p>
              <p className='text-xs text-muted-foreground'>{format(startDate, 'MMM dd, yyyy • HH:mm')}</p>
            </div>
          </div>

          {/* Active Period */}
          {isActive && (
            <div className='flex items-start gap-3'>
              <div className='mt-1 rounded-full p-1 bg-blue-500/20 text-blue-600 animate-pulse'>
                <Clock className='h-4 w-4' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>In Progress</p>
                <p className='text-xs text-muted-foreground'>Vehicle currently rented</p>
              </div>
            </div>
          )}

          {/* End Date */}
          <div className='flex items-start gap-3'>
            <div
              className={`mt-1 rounded-full p-1 ${
                isPast(endDate)
                  ? 'bg-green-500/20 text-green-600'
                  : isActive
                    ? 'bg-blue-500/20 text-blue-600'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              <Calendar className='h-4 w-4' />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium'>{isToday(endDate) ? 'Today - ' : ''}Rental End</p>
              <p className='text-xs text-muted-foreground'>{format(endDate, 'MMM dd, yyyy • HH:mm')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
