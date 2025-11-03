import { PageHeader } from '@/components/page-header';
import { CreateVehicleForm } from '@/components/forms/create-vehicle-form';

export default function CreateVehiclePage() {
  return (
    <>
      <PageHeader title='Create New Vehicle' description='Add a new vehicle to your rental fleet' />
      <div className='container mx-auto py-6'>
        <CreateVehicleForm />
      </div>
    </>
  );
}
