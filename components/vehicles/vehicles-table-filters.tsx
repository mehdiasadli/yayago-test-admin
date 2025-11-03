import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { VehiclesTableQuery } from './use-vehicles-queries';

export function VehiclesTableFilters({
  query,
  setQuery,
}: {
  query: VehiclesTableQuery[0];
  setQuery: VehiclesTableQuery[1];
}) {
  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex items-center gap-2 flex-1'>
        <Input
          placeholder='Search by brand, model...'
          value={query.searchTerm ?? ''}
          onChange={(e) => setQuery({ ...query, searchTerm: e.target.value })}
          className='max-w-sm'
        />
        <Input
          placeholder='Brand'
          value={query.brand ?? ''}
          onChange={(e) => setQuery({ ...query, brand: e.target.value })}
          className='max-w-xs'
        />
        <Input
          placeholder='Model'
          value={query.model ?? ''}
          onChange={(e) => setQuery({ ...query, model: e.target.value })}
          className='max-w-xs'
        />
      </div>
      <div className='flex items-center gap-2'>
        <Select
          value={query.available === null || query.available === undefined ? 'all' : query.available ? 'true' : 'false'}
          onValueChange={(value) => setQuery({ ...query, available: value === 'all' ? undefined : value === 'true' })}
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Availability' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='true'>Available</SelectItem>
            <SelectItem value='false'>Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
