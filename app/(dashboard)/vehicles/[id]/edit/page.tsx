import { PageHeader } from '@/components/page-header';
import { EditVehiclePageContent } from './edit-vehicle-page-content';

interface EditVehiclePageProps extends PageProps<'/vehicles/[id]/edit'> {}

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
  const { id } = await params;
  const carId = Number(id);

  return (
    <>
      <PageHeader title='Edit Vehicle' description='Update vehicle details' />
      <div className='container mx-auto py-6'>
        <EditVehiclePageContent carId={carId} />
      </div>
    </>
  );
}
