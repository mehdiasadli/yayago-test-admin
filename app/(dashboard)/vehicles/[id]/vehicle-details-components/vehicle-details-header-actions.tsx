import { Button } from '@/components/ui/button';
import { ApproveVehicleDialog } from '@/components/vehicles/approve-vehicle-dialog';
import { RejectVehicleDialog } from '@/components/vehicles/reject-vehicle-dialog';
import { UpdateVehiclePriceDialog } from '@/components/vehicles/update-vehicle-price-dialog';
import { UpdateVehicleStatusDialog } from '@/components/vehicles/update-vehicle-status-dialog';
import { VehicleSchemaType } from '@/schemas/vehicles.schema';
import { Edit, EllipsisVerticalIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteVehicleDialog } from '@/components/vehicles/delete-vehicle-dialog';
import Link from 'next/link';

interface VehicleDetailsHeaderActionsProps {
  vehicle: VehicleSchemaType;
}

export default function VehicleDetailsHeaderActions({ vehicle }: VehicleDetailsHeaderActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <UpdateVehicleStatusDialog
        carId={vehicle.id}
        currentStatus={vehicle.available}
        vehicleName={`${vehicle.brand} ${vehicle.model}`}
      />
      <UpdateVehiclePriceDialog
        carId={vehicle.id}
        currentPrice={vehicle.pricePerDay}
        currency={vehicle.currency}
        vehicleName={`${vehicle.brand} ${vehicle.model}`}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <EllipsisVerticalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <Link href={`/vehicles/${vehicle.id}/edit`}>
              <Edit className='h-4 w-4' />
              Edit
            </Link>
          </DropdownMenuItem>
          {vehicle.status === 'PENDING' && (
            <>
              <ApproveVehicleDialog carId={vehicle.id} vehicleName={`${vehicle.brand} ${vehicle.model}`} />
              <RejectVehicleDialog carId={vehicle.id} vehicleName={`${vehicle.brand} ${vehicle.model}`} />
            </>
          )}
          <DeleteVehicleDialog
            carId={vehicle.id}
            vehicleName={`${vehicle.brand} ${vehicle.model}`}
            variant='button'
            redirectOnSuccess={true}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
