import { Skeleton } from '@/components/ui/skeleton';

export function VehicleDetailsReviewsSectionLoading() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-32' />
      <Skeleton className='h-32' />
      <Skeleton className='h-32' />
    </div>
  );
}
