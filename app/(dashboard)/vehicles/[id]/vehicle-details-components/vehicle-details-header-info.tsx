import { Badge } from '@/components/ui/badge';
import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { DollarSign } from 'lucide-react';

interface VehicleDetailsHeaderInfoProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsHeaderInfo({ vehicle }: VehicleDetailsHeaderInfoProps) {
  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'available' || statusLower === 'approved') return 'success';
    if (statusLower === 'pending') return 'warning';
    if (statusLower === 'rejected') return 'destructive';
    if (statusLower === 'occupied') return 'info';
    return 'secondary';
  };

  return (
    <div className='space-y-3 flex-1'>
      <div>
        <div className='flex items-center gap-2 flex-wrap'>
          <h2 className='text-2xl font-bold'>
            {vehicle.brand} {vehicle.model}
          </h2>
          <Badge variant={getStatusVariant(vehicle.status)} className='text-white'>
            {vehicle.status}
          </Badge>
          {vehicle.featured && (
            <Badge variant='primary' className='text-white'>
              Featured
            </Badge>
          )}
        </div>
        <p className='text-muted-foreground mt-1'>Year: {vehicle.year}</p>
      </div>

      <div className='flex items-center gap-4 text-sm'>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
          <span className='font-semibold'>
            {vehicle.currency} {vehicle.pricePerDay.toFixed(2)}
          </span>
          <span className='text-muted-foreground'>/ day</span>
        </div>
        {vehicle.averageRating && (
          <div className='flex items-center gap-1'>
            <span className='font-semibold'>⭐ {vehicle.averageRating.toFixed(1)}</span>
            <span className='text-muted-foreground'>({vehicle.reviewCount} reviews)</span>
          </div>
        )}
      </div>
    </div>
  );
}
