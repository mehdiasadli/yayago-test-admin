import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { VehiclesTableQuery } from './use-vehicles-queries';

interface VehicleTableSortingProps {
  query: VehiclesTableQuery[0];
  setQuery: VehiclesTableQuery[1];
}

export function VehicleTableSorting({ query, setQuery }: VehicleTableSortingProps) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='createdAt'>Created At</SelectItem>
      </SelectContent>
    </Select>
  );
}
