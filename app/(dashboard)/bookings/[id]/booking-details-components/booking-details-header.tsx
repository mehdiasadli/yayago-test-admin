import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateBookingStatusMutation } from '@/features/bookings/bookings.mutations';
import { BookingSchemaType } from '@/schemas/bookings.schema';
import { CheckCircle2, EllipsisVerticalIcon, XCircle, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface BookingDetailsHeaderProps {
  booking: BookingSchemaType;
}

export default function BookingDetailsHeader({ booking }: BookingDetailsHeaderProps) {
  const updateStatusMutation = useUpdateBookingStatusMutation();

  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed') return 'success';
    if (statusLower === 'pending') return 'warning';
    if (statusLower === 'cancelled') return 'destructive';
    return 'secondary';
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed') return <CheckCircle2 className='h-4 w-4' />;
    if (statusLower === 'pending') return <Clock className='h-4 w-4' />;
    if (statusLower === 'cancelled') return <XCircle className='h-4 w-4' />;
    return null;
  };

  const handleStatusUpdate = async (newStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED') => {
    try {
      await updateStatusMutation.mutateAsync({
        params: { bookingId: booking.id },
        query: { status: newStatus },
      });
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  return (
    <CardHeader>
      <div className='flex items-start justify-between gap-4'>
        <div className='space-y-3 flex-1'>
          <div>
            <div className='flex items-center gap-2 flex-wrap'>
              <h2 className='text-2xl font-bold'>Booking #{booking.id}</h2>
              <Badge variant={getStatusVariant(booking.status)} className='gap-1 text-white'>
                {getStatusIcon(booking.status)}
                {booking.status}
              </Badge>
            </div>
            <p className='text-muted-foreground mt-1'>
              {booking.carBrand} {booking.carModel}
            </p>
          </div>

          <div className='flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-2'>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
              <span className='font-semibold'>
                {booking.currency} {booking.totalPrice.toFixed(2)}
              </span>
              <span className='text-muted-foreground'>Total</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' disabled={updateStatusMutation.isPending}>
              <EllipsisVerticalIcon className='size-4' />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {booking.status !== 'CONFIRMED' && (
              <DropdownMenuItem onClick={() => handleStatusUpdate('CONFIRMED')} className='text-green-600'>
                <CheckCircle2 className='h-4 w-4 mr-2' />
                Confirm Booking
              </DropdownMenuItem>
            )}
            {booking.status !== 'PENDING' && (
              <DropdownMenuItem onClick={() => handleStatusUpdate('PENDING')} className='text-yellow-600'>
                <Clock className='h-4 w-4 mr-2' />
                Set as Pending
              </DropdownMenuItem>
            )}
            {booking.status !== 'CANCELLED' && (
              <DropdownMenuItem onClick={() => handleStatusUpdate('CANCELLED')} className='text-destructive'>
                <XCircle className='h-4 w-4 mr-2' />
                Cancel Booking
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
  );
}
