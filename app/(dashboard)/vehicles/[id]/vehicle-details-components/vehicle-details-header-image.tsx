import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import Link from 'next/link';
import { Car } from 'lucide-react';

interface VehicleDetailsHeaderImageProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsHeaderImage({ vehicle }: VehicleDetailsHeaderImageProps) {
  const primaryImage = vehicle.images?.find((img) => img.isPrimary) || vehicle.images?.[0];

  return (
    <Link href={`/vehicles/${vehicle.id}/edit/images`}>
      <div className='relative h-32 w-32 rounded-lg overflow-hidden bg-muted shrink-0 cursor-pointer transition-opacity hover:opacity-80'>
        {primaryImage ? (
          <img
            src={primaryImage.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='h-full w-full flex items-center justify-center'>
            <Car className='h-12 w-12 text-muted-foreground' />
          </div>
        )}
        <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity'>
          <p className='text-white text-xs font-medium'>Manage Images</p>
        </div>
      </div>
    </Link>
  );
}
