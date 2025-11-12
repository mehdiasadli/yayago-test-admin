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
    brandLike: parseAsString.withDefault('').withOptions({
      history: 'push',
    }),
    model: parseAsString.withDefault('').withOptions({
      history: 'push',
    }),
    year: parseAsInteger.withOptions({
      history: 'push',
    }),
    yearFrom: parseAsInteger.withOptions({
      history: 'push',
    }),
    yearTo: parseAsInteger.withOptions({
      history: 'push',
    }),
    minPrice: parseAsInteger.withOptions({
      history: 'push',
    }),
    maxPrice: parseAsInteger.withOptions({
      history: 'push',
    }),
    status: parseAsString.withOptions({
      history: 'push',
    }),
    carType: parseAsString.withOptions({
      history: 'push',
    }),
    featured: parseAsBoolean.withOptions({
      history: 'push',
    }),
    hasImages: parseAsBoolean.withOptions({
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

export type VehiclesTableQuery = ReturnType<typeof useVehiclesTableQueries>;
