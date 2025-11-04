'use client';

import { createGetUserByIdQueryOptions } from '@/features/users/users.queries';
import { useQuery } from '@tanstack/react-query';
import { UserDetailsInfo } from './user-details-components/user-details-info';
import { UsersDetailsBookingStats } from './user-details-components/users-details-booking-stats';
import { UserDetailsBookingsSection } from './user-details-components/user-details-bookings-section';
import { UserDetailsHeader } from './user-details-components/user-details-header';
import { UserDetailsLoading } from './user-details-components/user-details-loading';
import { UserDetailsNotFound } from './user-details-components/user-details-not-found';

interface UserDetailsContentProps {
  userId: number;
}

export function UserDetailsContent({ userId }: UserDetailsContentProps) {
  const { data: user, isLoading } = useQuery(createGetUserByIdQueryOptions({ userId }));

  if (isLoading) {
    return <UserDetailsLoading />;
  }

  if (!user) {
    return <UserDetailsNotFound />;
  }

  return (
    <div className='space-y-6'>
      {/* User Header Card */}
      <UserDetailsHeader user={user} />

      <div className='grid gap-6 md:grid-cols-2'>
        {/* User Information Card */}
        <UserDetailsInfo user={user} />

        {/* Booking Statistics Card */}
        <UsersDetailsBookingStats user={user} />
      </div>

      {/* User Bookings Section */}
      <UserDetailsBookingsSection userId={userId} />
    </div>
  );
}
