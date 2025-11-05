import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

export function PendingImagesNotFound() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Pending Images</h1>
        <p className='text-muted-foreground mt-1'>Review and approve vehicle images waiting for approval</p>
      </div>

      <Card>
        <CardContent className='py-16'>
          <div className='text-center space-y-4'>
            <div className='flex justify-center'>
              <div className='rounded-full bg-muted p-6'>
                <ImageIcon className='h-12 w-12 text-muted-foreground' />
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>No pending images</h3>
              <p className='text-sm text-muted-foreground max-w-md mx-auto'>
                All vehicle images have been reviewed. New images will appear here when they are uploaded and awaiting
                approval.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
