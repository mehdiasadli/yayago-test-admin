import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Car } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CarImageSchemaType } from '@/schemas/car-images.schema';

interface PendingImagesCarContainerHeaderProps {
  carId: number;
  totalImages: number;
  primaryImage?: CarImageSchemaType;
}

export function PendingImagesCarContainerHeader({
  carId,
  totalImages,
  primaryImage,
}: PendingImagesCarContainerHeaderProps) {
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
            {totalImages} pending {totalImages === 1 ? 'image' : 'images'}
            {primaryImage && ' • Includes primary image'}
          </CardDescription>
        </div>
        <Badge variant='outline'>
          {totalImages} {totalImages === 1 ? 'image' : 'images'}
        </Badge>
      </div>
    </CardHeader>
  );
}
