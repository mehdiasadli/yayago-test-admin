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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ThumbsDown } from 'lucide-react';
import { useRejectVehicleMutation } from '@/features/vehicles/vehicles.mutations';
import { toast } from 'sonner';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface RejectVehicleDialogProps {
  carId: number;
  vehicleName: string;
  variant?: 'button' | 'dropdown';
}

export function RejectVehicleDialog({ carId, vehicleName, variant = 'dropdown' }: RejectVehicleDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');

  const { mutate: rejectVehicle, isPending } = useRejectVehicleMutation();

  const handleReject = () => {
    if (!reason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    rejectVehicle(
      {
        params: { carId },
        query: { reason: reason.trim() },
      },
      {
        onSuccess: () => {
          toast.success('Vehicle rejected successfully');
          setOpen(false);
          setReason('');
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to reject vehicle');
        },
      }
    );
  };

  const trigger =
    variant === 'button' ? (
      <Button variant='destructive' size='sm'>
        <ThumbsDown className='size-4' />
        Reject
      </Button>
    ) : (
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <ThumbsDown className='size-4' />
        Reject
      </DropdownMenuItem>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Vehicle</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting <strong>{vehicleName}</strong>. The owner will be notified.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='reason'>Rejection Reason *</Label>
            <Textarea
              id='reason'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='Please specify why this vehicle is being rejected...'
              rows={4}
              disabled={isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleReject} disabled={isPending || !reason.trim()}>
            {isPending ? 'Rejecting...' : 'Reject Vehicle'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
