import { parseAsBoolean, parseAsIndex, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export function useVehiclesTableQueries() {
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
    brand: parseAsString.withDefault('').withOptions({
      history: 'push',
    }),
    model: parseAsString.withDefault('').withOptions({
      history: 'push',
    }),
    available: parseAsBoolean.withOptions({
      history: 'push',
    }),
  });
}

export type VehiclesTableQuery = ReturnType<typeof useVehiclesTableQueries>;
