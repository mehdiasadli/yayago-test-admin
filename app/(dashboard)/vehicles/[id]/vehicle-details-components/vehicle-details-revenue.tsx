import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';

interface VehicleDetailsRevenueProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsRevenue({ vehicle }: VehicleDetailsRevenueProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          Revenue
        </CardTitle>
        <CardDescription>Financial performance</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Total Revenue</p>
            <p className='text-3xl font-bold'>
              {vehicle.currency} {vehicle.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className='rounded-full bg-blue-500/10 p-3'>
            <DollarSign className='h-6 w-6 text-blue-600 dark:text-blue-400' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center justify-between py-2'>
            <span className='text-sm text-muted-foreground'>Deposit</span>
            <span className='text-sm font-medium'>
              {vehicle.currency} {vehicle.deposit.toFixed(2)}
            </span>
          </div>
          {vehicle.discountPercentage > 0 && (
            <>
              <Separator />
              <div className='flex items-center justify-between py-2'>
                <span className='text-sm text-muted-foreground'>Discount</span>
                <span className='text-sm font-medium'>{vehicle.discountPercentage}%</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
