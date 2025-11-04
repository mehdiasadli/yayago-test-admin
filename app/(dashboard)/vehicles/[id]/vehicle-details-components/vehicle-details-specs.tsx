import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Gauge, Settings } from 'lucide-react';
import { Fuel } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Users } from 'lucide-react';
import { Car } from 'lucide-react';
import { VehicleSchemaType } from '@/schemas/vehicles.schema';

interface VehicleDetailsSpecsProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsSpecs({ vehicle }: VehicleDetailsSpecsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Settings className='h-5 w-5' />
          Specifications
        </CardTitle>
        <CardDescription>Technical details and features</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {vehicle.fuelType && (
          <>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Fuel className='h-4 w-4' />
                <span>Fuel Type</span>
              </div>
              <span className='text-sm font-medium'>{vehicle.fuelType}</span>
            </div>
            <Separator />
          </>
        )}
        {vehicle.transmission && (
          <>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Gauge className='h-4 w-4' />
                <span>Transmission</span>
              </div>
              <span className='text-sm font-medium'>{vehicle.transmission}</span>
            </div>
            <Separator />
          </>
        )}
        {vehicle.seatCount && (
          <>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Users className='h-4 w-4' />
                <span>Seats</span>
              </div>
              <span className='text-sm font-medium'>{vehicle.seatCount}</span>
            </div>
            <Separator />
          </>
        )}
        {vehicle.doorCount && (
          <>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Car className='h-4 w-4' />
                <span>Doors</span>
              </div>
              <span className='text-sm font-medium'>{vehicle.doorCount}</span>
            </div>
            <Separator />
          </>
        )}
        {vehicle.carType && (
          <>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Car className='h-4 w-4' />
                <span>Type</span>
              </div>
              <span className='text-sm font-medium'>{vehicle.carType}</span>
            </div>
            <Separator />
          </>
        )}
        {vehicle.color && (
          <div className='flex items-center justify-between py-2'>
            <span className='text-sm text-muted-foreground'>Color</span>
            <span className='text-sm font-medium'>{vehicle.color}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
