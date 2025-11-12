'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AdminBookingSchemaType } from '@/schemas/bookings.schema';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

interface UseBookingsTableColumnsProps {
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  allIds: number[];
}

export function useBookingsTableColumns({
  selectedIds,
  onSelectionChange,
  allIds,
}: UseBookingsTableColumnsProps): ColumnDef<AdminBookingSchemaType>[] {
  const isAllSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

  return [
    {
      id: 'select',
      header: () => (
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={(value) => {
            if (value) {
              onSelectionChange(allIds);
            } else {
              onSelectionChange([]);
            }
          }}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedIds.includes(row.original.id)}
          onCheckedChange={(value) => {
            if (value) {
              onSelectionChange([...selectedIds, row.original.id]);
            } else {
              onSelectionChange(selectedIds.filter((id) => id !== row.original.id));
            }
          }}
          aria-label='Select row'
        />
      ),
      size: 50,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'ID',
      size: 80,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        const variant =
          status === 'CONFIRMED'
            ? 'success'
            : status === 'PENDING'
              ? 'warning'
              : status === 'COMPLETED'
                ? 'info'
                : 'destructive';

        return (
          <Badge variant={variant} className='text-white'>
            {status}
          </Badge>
        );
      },
      size: 120,
    },
    {
      accessorKey: 'userFullName',
      header: 'Customer',
      cell: ({ row }) => (
        <Link href={`/users/${row.original.userId}`} className='hover:underline font-medium'>
          {row.original.userFullName}
        </Link>
      ),
      size: 200,
    },
    {
      accessorKey: 'vehicle',
      header: 'Vehicle',
      cell: ({ row }) => (
        <Link href={`/vehicles/${row.original.carId}`} className='hover:underline'>
          {row.original.carBrand} {row.original.carModel}
        </Link>
      ),
      size: 200,
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => format(row.original.startDate, 'MMM dd, yyyy'),
      size: 150,
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => format(row.original.endDate, 'MMM dd, yyyy'),
      size: 150,
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total Price',
      cell: ({ row }) => {
        return <span className='font-semibold'>${row.original.totalPrice.toFixed(2)}</span>;
      },
      size: 120,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Link href={`/bookings/${row.original.id}`}>
          <Button variant='ghost' size='sm'>
            <Eye className='h-4 w-4' />
            View
          </Button>
        </Link>
      ),
      size: 100,
    },
  ];
}
