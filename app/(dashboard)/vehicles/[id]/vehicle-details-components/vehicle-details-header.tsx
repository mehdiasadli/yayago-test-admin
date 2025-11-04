import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { Card, CardHeader } from '@/components/ui/card';
import VehicleDetailsHeaderImage from './vehicle-details-header-image';
import VehicleDetailsHeaderActions from './vehicle-details-header-actions';
import VehicleDetailsHeaderInfo from './vehicle-details-header-info';

interface VehicleDetailsHeaderProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsHeader({ vehicle }: VehicleDetailsHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-start gap-4 flex-1'>
            {/* Vehicle Image */}
            <VehicleDetailsHeaderImage vehicle={vehicle} />

            {/* Vehicle Info */}
            <VehicleDetailsHeaderInfo vehicle={vehicle} />
          </div>

          {/* Action Buttons */}
          <VehicleDetailsHeaderActions vehicle={vehicle} />
        </div>
      </CardHeader>
    </Card>
  );
}
