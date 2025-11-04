'use client';

interface BookingDetailsContentProps {
  bookingId: number;
}

export function BookingDetailsContent({ bookingId }: BookingDetailsContentProps) {
  return <div className='space-y-6'>ID: {bookingId}</div>;
}
