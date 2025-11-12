import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BookingDetailsContent } from './booking-details-content';

interface BookingDetailsPageProps extends PageProps<'/bookings/[id]'> {}

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { id } = await params;
  const bookingId = parseInt(id, 10);

  return (
    <div className='space-y-4'>
      <PageHeader title='Booking Details' description='View and manage booking information'>
        <Button asChild variant='outline' disabled className='opacity-20'>
          <Link href='/bookings' className='pointer-events-none'>
            <ArrowLeft className='size-4' />
            Back to Bookings
          </Link>
        </Button>
      </PageHeader>
      <BookingDetailsContent bookingId={bookingId} />
    </div>
  );
}
