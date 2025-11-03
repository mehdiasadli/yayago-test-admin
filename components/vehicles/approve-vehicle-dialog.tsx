'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';
import { useApproveVehicleMutation } from '@/api/vehicles/vehicles.mutations';

interface ApproveVehicleDialogProps {
  carId: number;
  vehicleName: string;
  variant?: 'button' | 'dropdown';
}

export function ApproveVehicleDialog({ carId, vehicleName, variant = 'dropdown' }: ApproveVehicleDialogProps) {
  const [open, setOpen] = useState(false);

  const { mutate: approveVehicle, isPending } = useApproveVehicleMutation();

  const handleApprove = () => {
    approveVehicle(
      { carId },
      {
        onSuccess: () => {
          toast.success('Vehicle approved successfully');
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to approve vehicle');
        },
      }
    );
  };

  const trigger =
    variant === 'button' ? (
      <Button variant='default' size='sm'>
        <ThumbsUp className='size-4' />
        Approve
      </Button>
    ) : (
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <ThumbsUp className='size-4' />
        Approve
      </DropdownMenuItem>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Vehicle</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve <strong>{vehicleName}</strong>? This vehicle will become available for
            booking.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleApprove} disabled={isPending}>
            {isPending ? 'Approving...' : 'Approve Vehicle'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
