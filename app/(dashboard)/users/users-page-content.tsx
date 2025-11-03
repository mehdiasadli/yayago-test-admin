'use client';

import { createGetUsersQueryOptions } from '@/api/users/users.queries';
import { UsersTable } from '@/components/users/users-table';
import { useQuery } from '@tanstack/react-query';
import { useUsersTableQueries } from '@/components/users/use-users-queries';

export function UsersPageContent() {
  const [query, setQuery] = useUsersTableQueries();

  const { data, isLoading } = useQuery(
    createGetUsersQueryOptions({
      ...query,
      active: query.active === 'all' ? undefined : query.active === 'true' ? true : false,
    })
  );

  return <UsersTable query={query} setQuery={setQuery} data={data ?? []} isLoading={isLoading} />;
}
