import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface VehicleDetailsSystemInfoProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsSystemInfo({ vehicle }: VehicleDetailsSystemInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='h-5 w-5' />
          System Information
        </CardTitle>
        <CardDescription>Record details</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm text-muted-foreground'>Vehicle ID</span>
          <span className='text-sm font-medium font-mono'>#{vehicle.id}</span>
        </div>
        <Separator />
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm text-muted-foreground'>Created</span>
          <span className='text-sm font-medium'>{format(new Date(vehicle.createdAt), 'MMM dd, yyyy')}</span>
        </div>
        <Separator />
        <div className='flex items-center justify-between py-2'>
          <span className='text-sm text-muted-foreground'>Last Updated</span>
          <span className='text-sm font-medium'>{format(new Date(vehicle.updatedAt), 'MMM dd, yyyy')}</span>
        </div>
        {vehicle.rejectionReason && (
          <>
            <Separator />
            <div className='py-2'>
              <p className='text-sm text-muted-foreground mb-1'>Rejection Reason</p>
              <p className='text-sm text-destructive'>{vehicle.rejectionReason}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
