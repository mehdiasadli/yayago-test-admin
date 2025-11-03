import { CarStatusEnumType } from '@/schemas/vehicles.schema';
import { Badge } from '../ui/badge';

interface VehicleStatusBadgeProps {
  status: CarStatusEnumType;
}

export function VehicleStatusBadge({ status }: VehicleStatusBadgeProps) {
  switch (status) {
    case 'PENDING':
      return <Badge variant='warning'>Pending</Badge>;
    case 'APPROVED':
      return <Badge variant='success'>Approved</Badge>;
    case 'REJECTED':
      return <Badge variant='destructive'>Rejected</Badge>;
    case 'AVAILABLE':
      return <Badge variant='success'>Available</Badge>;
    case 'OCCUPIED':
      return <Badge variant='info'>Occupied</Badge>;
    case 'DISABLED':
      return <Badge variant='destructive'>Disabled</Badge>;
    case 'INACTIVE':
      return <Badge variant='secondary'>Inactive</Badge>;
    case 'BLOCKED':
      return <Badge variant='destructive'>Blocked</Badge>;
    default:
      return <Badge variant='secondary'>Unknown</Badge>;
  }
}
