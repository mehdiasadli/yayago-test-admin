import { Skeleton } from '@/components/ui/skeleton';

export function UserDetailsBookingsSectionLoading() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-40' />
      <Skeleton className='h-40' />
    </div>
  );
}
