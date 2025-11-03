import { parseAsIndex, parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState, useQueryStates } from 'nuqs';

export function useUsersQueries() {
  const [page, setPage] = useQueryState(
    'page',
    parseAsIndex.withDefault(0).withOptions({
      history: 'push',
    })
  );

  const [size, setSize] = useQueryState(
    'size',
    parseAsInteger.withDefault(10).withOptions({
      history: 'push',
    })
  );

  const [searchTerm, setSearchTerm] = useQueryState(
    'searchTerm',
    parseAsString.withDefault('').withOptions({
      history: 'push',
    })
  );

  const [active, setActive] = useQueryState(
    'active',
    parseAsStringLiteral(['all', 'true', 'false']).withDefault('all').withOptions({
      history: 'push',
    })
  );

  return {
    page,
    setPage,
    size,
    setSize,
    searchTerm,
    setSearchTerm,
    active,
    setActive,
  };
}

export function useUsersTableQueries() {
  return useQueryStates({
    page: parseAsIndex.withDefault(0).withOptions({
      history: 'push',
    }),
    size: parseAsInteger.withDefault(10).withOptions({
      history: 'push',
    }),
    searchTerm: parseAsString.withDefault('').withOptions({
      history: 'push',
    }),
    active: parseAsStringLiteral(['all', 'true', 'false']).withDefault('all').withOptions({
      history: 'push',
    }),
  });
}

export type UsersTableQuery = ReturnType<typeof useUsersTableQueries>;
