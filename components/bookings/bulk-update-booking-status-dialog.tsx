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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';
import { useBulkUpdateBookingStatusMutation } from '@/features/bookings/bookings.mutations';
import { toast } from 'sonner';

interface BulkUpdateBookingStatusDialogProps {
  bookingIds: number[];
  onSuccess?: () => void;
}

export function BulkUpdateBookingStatusDialog({ bookingIds, onSuccess }: BulkUpdateBookingStatusDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'>('CONFIRMED');

  const bulkUpdateMutation = useBulkUpdateBookingStatusMutation();

  const handleSubmit = () => {
    bulkUpdateMutation.mutate(
      {
        bookingIds,
        status,
      },
      {
        onSuccess: () => {
          toast.success(`Successfully updated ${bookingIds.length} booking(s) to ${status}`);
          setOpen(false);
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to update bookings');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' disabled={bookingIds.length === 0}>
          <CheckSquare className='h-4 w-4 mr-2' />
          Bulk Update ({bookingIds.length})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Update Booking Status</DialogTitle>
          <DialogDescription>
            Update the status for <strong>{bookingIds.length}</strong> selected booking(s)
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='status'>New Status</Label>
            <Select value={status} onValueChange={(value: any) => setStatus(value)}>
              <SelectTrigger id='status'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='PENDING'>Pending</SelectItem>
                <SelectItem value='CONFIRMED'>Confirmed</SelectItem>
                <SelectItem value='COMPLETED'>Completed</SelectItem>
                <SelectItem value='CANCELLED'>Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <p className='text-xs text-muted-foreground'>All selected bookings will be updated to this status</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={bulkUpdateMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={bulkUpdateMutation.isPending}>
            {bulkUpdateMutation.isPending ? 'Updating...' : 'Update Bookings'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
