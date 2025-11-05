import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PendingImagesLoading() {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-9 w-64' />
          <Skeleton className='h-4 w-96' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Card groups skeleton */}
      <div className='space-y-6'>
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <Card key={groupIndex}>
            <CardHeader className='bg-muted/50 border-b'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <Skeleton className='h-6 w-40' />
                  <Skeleton className='h-4 w-48' />
                </div>
                <Skeleton className='h-6 w-20' />
              </div>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {Array.from({ length: 3 }).map((_, imageIndex) => (
                  <Card key={imageIndex} className='overflow-hidden'>
                    <Skeleton className='aspect-video w-full' />
                    <div className='p-4 space-y-3'>
                      <Skeleton className='h-4 w-full' />
                      <div className='grid grid-cols-2 gap-2'>
                        <Skeleton className='h-3 w-full' />
                        <Skeleton className='h-3 w-full' />
                      </div>
                      <Skeleton className='h-3 w-32' />
                    </div>
                    <div className='p-4 pt-0 flex gap-2'>
                      <Skeleton className='h-8 flex-1' />
                      <Skeleton className='h-8 flex-1' />
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
