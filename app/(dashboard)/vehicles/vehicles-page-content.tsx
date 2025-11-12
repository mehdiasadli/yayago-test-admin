'use client';

import { createGetVehiclesQueryOptions } from '@/features/vehicles/vehicles.queries';
import { VehiclesTable } from '@/components/vehicles/vehicles-table';
import { useQuery } from '@tanstack/react-query';
import { useVehiclesTableQueries } from '@/components/vehicles/use-vehicles-queries';
import { VehiclesStats } from './vehicles-stats';

export function VehiclesPageContent() {
  const [query, setQuery] = useVehiclesTableQueries();

  const { data, isLoading } = useQuery(
    createGetVehiclesQueryOptions({
      searchTerm: query.searchTerm || undefined,
      brand: query.brand || undefined,
      brandLike: query.brandLike || undefined,
      model: query.model || undefined,
      year: query.year || undefined,
      yearFrom: query.yearFrom || undefined,
      yearTo: query.yearTo || undefined,
      minPrice: query.minPrice || undefined,
      maxPrice: query.maxPrice || undefined,
      status: query.status as any,
      carType: query.carType || undefined,
      featured: query.featured !== null && query.featured !== undefined ? query.featured : undefined,
      hasImages: query.hasImages !== null && query.hasImages !== undefined ? query.hasImages : undefined,
      page: query.page,
      size: query.size,
      sortBy: query.sortBy || undefined,
      sortOrder: query.sortOrder as 'asc' | 'desc' | undefined,
    })
  );

  return (
    <div className='space-y-4'>
      <VehiclesStats />
      <VehiclesTable
        query={query}
        setQuery={setQuery}
        data={data?.content ?? []}
        paginationData={data}
        isLoading={isLoading}
      />
    </div>
  );
}
