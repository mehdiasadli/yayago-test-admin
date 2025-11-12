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
import { useUpdateVehiclePriceMutation } from '@/features/vehicles/vehicles.mutations';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VehicleSchemaType } from '@/schemas/vehicles.schema';

interface UpdateVehiclePriceDialogProps {
  vehicle: VehicleSchemaType;
  vehicleName: string;
}

export function UpdateVehiclePriceDialog({ vehicle, vehicleName }: UpdateVehiclePriceDialogProps) {
  const [open, setOpen] = useState(false);
  const [pricePerDay, setPricePerDay] = useState(vehicle.pricePerDay);
  const [pricePerWeek, setPricePerWeek] = useState(vehicle.pricePerWeek || 0);
  const [pricePerMonth, setPricePerMonth] = useState(vehicle.pricePerMonth || 0);
  const [currency, setCurrency] = useState(vehicle.currency);
  const [deposit, setDeposit] = useState(vehicle.deposit);
  const [discountPercentage, setDiscountPercentage] = useState(vehicle.discountPercentage);
  const [reason, setReason] = useState('');

  const updatePriceMutation = useUpdateVehiclePriceMutation();

  const handleSubmit = () => {
    if (pricePerDay <= 0) {
      toast.error('Price per day must be greater than 0');
      return;
    }
    if (deposit < 0) {
      toast.error('Deposit cannot be negative');
      return;
    }

    updatePriceMutation.mutate(
      {
        params: { carId: vehicle.id },
        body: {
          pricePerDay,
          pricePerWeek: pricePerWeek > 0 ? pricePerWeek : undefined,
          pricePerMonth: pricePerMonth > 0 ? pricePerMonth : undefined,
          currency: currency as any,
          deposit,
          discountPercentage: discountPercentage > 0 ? discountPercentage : undefined,
          reason: reason || undefined,
        },
      },
      {
        onSuccess: () => {
          toast.success('Vehicle pricing updated successfully');
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to update vehicle pricing');
        },
      }
    );
  };

  const hasChanged =
    pricePerDay !== vehicle.pricePerDay ||
    pricePerWeek !== (vehicle.pricePerWeek || 0) ||
    pricePerMonth !== (vehicle.pricePerMonth || 0) ||
    currency !== vehicle.currency ||
    deposit !== vehicle.deposit ||
    discountPercentage !== vehicle.discountPercentage;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <DollarSign className='size-4' />
          Update Price
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Update Vehicle Pricing</DialogTitle>
          <DialogDescription>
            Update pricing and deposit information for <strong>{vehicleName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='pricePerDay'>Price Per Day *</Label>
              <Input
                id='pricePerDay'
                type='number'
                min='0'
                step='0.01'
                placeholder='100.00'
                value={pricePerDay}
                onChange={(e) => setPricePerDay(Number(e.target.value))}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='pricePerWeek'>Price Per Week</Label>
              <Input
                id='pricePerWeek'
                type='number'
                min='0'
                step='0.01'
                placeholder='600.00'
                value={pricePerWeek}
                onChange={(e) => setPricePerWeek(Number(e.target.value))}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='pricePerMonth'>Price Per Month</Label>
              <Input
                id='pricePerMonth'
                type='number'
                min='0'
                step='0.01'
                placeholder='2000.00'
                value={pricePerMonth}
                onChange={(e) => setPricePerMonth(Number(e.target.value))}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='currency'>Currency *</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id='currency'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='AED'>AED</SelectItem>
                  <SelectItem value='USD'>USD</SelectItem>
                  <SelectItem value='AZN'>AZN</SelectItem>
                  <SelectItem value='EUR'>EUR</SelectItem>
                  <SelectItem value='RUB'>RUB</SelectItem>
                  <SelectItem value='GBP'>GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='deposit'>Deposit *</Label>
              <Input
                id='deposit'
                type='number'
                min='0'
                step='0.01'
                placeholder='500.00'
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='discountPercentage'>Discount (%)</Label>
              <Input
                id='discountPercentage'
                type='number'
                min='0'
                max='100'
                step='1'
                placeholder='0'
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              />
            </div>
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
            <p className='text-xs text-muted-foreground'>Provide a reason for the pricing change</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={updatePriceMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updatePriceMutation.isPending || !hasChanged || pricePerDay <= 0}>
            {updatePriceMutation.isPending ? 'Updating...' : 'Update Pricing'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
