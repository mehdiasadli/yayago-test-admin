import { MessageSquare } from 'lucide-react';

export function UserDetailsReviewsSectionNotFound() {
  return (
    <div className='text-center py-8'>
      <MessageSquare className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
      <p className='text-sm text-muted-foreground'>No reviews yet from this user</p>
      <p className='text-xs text-muted-foreground mt-1'>
        Reviews will appear here once the user starts rating vehicles
      </p>
    </div>
  );
}
