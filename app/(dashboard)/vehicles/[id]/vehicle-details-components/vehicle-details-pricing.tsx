import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface VehicleDetailsPricingProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsPricing({ vehicle }: VehicleDetailsPricingProps) {
  if (!(vehicle.pricePerWeek || vehicle.pricePerMonth)) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <DollarSign className='h-5 w-5' />
          Pricing Plans
        </CardTitle>
        <CardDescription>Alternative pricing options</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm text-muted-foreground'>Per Day</span>
          <span className='text-sm font-medium'>
            {vehicle.currency} {vehicle.pricePerDay.toFixed(2)}
          </span>
        </div>
        {vehicle.pricePerWeek && (
          <>
            <Separator />
            <div className='flex items-center justify-between py-2'>
              <span className='text-sm text-muted-foreground'>Per Week</span>
              <span className='text-sm font-medium'>
                {vehicle.currency} {vehicle.pricePerWeek.toFixed(2)}
              </span>
            </div>
          </>
        )}
        {vehicle.pricePerMonth && (
          <>
            <Separator />
            <div className='flex items-center justify-between py-2'>
              <span className='text-sm text-muted-foreground'>Per Month</span>
              <span className='text-sm font-medium'>
                {vehicle.currency} {vehicle.pricePerMonth.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
