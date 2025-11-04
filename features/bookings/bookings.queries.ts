import { queryOptions } from '@tanstack/react-query';
import { getBookingById, getBookingsByUserId } from './bookings.api';
import { bookingsKeys } from './bookings.keys';
import { GetBookingByIdParamSchemaType, GetBookingsByUserIdParamSchemaType } from '@/schemas/bookings.schema';

// GET BOOKING BY ID
export function createGetBookingByIdQueryOptions(params: GetBookingByIdParamSchemaType) {
  return queryOptions({
    queryKey: bookingsKeys.detail(params),
    queryFn: () => getBookingById(params),
  });
}

// GET BOOKINGS BY USER ID
export function createGetBookingsByUserIdQueryOptions(params: GetBookingsByUserIdParamSchemaType) {
  return queryOptions({
    queryKey: bookingsKeys.byUserId(params),
    queryFn: () => getBookingsByUserId(params),
  });
}
