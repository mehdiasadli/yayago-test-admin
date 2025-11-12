import { queryOptions } from '@tanstack/react-query';
import { getBookingById, getBookingsByUserId, searchAdminBookings } from './bookings.api';
import { bookingsKeys } from './bookings.keys';
import {
  GetBookingByIdParamSchemaType,
  GetBookingsByUserIdParamSchemaType,
  SearchAdminBookingsQuerySchemaType,
} from '@/schemas/bookings.schema';

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

// SEARCH ADMIN BOOKINGS
export function createSearchAdminBookingsQueryOptions(params?: SearchAdminBookingsQuerySchemaType) {
  return queryOptions({
    queryKey: bookingsKeys.adminList(params),
    queryFn: () => searchAdminBookings(params),
  });
}
