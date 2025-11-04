import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CardContent } from '@/components/ui/card';

export function ProfileLoading() {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-20 w-20 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-4 w-64' />
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32' />
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <Skeleton className='h-16 w-full' />
            <Skeleton className='h-16 w-full' />
            <Skeleton className='h-16 w-full' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
