import { PageHeader } from '@/components/page-header';
import { BookingsPageContent } from './bookings-page-content';

export default function BookingsPage() {
  return (
    <div className='space-y-4'>
      <PageHeader title='Bookings' description='Manage and track all rental bookings' />
      <BookingsPageContent />
    </div>
  );
}
