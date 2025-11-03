'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { useDeleteVehicleMutation } from '@/api/vehicles/vehicles.mutations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface DeleteVehicleDialogProps {
  carId: number;
  vehicleName: string;
  variant?: 'icon' | 'button';
  redirectOnSuccess?: boolean;
}

export function DeleteVehicleDialog({
  carId,
  vehicleName,
  variant = 'icon',
  redirectOnSuccess = false,
}: DeleteVehicleDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const router = useRouter();

  const { mutate: deleteVehicle, isPending } = useDeleteVehicleMutation();

  const handleDelete = () => {
    if (confirmText !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    deleteVehicle(
      { carId },
      {
        onSuccess: () => {
          toast.success('Vehicle deleted successfully');
          setOpen(false);
          setConfirmText('');
          if (redirectOnSuccess) {
            router.push('/vehicles');
          }
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to delete vehicle');
        },
      }
    );
  };

  const trigger =
    variant === 'icon' ? (
      <Button variant='ghost' size='icon'>
        <Trash2 className='size-4 text-destructive' />
      </Button>
    ) : (
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <Trash2 className='size-4' />
        Delete
      </DropdownMenuItem>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Vehicle</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{vehicleName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='confirm'>
              Type <strong>DELETE</strong> to confirm
            </Label>
            <Input
              id='confirm'
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='DELETE'
              disabled={isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleDelete} disabled={isPending || confirmText !== 'DELETE'}>
            {isPending ? 'Deleting...' : 'Delete Vehicle'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
