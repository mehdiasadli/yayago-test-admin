import { parseAsIndex, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export function useBookingsTableQueries() {
  return useQueryStates({
    page: parseAsIndex.withDefault(0).withOptions({
      history: 'push',
    }),
    size: parseAsInteger.withDefault(10).withOptions({
      history: 'push',
    }),
    userId: parseAsInteger.withOptions({
      history: 'push',
    }),
    carId: parseAsInteger.withOptions({
      history: 'push',
    }),
    status: parseAsString.withOptions({
      history: 'push',
    }),
    dateFrom: parseAsString.withOptions({
      history: 'push',
    }),
    dateTo: parseAsString.withOptions({
      history: 'push',
    }),
    sortBy: parseAsString.withOptions({
      history: 'push',
    }),
    sortOrder: parseAsString.withOptions({
      history: 'push',
    }),
  });
}

export type BookingsTableQuery = ReturnType<typeof useBookingsTableQueries>;
