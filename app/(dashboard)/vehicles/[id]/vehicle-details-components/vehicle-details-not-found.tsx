import { Card, CardContent } from '@/components/ui/card';
import { Car } from 'lucide-react';

export function VehicleDetailsNotFound() {
  return (
    <Card>
      <CardContent className='flex flex-col items-center justify-center py-10'>
        <Car className='h-12 w-12 text-muted-foreground mb-4' />
        <h3 className='text-lg font-semibold mb-2'>Vehicle not found</h3>
        <p className='text-sm text-muted-foreground'>The vehicle you're looking for doesn't exist.</p>
      </CardContent>
    </Card>
  );
}
