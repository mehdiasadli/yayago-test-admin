import { queryOptions } from '@tanstack/react-query';
import {
  getMostPopularVehicles,
  getPendingVehicles,
  getVehicleBookings,
  getVehicleBookingsActiveCount,
  getVehicleBookingsCount,
  getVehicleById,
  getVehicleOccupancyRate,
  getVehicles,
  getVehiclesByRevenue,
  getVehiclesByStatus,
} from './vehicles.api';
import { vehiclesKeys } from './vehicles.keys';
import {
  GetVehicleBookingsActiveCountParamSchemaType,
  GetVehicleBookingsCountParamSchemaType,
  GetVehicleBookingsParamSchemaType,
  GetVehicleByIdParamSchemaType,
  GetVehicleOccupancyRateParamSchemaType,
  GetVehiclesByStatusParamSchemaType,
  GetVehiclesQuerySchemaType,
} from '@/schemas/vehicles.schema';

// GET VEHICLES
export function createGetVehiclesQueryOptions(filters?: GetVehiclesQuerySchemaType) {
  return queryOptions({
    queryKey: vehiclesKeys.list(filters),
    queryFn: () => getVehicles(filters),
  });
}

// GET VEHICLE BY ID
export function createGetVehicleByIdQueryOptions(params: GetVehicleByIdParamSchemaType) {
  return queryOptions({
    queryKey: vehiclesKeys.detail(params),
    queryFn: () => getVehicleById(params),
  });
}

// GET VEHICLE BOOKINGS
export function createGetVehicleBookingsQueryOptions(params: GetVehicleBookingsParamSchemaType) {
  return queryOptions({
    queryKey: vehiclesKeys.bookings(params),
    queryFn: () => getVehicleBookings(params),
  });
}

// GET VEHICLE BOOKINGS COUNT
export function createGetVehicleBookingsCountQueryOptions(params: GetVehicleBookingsCountParamSchemaType) {
  return queryOptions({
    queryKey: vehiclesKeys.bookingsCount(params),
    queryFn: () => getVehicleBookingsCount(params),
  });
}

// GET VEHICLE BOOKINGS ACTIVE COUNT
export function createGetVehicleBookingsActiveCountQueryOptions(params: GetVehicleBookingsActiveCountParamSchemaType) {
  return queryOptions({
    queryKey: vehiclesKeys.bookingsActiveCount(params),
    queryFn: () => getVehicleBookingsActiveCount(params),
  });
}

// GET VEHICLE OCCUPANCY RATE
export function createGetVehicleOccupancyRateQueryOptions(params: GetVehicleOccupancyRateParamSchemaType) {
  return queryOptions({
    queryKey: vehiclesKeys.occupancyRate(params),
    queryFn: () => getVehicleOccupancyRate(params),
  });
}

// GET VEHICLES BY STATUS
export function createGetVehiclesByStatusQueryOptions(params: GetVehiclesByStatusParamSchemaType) {
  return queryOptions({
    queryKey: vehiclesKeys.byStatus(params),
    queryFn: () => getVehiclesByStatus(params),
  });
}

// GET PENDING VEHICLES
export function createGetPendingVehiclesQueryOptions() {
  return queryOptions({
    queryKey: vehiclesKeys.pending(),
    queryFn: () => getPendingVehicles(),
  });
}

// GET VEHICLES BY REVENUE
export function createGetVehiclesByRevenueQueryOptions() {
  return queryOptions({
    queryKey: vehiclesKeys.byRevenue(),
    queryFn: () => getVehiclesByRevenue(),
  });
}

// GET MOST POPULAR VEHICLES
export function createGetMostPopularVehiclesQueryOptions() {
  return queryOptions({
    queryKey: vehiclesKeys.mostPopular(),
    queryFn: () => getMostPopularVehicles(),
  });
}
