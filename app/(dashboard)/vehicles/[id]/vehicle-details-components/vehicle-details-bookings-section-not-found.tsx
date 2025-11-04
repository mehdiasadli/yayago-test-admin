import { ShoppingBag } from 'lucide-react';

export function VehicleDetailsBookingsSectionNotFound() {
  return (
    <div className='text-center py-8'>
      <ShoppingBag className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
      <p className='text-sm text-muted-foreground'>No bookings found for this vehicle</p>
    </div>
  );
}
