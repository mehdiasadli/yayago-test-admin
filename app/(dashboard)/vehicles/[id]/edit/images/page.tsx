import { PageHeader } from '@/components/page-header';
import { VehicleImagesUploader } from '@/components/vehicles/vehicle-images-uploader';

interface VehicleImagesPageProps extends PageProps<'/vehicles/[id]/edit/images'> {}

export default async function VehicleImagesPage({ params }: VehicleImagesPageProps) {
  const { id } = await params;
  const carId = Number(id);

  return (
    <>
      <PageHeader title='Upload Vehicle Images' description={`Add images for vehicle #${carId}`} />
      <div className='container mx-auto py-6'>
        <VehicleImagesUploader carId={carId} />
      </div>
    </>
  );
}
