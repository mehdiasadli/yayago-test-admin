'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { useApproveImageMutation, useRejectImageMutation } from '@/features/admin-images/admin-images.mutations';
import { CarImageSchemaType } from '@/schemas/car-images.schema';
import { format } from 'date-fns';
import { Check, FileImage, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface PendingImageCardProps {
  image: CarImageSchemaType;
}

export function PendingImageCard({ image }: PendingImageCardProps) {
  const approveImageMutation = useApproveImageMutation();
  const rejectImageMutation = useRejectImageMutation();

  const handleApprove = async () => {
    try {
      await approveImageMutation.mutateAsync({ imageId: image.id });
      toast.success('Image approved successfully');
    } catch (error) {
      toast.error('Failed to approve image');
    }
  };

  const handleReject = async () => {
    try {
      await rejectImageMutation.mutateAsync({ imageId: image.id });
      toast.success('Image rejected successfully');
    } catch (error) {
      toast.error('Failed to reject image');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const isPending = approveImageMutation.isPending || rejectImageMutation.isPending;

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='p-0'>
        <div className='relative aspect-video w-full bg-muted'>
          <Image
            src={image.imageUrl}
            alt={image.imageName}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          {image.isPrimary && <Badge className='absolute top-2 right-2 bg-primary/90 backdrop-blur-sm'>Primary</Badge>}
        </div>
      </CardHeader>
      <CardContent className='p-4 space-y-3'>
        <div className='space-y-2'>
          <div className='flex items-start gap-2'>
            <FileImage className='h-4 w-4 mt-0.5 text-muted-foreground shrink-0' />
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium truncate' title={image.imageName}>
                {image.imageName}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 text-xs text-muted-foreground'>
            <div>
              <span className='font-medium'>Size:</span> {formatBytes(image.imageSize)}
            </div>
            <div>
              <span className='font-medium'>Type:</span> {image.mimeType.split('/')[1].toUpperCase()}
            </div>
          </div>
        </div>

        <CardDescription className='text-xs'>
          Uploaded {format(new Date(image.uploadDate), 'MMM dd, yyyy • HH:mm')}
        </CardDescription>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex gap-2'>
        <Button size='sm' variant='default' className='flex-1' onClick={handleApprove} disabled={isPending}>
          <Check className='h-4 w-4 mr-1' />
          Approve
        </Button>
        <Button size='sm' variant='destructive' className='flex-1' onClick={handleReject} disabled={isPending}>
          <X className='h-4 w-4 mr-1' />
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
}
