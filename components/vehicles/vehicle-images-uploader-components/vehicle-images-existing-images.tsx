'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, X, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CarImageSchemaType, ImageStatusEnumType } from '@/schemas/car-images.schema';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

interface VehicleImagesExistingImagesProps {
  images: CarImageSchemaType[];
  onSetPrimaryImage: (imageId: number) => void;
  onDeleteImage: (imageId: number) => void;
  onApproveImage: (imageId: number) => void;
  onRejectImage: (imageId: number) => void;
  isSetPrimaryPending: boolean;
  isDeletePending: boolean;
  isApprovePending: boolean;
  isRejectPending: boolean;
}

export function VehicleImagesExistingImages({
  images,
  onSetPrimaryImage,
  onDeleteImage,
  onApproveImage,
  onRejectImage,
  isSetPrimaryPending,
  isDeletePending,
  isApprovePending,
  isRejectPending,
}: VehicleImagesExistingImagesProps) {
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    parseAsStringLiteral(['all', 'PENDING', 'APPROVED', 'REJECTED']).withDefault('all').withOptions({
      clearOnDefault: true,
    })
  );

  const filteredImages = useMemo(() => {
    if (statusFilter === 'all') {
      return images;
    }
    return images.filter((image) => image.status === statusFilter);
  }, [images, statusFilter]);

  const getStatusBadge = (status: ImageStatusEnumType) => {
    switch (status) {
      case 'APPROVED':
        return (
          <Badge className='bg-green-500/90 hover:bg-green-500 backdrop-blur-sm text-white'>
            <Check className='h-3 w-3 mr-1' />
            Approved
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge className='bg-red-500/90 hover:bg-red-500 backdrop-blur-sm text-white'>
            <X className='h-3 w-3 mr-1' />
            Rejected
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className='bg-yellow-500/90 hover:bg-yellow-500 backdrop-blur-sm text-white'>
            <AlertCircle className='h-3 w-3 mr-1' />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusCounts = () => {
    const counts = {
      all: images.length,
      PENDING: images.filter((img) => img.status === 'PENDING').length,
      APPROVED: images.filter((img) => img.status === 'APPROVED').length,
      REJECTED: images.filter((img) => img.status === 'REJECTED').length,
    };
    return counts;
  };

  const counts = getStatusCounts();

  if (images.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Uploaded Images ({images.length})</CardTitle>
            <CardDescription>
              Manage your vehicle images. Set primary image and approve/reject images for display.
            </CardDescription>
          </div>
          <div className='w-48'>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
              <SelectTrigger>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All ({counts.all})</SelectItem>
                <SelectItem value='PENDING'>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-2 rounded-full bg-yellow-500' />
                    Pending ({counts.PENDING})
                  </div>
                </SelectItem>
                <SelectItem value='APPROVED'>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-2 rounded-full bg-green-500' />
                    Approved ({counts.APPROVED})
                  </div>
                </SelectItem>
                <SelectItem value='REJECTED'>
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-2 rounded-full bg-red-500' />
                    Rejected ({counts.REJECTED})
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredImages.length === 0 ? (
          <div className='text-center py-12 text-muted-foreground'>No images found with status: {statusFilter}</div>
        ) : (
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {filteredImages.map((image) => (
              <div key={image.id} className='group relative overflow-hidden rounded-lg border bg-card'>
                {/* Image */}
                <div className='relative'>
                  <img src={image.imageUrl} alt={image.imageName} className='aspect-video w-full object-cover' />
                  {/* Hover overlay with actions */}
                  <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100'>
                    <Button
                      size='sm'
                      variant={image.isPrimary ? 'default' : 'secondary'}
                      onClick={() => onSetPrimaryImage(image.id)}
                      disabled={isSetPrimaryPending}
                      title='Set as primary'
                    >
                      <Star className={cn('size-4', image.isPrimary && 'fill-current')} />
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => onDeleteImage(image.id)}
                      disabled={isDeletePending}
                      title='Delete image'
                    >
                      <X className='size-4' />
                    </Button>
                  </div>
                  {/* Badges */}
                  <div className='absolute left-2 top-2 flex flex-col gap-1'>
                    {image.isPrimary && (
                      <Badge className='bg-primary/90 backdrop-blur-sm'>
                        <Star className='h-3 w-3 mr-1 fill-current' />
                        Primary
                      </Badge>
                    )}
                    {getStatusBadge(image.status)}
                  </div>
                </div>

                {/* Bottom actions bar - conditional based on status */}
                <div className='flex items-center justify-center gap-2 border-t p-2'>
                  {image.status === 'APPROVED' ? (
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => onRejectImage(image.id)}
                      disabled={isRejectPending}
                    >
                      <X className='size-4 mr-1' />
                      Reject
                    </Button>
                  ) : image.status === 'REJECTED' ? (
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => onApproveImage(image.id)}
                      disabled={isApprovePending}
                    >
                      <Check className='size-4 mr-1' />
                      Approve
                    </Button>
                  ) : (
                    <>
                      <Button
                        size='sm'
                        variant='outline'
                        className='flex-1 text-green-700 hover:bg-green-50 hover:text-green-800 dark:text-green-400 dark:hover:bg-green-900/30'
                        onClick={() => onApproveImage(image.id)}
                        disabled={isApprovePending}
                      >
                        <Check className='size-4 mr-1' />
                        Approve
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        className='flex-1 text-red-700 hover:bg-red-50 hover:text-red-800 dark:text-red-400 dark:hover:bg-red-900/30'
                        onClick={() => onRejectImage(image.id)}
                        disabled={isRejectPending}
                      >
                        <X className='size-4 mr-1' />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
