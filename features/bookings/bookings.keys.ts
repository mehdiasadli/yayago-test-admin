import { GetBookingByIdParamSchemaType, GetBookingsByUserIdParamSchemaType } from '@/schemas/bookings.schema';

export const bookingsKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingsKeys.all, 'list'] as const,
  details: () => [...bookingsKeys.all, 'detail'] as const,
  detail: (params: GetBookingByIdParamSchemaType) => [...bookingsKeys.details(), params] as const,
  byUserId: (params: GetBookingsByUserIdParamSchemaType) => [...bookingsKeys.lists(), 'by-user', params] as const,
};
