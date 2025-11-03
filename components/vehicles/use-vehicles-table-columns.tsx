import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { EllipsisVerticalIcon, EyeIcon, CarIcon } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { DeleteVehicleDialog } from '../vehicles/delete-vehicle-dialog';
import { ApproveVehicleDialog } from '../vehicles/approve-vehicle-dialog';
import { RejectVehicleDialog } from '../vehicles/reject-vehicle-dialog';
import { VehicleStatusBadge } from './vehicle-status-badge';

export function useVehiclesTableColumns() {
  return useMemo<ColumnDef<VehicleSchemaType>[]>(
    () => [
      {
        accessorKey: 'brand',
        header: 'Vehicle',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <Link href={`/vehicles/${row.original.id}`} className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <span className='text-md font-bold'>
                {row.original.brand} {row.original.model}
              </span>
              <span className='text-xs text-muted-foreground'>{row.original.year}</span>
            </div>
          </Link>
        ),
      },
      {
        accessorKey: 'pricePerDay',
        header: 'Price',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <span className='text-md font-bold'>
              {row.original.currency} {row.original.pricePerDay.toFixed(2)}
            </span>
            <span className='text-xs text-muted-foreground'>per day</span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => {
          return <VehicleStatusBadge status={row.original.status} />;
        },
        size: 120,
      },
      {
        accessorKey: 'available',
        header: 'Availability',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <Badge variant={row.original.available ? 'success' : 'destructive'} className='text-white'>
            {row.original.available ? 'Available' : 'Unavailable'}
          </Badge>
        ),
        size: 100,
      },
      {
        accessorKey: 'fuelType',
        header: 'Details',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex flex-col gap-1'>
            {row.original.fuelType && (
              <span className='text-sm'>
                <span className='font-semibold'>Fuel:</span> {row.original.fuelType}
              </span>
            )}
            {row.original.carType && (
              <span className='text-sm'>
                <span className='font-semibold'>Type:</span> {row.original.carType}
              </span>
            )}
            {(row.original.seatCount || row.original.doorCount) && (
              <span className='text-sm text-muted-foreground'>
                {row.original.seatCount ? `${row.original.seatCount} seats` : ''}
                {row.original.seatCount && row.original.doorCount ? ' • ' : ''}
                {row.original.doorCount ? `${row.original.doorCount} doors` : ''}
              </span>
            )}
            {!row.original.fuelType && !row.original.carType && !row.original.seatCount && !row.original.doorCount && (
              <span className='text-sm text-muted-foreground'>No details</span>
            )}
          </div>
        ),
      },
      {
        accessorFn: (row) => `${row.totalBookings}-${row.activeBookings}`,
        header: 'Bookings',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <span className='text-md font-bold'>{row.original.activeBookings} active</span>
            <span className='text-sm text-muted-foreground'>of {row.original.totalBookings} total</span>
          </div>
        ),
      },
      {
        accessorKey: 'totalRevenue',
        header: 'Revenue',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <span className='text-md font-bold'>
              {row.original.currency} {row.original.totalRevenue.toFixed(2)}
            </span>
            <span className='text-xs text-muted-foreground'>total earned</span>
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => <span>{format(new Date(row.original.createdAt), 'dd.MM.yyyy')}</span>,
        size: 120,
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
      },
      {
        accessorKey: 'actions',
        header: '',
        size: 40,
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex justify-end'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <EllipsisVerticalIcon className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <Link href={`/vehicles/${row.original.id}`}>
                  <DropdownMenuItem>
                    <EyeIcon className='size-4' />
                    View Details
                  </DropdownMenuItem>
                </Link>
                {row.original.status === 'PENDING' && (
                  <>
                    <ApproveVehicleDialog
                      carId={row.original.id}
                      vehicleName={`${row.original.brand} ${row.original.model}`}
                    />
                    <RejectVehicleDialog
                      carId={row.original.id}
                      vehicleName={`${row.original.brand} ${row.original.model}`}
                    />
                  </>
                )}
                <DeleteVehicleDialog
                  carId={row.original.id}
                  vehicleName={`${row.original.brand} ${row.original.model}`}
                  variant='button'
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    []
  );
}
