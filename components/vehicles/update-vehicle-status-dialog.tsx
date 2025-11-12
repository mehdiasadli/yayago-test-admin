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
import { useUpdateVehicleStatusMutation } from '@/features/vehicles/vehicles.mutations';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CarStatusEnumType } from '@/schemas/vehicles.schema';

interface UpdateVehicleStatusDialogProps {
  carId: number;
  currentStatus: string;
  vehicleName: string;
}

export function UpdateVehicleStatusDialog({ carId, currentStatus, vehicleName }: UpdateVehicleStatusDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<CarStatusEnumType>(currentStatus as CarStatusEnumType);
  const [reason, setReason] = useState('');

  const updateStatusMutation = useUpdateVehicleStatusMutation();

  const handleSubmit = () => {
    updateStatusMutation.mutate(
      {
        params: { carId },
        body: { status, reason: reason || undefined },
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
          <DialogTitle>Update Vehicle Status</DialogTitle>
          <DialogDescription>
            Change the status for <strong>{vehicleName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='status'>Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as CarStatusEnumType)}>
              <SelectTrigger id='status'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='PENDING'>Pending</SelectItem>
                <SelectItem value='APPROVED'>Approved</SelectItem>
                <SelectItem value='AVAILABLE'>Available</SelectItem>
                <SelectItem value='OCCUPIED'>Occupied</SelectItem>
                <SelectItem value='REJECTED'>Rejected</SelectItem>
                <SelectItem value='BLOCKED'>Blocked</SelectItem>
                <SelectItem value='INACTIVE'>Inactive</SelectItem>
                <SelectItem value='DISABLED'>Disabled</SelectItem>
              </SelectContent>
            </Select>
            <p className='text-xs text-muted-foreground'>
              Current status: <strong>{currentStatus}</strong>
            </p>
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
          <Button onClick={handleSubmit} disabled={updateStatusMutation.isPending || status === currentStatus}>
            {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
