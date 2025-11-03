import { PageHeader } from '@/components/page-header';
import { VehiclesPageContent } from './vehicles-page-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export default function VehiclesPage() {
  return (
    <div className='space-y-4'>
      <PageHeader title='Vehicles' description='Manage your vehicle inventory'>
        <Button asChild>
          <Link href='/vehicles/create'>
            <PlusIcon className='size-4' />
            Create Vehicle
          </Link>
        </Button>
      </PageHeader>
      <VehiclesPageContent />
    </div>
  );
}
