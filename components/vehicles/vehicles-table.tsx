'use client';

import DataGrid from '../data-grid/cell-border';
import { GetVehiclesResponseSchemaType, VehicleSchemaType } from '@/schemas/vehicles.schema';
import { VehiclesTableFilters } from './vehicles-table-filters';
import { useVehiclesTableColumns } from './use-vehicles-table-columns';
import { VehiclesTableQuery } from './use-vehicles-queries';

interface VehiclesTableProps {
  data: VehicleSchemaType[];
  paginationData?: GetVehiclesResponseSchemaType;
  isLoading?: boolean;
  query: VehiclesTableQuery[0];
  setQuery: VehiclesTableQuery[1];
}

export function VehiclesTable({ query, setQuery, data, paginationData, isLoading = false }: VehiclesTableProps) {
  const columns = useVehiclesTableColumns();

  return (
    <div className='space-y-4'>
      <VehiclesTableFilters query={query} setQuery={setQuery} />
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
      {paginationData && (
        <div className='text-sm text-muted-foreground text-center'>
          Page {paginationData.page + 1} of {paginationData.totalPages} • {paginationData.totalElements} total vehicles
        </div>
      )}
    </div>
  );
}
