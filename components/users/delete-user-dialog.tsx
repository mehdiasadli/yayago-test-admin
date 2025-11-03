'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { useDeleteUserMutation } from '@/features/users/users.mutations';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DropdownMenuItem } from '../ui/dropdown-menu';

interface DeleteUserDialogProps {
  userId: number;
  userName: string;
  variant?: 'icon' | 'button';
}

export function DeleteUserDialog({ userId, userName, variant = 'icon' }: DeleteUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const router = useRouter();

  const close = () => {
    setIsOpen(false);
    setConfirmText('');
  };

  const { mutate: deleteUser, isPending } = useDeleteUserMutation(userId);

  const handleDelete = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        close();
        router.push('/users');
      },
    });
  };

  const isConfirmed = confirmText === 'DELETE';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {variant === 'icon' ? (
          <Button size='icon' variant='ghost' className='text-destructive hover:text-destructive'>
            <Trash2 className='size-4' />
          </Button>
        ) : (
          <DropdownMenuItem
            className='text-destructive focus:text-destructive cursor-pointer'
            onSelect={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            <Trash2 className='size-4' />
            Delete
          </DropdownMenuItem>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
              <AlertTriangle className='h-5 w-5 text-destructive' />
            </div>
            <div>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription className='text-sm text-muted-foreground'>
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='rounded-lg border border-destructive/20 bg-destructive/5 p-4'>
            <p className='text-sm text-muted-foreground'>
              You are about to permanently delete <span className='font-semibold text-foreground'>{userName}</span>.
              This will remove all associated data including:
            </p>
            <ul className='mt-3 space-y-1 text-sm text-muted-foreground'>
              <li className='flex items-center gap-2'>
                <span className='h-1 w-1 rounded-full bg-destructive' />
                User profile and account information
              </li>
              <li className='flex items-center gap-2'>
                <span className='h-1 w-1 rounded-full bg-destructive' />
                Booking history and records
              </li>
              <li className='flex items-center gap-2'>
                <span className='h-1 w-1 rounded-full bg-destructive' />
                All associated data and activity logs
              </li>
            </ul>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirm' className='text-sm font-medium'>
              Type <span className='font-mono font-bold text-destructive'>DELETE</span> to confirm
            </Label>
            <Input
              id='confirm'
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type DELETE to confirm'
              className='font-mono'
              disabled={isPending}
            />
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <Button type='button' variant='outline' onClick={close} disabled={isPending}>
            Cancel
          </Button>
          <Button type='button' variant='destructive' onClick={handleDelete} disabled={!isConfirmed || isPending}>
            {isPending ? (
              <>
                <Loader2 className='mr-2 size-4 animate-spin' />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className='mr-2 size-4' />
                Delete User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
