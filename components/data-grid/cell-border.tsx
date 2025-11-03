import { useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataGrid as TanstackDataGrid, DataGridContainer } from '@/components/ui/data-grid';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  ColumnDef,
  ColumnOrderState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { parseAsIndex, useQueryState } from 'nuqs';

interface DataGridProps<TData extends { id: string | number }> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
  showNumbers?: boolean;
  showPrevNext?: boolean;
  isLoading?: boolean;
  page?: number;
  setPage?: (page: number) => void;
}

export default function DataGrid<TData extends { id: string | number }>({
  data,
  columns,
  pageSize = 5,
  isLoading = false,
  page,
  setPage,
  showNumbers = true,
  showPrevNext = true,
}: DataGridProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const pagination = useMemo(
    () => ({
      pageIndex: page ?? 0,
      pageSize,
    }),
    [page, pageSize]
  );

  const table = useReactTable({
    columns,
    data,
    pageCount: -1, // Unknown page count for server-side pagination
    manualPagination: true, // We handle pagination externally
    getRowId: (row: TData) => row.id.toString(),
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
      setPage?.(newPagination.pageIndex);
    },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TanstackDataGrid
      table={table}
      recordCount={data?.length || 0}
      tableLayout={{
        cellBorder: true,
      }}
      isLoading={isLoading}
    >
      <div className='w-full space-y-2.5'>
        <DataGridContainer>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </DataGridContainer>
        <DataGridPagination showNumbers={showNumbers} showPrevNext={showPrevNext} />
      </div>
    </TanstackDataGrid>
  );
}
