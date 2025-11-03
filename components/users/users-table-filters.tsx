import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { UsersTableQuery } from './use-users-queries';

export function UsersTableFilters({ query, setQuery }: { query: UsersTableQuery[0]; setQuery: UsersTableQuery[1] }) {
  return (
    <div className='flex justify-between items-center gap-4'>
      <Input
        placeholder='Search'
        value={query.searchTerm ?? ''}
        onChange={(e) => setQuery({ ...query, searchTerm: e.target.value })}
      />
      <div className='flex items-center gap-2'>
        <Select
          value={query.active ?? 'all'}
          onValueChange={(value) => setQuery({ ...query, active: value as 'all' | 'true' | 'false' })}
        >
          <SelectTrigger className='w-36'>
            <SelectValue placeholder='Select active status' />
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='true'>Active</SelectItem>
              <SelectItem value='false'>Inactive</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
}
