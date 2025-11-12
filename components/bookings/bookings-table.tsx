'use client';

import { useState } from 'react';
import DataGrid from '../data-grid/cell-border';
import { AdminBookingSchemaType, SearchAdminBookingsResponseSchemaType } from '@/schemas/bookings.schema';
import { BookingsTableFilters } from './bookings-table-filters';
import { useBookingsTableColumns } from './use-bookings-table-columns';
import { BookingsTableQuery } from './use-bookings-queries';
import { BulkUpdateBookingStatusDialog } from './bulk-update-booking-status-dialog';

interface BookingsTableProps {
  data: AdminBookingSchemaType[];
  paginationData?: SearchAdminBookingsResponseSchemaType;
  isLoading?: boolean;
  query: BookingsTableQuery[0];
  setQuery: BookingsTableQuery[1];
}

export function BookingsTable({ query, setQuery, data, paginationData, isLoading = false }: BookingsTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allIds = data.map((booking) => booking.id);
  const columns = useBookingsTableColumns({
    selectedIds,
    onSelectionChange: setSelectedIds,
    allIds,
  });

  const handleBulkUpdateSuccess = () => {
    setSelectedIds([]);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <BookingsTableFilters query={query} setQuery={setQuery} />
        <BulkUpdateBookingStatusDialog bookingIds={selectedIds} onSuccess={handleBulkUpdateSuccess} />
      </div>
      <DataGrid
        showNumbers={false}
        showPrevNext={true}
        data={data}
        columns={columns}
        pageSize={query.size}
        isLoading={isLoading}
        page={query.page}
        setPage={(page) => setQuery({ page })}
      />
      {paginationData && (
        <div className='text-sm text-muted-foreground text-center'>
          Page {paginationData.page + 1} of {paginationData.totalPages} • {paginationData.totalElements} total bookings
          {selectedIds.length > 0 && ` • ${selectedIds.length} selected`}
        </div>
      )}
    </div>
  );
}
