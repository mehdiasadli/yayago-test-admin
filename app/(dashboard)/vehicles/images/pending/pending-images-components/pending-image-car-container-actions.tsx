import { CarImageSchemaType } from '@/schemas/car-images.schema';
import { PendingImageCarContainerApproveAll } from './pending-image-car-container-approve-all';
import { PendingImageCarContainerRejectAll } from './pending-image-car-container-reject-all';

interface PendingImageCarContainerActionsProps {
  images: CarImageSchemaType[];
  carId: number;
}

export function PendingImageCarContainerActions({ images, carId }: PendingImageCarContainerActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <PendingImageCarContainerApproveAll images={images} carId={carId} />
      <PendingImageCarContainerRejectAll images={images} carId={carId} />
    </div>
  );
}
