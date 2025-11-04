import { Car } from 'lucide-react';

export function UserDetailsBookingsSectionNotFound() {
  return (
    <div className='text-center py-8'>
      <Car className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
      <p className='text-sm text-muted-foreground'>No bookings found for this user</p>
    </div>
  );
}
