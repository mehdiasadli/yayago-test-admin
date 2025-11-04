import { Skeleton } from '@/components/ui/skeleton';

export function UserDetailsReviewsSectionLoading() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <Skeleton className='h-32' />
      <Skeleton className='h-32' />
      <Skeleton className='h-32' />
    </div>
  );
}
