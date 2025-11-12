import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking, updateBookingStatus, bulkUpdateBookingStatus } from './bookings.api';
import { bookingsKeys } from './bookings.keys';
import {
  CreateBookingRequestSchemaType,
  SetBookingStatusParamSchemaType,
  SetBookingStatusQuerySchemaType,
  BulkUpdateBookingStatusRequestSchemaType,
} from '@/schemas/bookings.schema';
import { vehiclesKeys } from '@/features/vehicles/vehicles.keys';
import { dashboardKeys } from '@/features/dashboard/dashboard.keys';

// CREATE BOOKING
export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequestSchemaType) => createBooking(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: bookingsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingsKeys.byUserId({ userId: data.userId }) });
      // Invalidate vehicle bookings as well
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.bookings({ carId: data.carId }) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.bookingsCount({ carId: data.carId }) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.bookingsActiveCount({ carId: data.carId }) });
    },
  });
}

// UPDATE BOOKING STATUS
export function useUpdateBookingStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      params,
      query,
    }: {
      params: SetBookingStatusParamSchemaType;
      query: SetBookingStatusQuerySchemaType;
    }) => updateBookingStatus(params, query),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingsKeys.detail(variables.params) });
      queryClient.invalidateQueries({ queryKey: bookingsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingsKeys.adminLists() });
      queryClient.invalidateQueries({ queryKey: bookingsKeys.byUserId({ userId: data.userId }) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.stats() });
      // Invalidate vehicle bookings as well
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.bookings({ carId: data.carId }) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.bookingsCount({ carId: data.carId }) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.bookingsActiveCount({ carId: data.carId }) });
    },
  });
}

// BULK UPDATE BOOKING STATUS
export function useBulkUpdateBookingStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkUpdateBookingStatusRequestSchemaType) => bulkUpdateBookingStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingsKeys.adminLists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.stats() });
      // Invalidate all vehicle bookings queries
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.bookingsLists() });
    },
  });
}
