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
import { DollarSign } from 'lucide-react';
import { useUpdateVehiclePriceMutation } from '@/api/vehicles/vehicles.mutations';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface UpdateVehiclePriceDialogProps {
  carId: number;
  currentPrice: number;
  currency: string;
  vehicleName: string;
}

export function UpdateVehiclePriceDialog({
  carId,
  currentPrice,
  currency,
  vehicleName,
}: UpdateVehiclePriceDialogProps) {
  const [open, setOpen] = useState(false);
  const [pricePerDay, setPricePerDay] = useState(currentPrice);
  const [reason, setReason] = useState('');

  const updatePriceMutation = useUpdateVehiclePriceMutation();

  const handleSubmit = () => {
    if (pricePerDay <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    updatePriceMutation.mutate(
      {
        params: { carId },
        body: { pricePerDay, reason: reason || undefined },
      },
      {
        onSuccess: () => {
          toast.success('Vehicle price updated successfully');
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to update vehicle price');
        },
      }
    );
  };

  const priceChanged = pricePerDay !== currentPrice;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <DollarSign className='size-4' />
          Update Price
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Vehicle Price</DialogTitle>
          <DialogDescription>
            Change the daily rental price for <strong>{vehicleName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='pricePerDay'>Price Per Day ({currency})</Label>
            <div className='relative'>
              <DollarSign className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                id='pricePerDay'
                type='number'
                min='0'
                step='0.01'
                placeholder='100.00'
                className='pl-10'
                value={pricePerDay}
                onChange={(e) => setPricePerDay(Number(e.target.value))}
              />
            </div>
            {priceChanged && (
              <p className='text-xs text-muted-foreground'>
                Change: {currentPrice} → {pricePerDay} {currency} ({pricePerDay > currentPrice ? '+' : ''}
                {(((pricePerDay - currentPrice) / currentPrice) * 100).toFixed(1)}%)
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reason'>Reason (Optional)</Label>
            <Textarea
              id='reason'
              placeholder='e.g., Market adjustment, Seasonal pricing...'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
            <p className='text-xs text-muted-foreground'>Provide a reason for the price change</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={updatePriceMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updatePriceMutation.isPending || !priceChanged || pricePerDay <= 0}>
            {updatePriceMutation.isPending ? 'Updating...' : 'Update Price'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
