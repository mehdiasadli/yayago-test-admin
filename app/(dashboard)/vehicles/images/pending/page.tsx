import { PageHeader } from '@/components/page-header';
import { PendingImagesContent } from './pending-images-content';
import { BackButton } from '@/components/back-button';

export default function PendingImagesPage() {
  return (
    <div className='space-y-4'>
      <PageHeader title='Pending Images' description='View pending images for all vehicles'>
        <BackButton href='/vehicles' text='Back to Vehicles' />
      </PageHeader>
      <PendingImagesContent />
    </div>
  );
}
