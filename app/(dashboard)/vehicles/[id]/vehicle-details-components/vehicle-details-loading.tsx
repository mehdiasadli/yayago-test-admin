import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader } from '@/components/ui/card';

export function VehicleDetailsLoading() {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-32 w-32 rounded-lg' />
            <div className='space-y-2 flex-1'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-4 w-64' />
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <Skeleton className='h-64' />
        <Skeleton className='h-64' />
        <Skeleton className='h-64' />
      </div>
    </div>
  );
}
