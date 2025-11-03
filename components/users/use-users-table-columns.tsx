import { UserSchemaType } from '@/schemas/users.schema';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { EllipsisVerticalIcon } from 'lucide-react';
import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { DeleteUserDialog } from './delete-user-dialog';
import { EyeIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { SetUserStatusDialog } from './set-user-status-dialog';

export function useUsersTableColumns() {
  return useMemo<ColumnDef<UserSchemaType>[]>(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <Link href={`/users/${row.original.id}`} className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={row.original.avatarUrl ?? ''} />
              <AvatarFallback>{row.original.avatarName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className='text-md font-bold'>{row.original.fullName}</span>
          </Link>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Contact',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <a href={`mailto:${row.original.email}`} className='text-xs font-bold hover:underline'>
              {row.original.email}
            </a>
            <a
              href={`tel:${row.original.phoneNumber}`}
              className='text-xs text-muted-foreground font-bold hover:underline'
            >
              {row.original.phoneNumber}
            </a>
          </div>
        ),
      },
      {
        accessorKey: 'active',
        header: 'Active',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Badge variant={row.original.active ? 'success' : 'destructive'} className='text-white'>
              {row.original.active ? 'Active' : 'Inactive'}
            </Badge>
            <SetUserStatusDialog userId={row.original.id} initialStatus={row.original.active} />
          </div>
        ),
        size: 100,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => <span>{format(new Date(row.original.createdAt), 'dd.MM.yyyy, HH:mm')}</span>,
        size: 120,
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
      },
      {
        accessorFn: (row) => `${row.totalBookings}-${row.activeBookings}`,
        header: 'Bookings',
        meta: {
          skeleton: <Skeleton className='h-10 w-full' />,
        },
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <span className='text-md font-bold'>{row.original.totalBookings} active bookings</span>
            <span className='text-sm text-muted-foreground'>out of {row.original.totalBookings}</span>
          </div>
        ),
      },
      {
        // actions
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
                <Link href={`/users/${row.original.id}`}>
                  <DropdownMenuItem>
                    <EyeIcon className='size-4' />
                    View
                  </DropdownMenuItem>
                </Link>

                <DeleteUserDialog userId={row.original.id} userName={row.original.fullName} variant='button' />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    []
  );
}
