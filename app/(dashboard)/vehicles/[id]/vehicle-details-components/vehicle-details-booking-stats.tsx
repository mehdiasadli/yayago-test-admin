import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

interface VehicleDetailsBookingStatsProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsBookingStats({ vehicle }: VehicleDetailsBookingStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5' />
          Booking Statistics
        </CardTitle>
        <CardDescription>Vehicle booking activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-muted-foreground'>Total Bookings</p>
              <p className='text-3xl font-bold'>{vehicle.totalBookings}</p>
            </div>
            <div className='rounded-full bg-primary/10 p-3'>
              <ShoppingBag className='h-6 w-6 text-primary' />
            </div>
          </div>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-muted-foreground'>Active Bookings</p>
              <p className='text-3xl font-bold'>{vehicle.activeBookings}</p>
            </div>
            <div className='rounded-full bg-green-500/10 p-3'>
              <CheckCircle2 className='h-6 w-6 text-green-600 dark:text-green-400' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
