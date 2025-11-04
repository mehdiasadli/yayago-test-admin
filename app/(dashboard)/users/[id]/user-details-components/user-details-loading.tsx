import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function UserDetailsLoading() {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-20 w-20 rounded-full' />
            <div className='space-y-2 flex-1'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-4 w-64' />
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className='grid gap-6 md:grid-cols-2'>
        <Skeleton className='h-64' />
        <Skeleton className='h-64' />
      </div>
    </div>
  );
}
