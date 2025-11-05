import { NotImplemented } from '@/components/not-implemented';
import { PageHeader } from '@/components/page-header';

export default function BookingsPage() {
  return (
    <div>
      <PageHeader title='Bookings' description='Manage your bookings' />
      <NotImplemented description='However you can still view individual bookings. For that, you need to go to either a vehicle or a user details page and click on the View Details button on booking card.' />
    </div>
  );
}
