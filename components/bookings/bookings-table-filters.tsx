import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BookingsTableQuery } from './use-bookings-queries';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface BookingsTableFiltersProps {
  query: BookingsTableQuery[0];
  setQuery: BookingsTableQuery[1];
}

export function BookingsTableFilters({ query, setQuery }: BookingsTableFiltersProps) {
  const hasActiveFilters = query.status || query.dateFrom || query.dateTo;

  const clearFilters = () => {
    setQuery({
      status: null,
      dateFrom: null,
      dateTo: null,
      userId: null,
      carId: null,
    });
  };

  return (
    <div className='flex justify-between items-center gap-4 flex-wrap'>
      <div className='flex items-center gap-2'>
        <Select
          value={query.status || 'all'}
          onValueChange={(value) => setQuery({ status: value === 'all' ? null : value })}
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='PENDING'>Pending</SelectItem>
            <SelectItem value='CONFIRMED'>Confirmed</SelectItem>
            <SelectItem value='COMPLETED'>Completed</SelectItem>
            <SelectItem value='CANCELLED'>Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={query.sortBy || 'none'}
          onValueChange={(value) =>
            setQuery({
              sortBy: value === 'none' ? null : value,
              sortOrder: value === 'none' ? null : query.sortOrder || 'desc',
            })
          }
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='none'>No Sorting</SelectItem>
            <SelectItem value='startDate'>Start Date</SelectItem>
            <SelectItem value='totalPrice'>Total Price</SelectItem>
            <SelectItem value='status'>Status</SelectItem>
          </SelectContent>
        </Select>

        {query.sortBy && (
          <Select value={query.sortOrder || 'desc'} onValueChange={(value) => setQuery({ sortOrder: value })}>
            <SelectTrigger className='w-32'>
              <SelectValue placeholder='Order' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {hasActiveFilters && (
        <Button variant='ghost' size='sm' onClick={clearFilters}>
          <X className='h-4 w-4 mr-1' />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
