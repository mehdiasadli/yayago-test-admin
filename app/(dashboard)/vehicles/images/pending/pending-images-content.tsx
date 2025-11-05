'use client';

import { createGetPendingImagesQueryOptions } from '@/features/admin-images/admin-images.queries';
import { useQuery } from '@tanstack/react-query';
import { PendingImagesLoading } from './pending-images-components/pending-images-loading';
import { PendingImagesNotFound } from './pending-images-components/pending-images-not-found';
import { CarImageSchemaType } from '@/schemas/car-images.schema';
import { PendingImageHeader } from './pending-images-components/pending-image-header';
import { PendingImageCarContainer } from './pending-images-components/pending-image-car-container';

export function PendingImagesContent() {
  const { data: pendingImages, isLoading } = useQuery(createGetPendingImagesQueryOptions());

  if (isLoading) {
    return <PendingImagesLoading />;
  }

  if (!pendingImages || pendingImages.length === 0) {
    return <PendingImagesNotFound />;
  }

  // Group images by carId
  const groupedImages = pendingImages.reduce(
    (acc, image) => {
      if (!acc[image.carId]) {
        acc[image.carId] = [];
      }
      acc[image.carId].push(image);
      return acc;
    },
    {} as Record<number, CarImageSchemaType[]>
  );

  // Sort carIds to ensure consistent ordering
  const sortedCarIds = Object.keys(groupedImages)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className='space-y-6'>
      <PendingImageHeader totalImages={pendingImages.length} />

      <div className='space-y-6'>
        {sortedCarIds.map((carId) => {
          const images = groupedImages[carId];
          const primaryImage = images.find((img) => img.isPrimary);

          return <PendingImageCarContainer key={carId} carId={carId} images={images} primaryImage={primaryImage} />;
        })}
      </div>
    </div>
  );
}
