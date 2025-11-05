import { Card, CardContent } from '@/components/ui/card';
import { CarImageSchemaType } from '@/schemas/car-images.schema';
import { PendingImageCard } from './pending-image-card';
import { PendingImagesCarContainerHeader } from './pending-images-car-container-header';

interface PendingImageCarContainerProps {
  carId: number;
  images: CarImageSchemaType[];
  primaryImage?: CarImageSchemaType;
}

export function PendingImageCarContainer({ carId, images, primaryImage }: PendingImageCarContainerProps) {
  return (
    <Card key={carId} className='overflow-hidden'>
      <PendingImagesCarContainerHeader carId={carId} totalImages={images.length} primaryImage={primaryImage} />
      <CardContent className='p-6'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {images.map((image) => (
            <PendingImageCard key={image.id} image={image} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
