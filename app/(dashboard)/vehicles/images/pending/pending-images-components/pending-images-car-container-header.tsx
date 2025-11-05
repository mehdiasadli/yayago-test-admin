import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Car } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CarImageSchemaType } from '@/schemas/car-images.schema';
import { PendingImageCarContainerActions } from './pending-image-car-container-actions';

interface PendingImagesCarContainerHeaderProps {
  carId: number;
  primaryImage?: CarImageSchemaType;
  images: CarImageSchemaType[];
}

export function PendingImagesCarContainerHeader({ carId, primaryImage, images }: PendingImagesCarContainerHeaderProps) {
  return (
    <CardHeader className='bg-muted/50 border-b'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <CardTitle className='flex items-center gap-2'>
            <Car className='h-5 w-5' />
            <Link href={`/vehicles/${carId}`} className='hover:underline hover:text-primary transition-colors'>
              Vehicle #{carId}
            </Link>
          </CardTitle>
          <CardDescription>
            {images.length} pending {images.length === 1 ? 'image' : 'images'}
            {primaryImage && ' • Includes primary image'}
          </CardDescription>
        </div>
        <div className='flex items-center gap-3'>
          {images.length > 1 && <PendingImageCarContainerActions images={images} carId={carId} />}
          <Badge variant='outline'>
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </Badge>
        </div>
      </div>
    </CardHeader>
  );
}
