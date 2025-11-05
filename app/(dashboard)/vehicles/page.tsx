import { PageHeader } from '@/components/page-header';
import { VehiclesPageContent } from './vehicles-page-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ImageIcon, PlusIcon } from 'lucide-react';

export default function VehiclesPage() {
  return (
    <div className='space-y-4'>
      <PageHeader title='Vehicles' description='Manage your vehicle inventory'>
        <div className='flex items-center gap-2'>
          <Button asChild variant='outline'>
            <Link href='/vehicles/images/pending'>
              <ImageIcon className='size-4' />
              View Pending Images
            </Link>
          </Button>
          <Button asChild>
            <Link href='/vehicles/create'>
              <PlusIcon className='size-4' />
              Create Vehicle
            </Link>
          </Button>
        </div>
      </PageHeader>
      <VehiclesPageContent />
    </div>
  );
}
