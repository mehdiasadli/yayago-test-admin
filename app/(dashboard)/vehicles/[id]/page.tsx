import { PageHeader } from '@/components/page-header';
import { VehicleDetailsContent } from './vehicle-details-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface VehicleDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailsPage({ params }: VehicleDetailsPageProps) {
  const { id } = await params;
  const vehicleId = parseInt(id, 10);

  return (
    <div className='space-y-4'>
      <PageHeader title='Vehicle Details' description='View and manage vehicle information'>
        <Button asChild variant='outline'>
          <Link href='/vehicles'>
            <ArrowLeft className='size-4' />
            Back to Vehicles
          </Link>
        </Button>
      </PageHeader>
      <VehicleDetailsContent carId={vehicleId} />
    </div>
  );
}
