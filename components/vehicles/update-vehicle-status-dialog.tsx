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
import { Power } from 'lucide-react';
import { useUpdateVehicleStatusMutation } from '@/api/vehicles/vehicles.mutations';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface UpdateVehicleStatusDialogProps {
  carId: number;
  currentStatus: boolean;
  vehicleName: string;
}

export function UpdateVehicleStatusDialog({ carId, currentStatus, vehicleName }: UpdateVehicleStatusDialogProps) {
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(currentStatus);
  const [reason, setReason] = useState('');

  const updateStatusMutation = useUpdateVehicleStatusMutation();

  const handleSubmit = () => {
    updateStatusMutation.mutate(
      {
        params: { carId },
        body: { available, reason: reason || undefined },
      },
      {
        onSuccess: () => {
          toast.success('Vehicle status updated successfully');
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to update vehicle status');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Power className='size-4' />
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Vehicle Availability</DialogTitle>
          <DialogDescription>
            Change the availability status for <strong>{vehicleName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <Label htmlFor='available'>Available for Rent</Label>
              <p className='text-sm text-muted-foreground'>
                {available ? 'Vehicle can be booked by customers' : 'Vehicle is not available for booking'}
              </p>
            </div>
            <Switch id='available' checked={available} onCheckedChange={setAvailable} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reason'>Reason (Optional)</Label>
            <Textarea
              id='reason'
              placeholder='e.g., Under maintenance, Seasonal adjustment...'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
            <p className='text-xs text-muted-foreground'>Provide a reason for the status change</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={updateStatusMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updateStatusMutation.isPending || available === currentStatus}>
            {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
