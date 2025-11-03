'use client';

import { EditVehicleForm } from '@/components/forms/edit-vehicle-form';
import { createGetVehicleByIdQueryOptions } from '@/features/vehicles/vehicles.queries';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Car } from 'lucide-react';

interface EditVehiclePageContentProps {
  carId: number;
}

export function EditVehiclePageContent({ carId }: EditVehiclePageContentProps) {
  const { data: vehicle, isLoading } = useQuery(createGetVehicleByIdQueryOptions({ carId }));

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <Skeleton className='h-32 w-full' />
        <Skeleton className='h-64 w-full' />
        <Skeleton className='h-64 w-full' />
        <Skeleton className='h-64 w-full' />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <Car className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Vehicle not found</h3>
          <p className='text-sm text-muted-foreground'>The vehicle you're trying to edit doesn't exist.</p>
        </CardContent>
      </Card>
    );
  }

  return <EditVehicleForm vehicle={vehicle} />;
}
