import { MessageSquare } from 'lucide-react';

export function VehicleDetailsReviewsSectionNotFound() {
  return (
    <div className='text-center py-8'>
      <MessageSquare className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
      <p className='text-sm text-muted-foreground'>No reviews yet for this vehicle</p>
      <p className='text-xs text-muted-foreground mt-1'>
        Reviews will appear here once customers start rating this vehicle
      </p>
    </div>
  );
}
