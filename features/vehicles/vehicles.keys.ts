import {
  GetVehicleBookingsActiveCountParamSchemaType,
  GetVehicleBookingsCountParamSchemaType,
  GetVehicleBookingsParamSchemaType,
  GetVehicleByIdParamSchemaType,
  GetVehicleOccupancyRateParamSchemaType,
  GetVehiclesByStatusParamSchemaType,
  GetVehiclesQuerySchemaType,
} from '@/schemas/vehicles.schema';

export const vehiclesKeys = {
  all: ['vehicles'] as const,
  lists: () => [...vehiclesKeys.all, 'list'] as const,
  list: (filters?: GetVehiclesQuerySchemaType) => [...vehiclesKeys.lists(), filters] as const,
  details: () => [...vehiclesKeys.all, 'detail'] as const,
  detail: (params: GetVehicleByIdParamSchemaType) => [...vehiclesKeys.details(), params] as const,
  bookings: (params: GetVehicleBookingsParamSchemaType) => [...vehiclesKeys.detail(params), 'bookings'] as const,
  bookingsCount: (params: GetVehicleBookingsCountParamSchemaType) =>
    [...vehiclesKeys.detail(params), 'bookings-count'] as const,
  bookingsActiveCount: (params: GetVehicleBookingsActiveCountParamSchemaType) =>
    [...vehiclesKeys.detail(params), 'bookings-active-count'] as const,
  occupancyRate: (params: GetVehicleOccupancyRateParamSchemaType) =>
    [...vehiclesKeys.detail(params), 'occupancy-rate'] as const,
  byStatus: (params: GetVehiclesByStatusParamSchemaType) => [...vehiclesKeys.lists(), 'by-status', params] as const,
  pending: () => [...vehiclesKeys.lists(), 'pending'] as const,
  byRevenue: () => [...vehiclesKeys.lists(), 'by-revenue'] as const,
  mostPopular: () => [...vehiclesKeys.lists(), 'most-popular'] as const,
};
