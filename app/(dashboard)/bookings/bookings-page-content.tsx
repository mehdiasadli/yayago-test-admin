'use client';

import { createSearchAdminBookingsQueryOptions } from '@/features/bookings/bookings.queries';
import { BookingsTable } from '@/components/bookings/bookings-table';
import { useQuery } from '@tanstack/react-query';
import { useBookingsTableQueries } from '@/components/bookings/use-bookings-queries';
import { BookingsStats } from './bookings-stats';

export function BookingsPageContent() {
  const [query, setQuery] = useBookingsTableQueries();

  const { data, isLoading } = useQuery(
    createSearchAdminBookingsQueryOptions({
      userId: query.userId || undefined,
      carId: query.carId || undefined,
      status: query.status as any,
      dateFrom: query.dateFrom || undefined,
      dateTo: query.dateTo || undefined,
      page: query.page,
      size: query.size,
      sortBy: query.sortBy || undefined,
      sortOrder: query.sortOrder || undefined,
    })
  );

  return (
    <div className='space-y-4'>
      <BookingsStats />
      <BookingsTable
        query={query}
        setQuery={setQuery}
        data={data?.content ?? []}
        paginationData={data}
        isLoading={isLoading}
      />
    </div>
  );
}
