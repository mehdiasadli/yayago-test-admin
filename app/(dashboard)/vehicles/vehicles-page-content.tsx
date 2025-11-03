'use client';

import { createGetVehiclesQueryOptions } from '@/features/vehicles/vehicles.queries';
import { VehiclesTable } from '@/components/vehicles/vehicles-table';
import { useQuery } from '@tanstack/react-query';
import { useVehiclesTableQueries } from '@/components/vehicles/use-vehicles-queries';

export function VehiclesPageContent() {
  const [query, setQuery] = useVehiclesTableQueries();

  const { data, isLoading } = useQuery(
    createGetVehiclesQueryOptions({
      searchTerm: query.searchTerm || undefined,
      brand: query.brand || undefined,
      model: query.model || undefined,
      available: query.available !== null && query.available !== undefined ? query.available : undefined,
    })
  );

  return <VehiclesTable query={query} setQuery={setQuery} data={data ?? []} isLoading={isLoading} />;
}
