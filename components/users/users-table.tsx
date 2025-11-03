'use client';

import DataGrid from '../data-grid/cell-border';
import { UserSchemaType } from '@/schemas/users.schema';
import { UsersTableFilters } from './users-table-filters';
import { useUsersTableColumns } from './use-users-table-columns';
import { UsersTableQuery } from './use-users-queries';

interface UsersTableProps {
  data: UserSchemaType[];
  isLoading?: boolean;
  query: UsersTableQuery[0];
  setQuery: UsersTableQuery[1];
}

export function UsersTable({ query, setQuery, data, isLoading = false }: UsersTableProps) {
  const columns = useUsersTableColumns();

  return (
    <div className='space-y-4'>
      <UsersTableFilters query={query} setQuery={setQuery} />
      <DataGrid
        showNumbers={false}
        showPrevNext={true}
        data={data}
        columns={columns}
        pageSize={query.size}
        isLoading={isLoading}
        page={query.page}
        setPage={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
}
