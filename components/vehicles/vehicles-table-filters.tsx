import { parseAsBoolean, useQueryState } from 'nuqs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { VehiclesTableQuery } from './use-vehicles-queries';
import { VehicleFiltersDialog } from './vehicle-filters-dialog';
import { Button } from '../ui/button';
import { FilterIcon } from 'lucide-react';

interface VehiclesTableFiltersProps {
  query: VehiclesTableQuery[0];
  setQuery: VehiclesTableQuery[1];
}

export function VehiclesTableFilters({ query, setQuery }: VehiclesTableFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useQueryState('filters-open', parseAsBoolean.withDefault(false));

  return (
    <div className='flex justify-between items-center gap-4'>
      <Input
        placeholder='Search by brand, model...'
        value={query.searchTerm ?? ''}
        onChange={(e) => setQuery({ searchTerm: e.target.value })}
        className='max-w-sm'
      />
      {/* <Input
          placeholder='Brand'
          value={query.brand ?? ''}
          onChange={(e) => setQuery({ brand: e.target.value })}
          className='max-w-xs'
        />
        <Input
          placeholder='Model'
          value={query.model ?? ''}
          onChange={(e) => setQuery({ model: e.target.value })}
          className='max-w-xs'
        /> */}
      <div suppressHydrationWarning>
        <VehicleFiltersDialog open={filtersOpen} onOpenChange={setFiltersOpen} query={query} setQuery={setQuery}>
          <Button variant='outline'>
            <FilterIcon className='size-4' />
            Filters
          </Button>
        </VehicleFiltersDialog>
      </div>
    </div>
  );
}
