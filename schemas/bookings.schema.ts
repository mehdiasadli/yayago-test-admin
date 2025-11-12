import z from 'zod';
import { idSchema } from './common.schema';

export const BookingSchema = z.object({
  id: idSchema(),
  userId: idSchema('User ID'),
  carId: idSchema('Car ID'),
  userFullName: z.string(),
  carModel: z.string(),
  carBrand: z.string(),
  totalPrice: z.number(),
  currency: z.string(),
  status: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  pickupTime: z
    .union([
      z.string(),
      z.object({
        hour: z.number(),
        minute: z.number(),
        second: z.number(),
        nano: z.number(),
      }),
    ])
    .nullable(),
  returnTime: z
    .union([
      z.string(),
      z.object({
        hour: z.number(),
        minute: z.number(),
        second: z.number(),
        nano: z.number(),
      }),
    ])
    .nullable(),
});

export const CreateBookingRequestSchema = z.object({
  userId: idSchema('User ID'),
  fullName: z.string(),
  carId: idSchema('Car ID'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  pickupTime: z.string(),
  returnTime: z.string(),
});

export const CreateBookingResponseSchema = BookingSchema;

export const SetBookingStatusParamSchema = z.object({
  bookingId: idSchema('Booking ID'),
});
export const SetBookingStatusQuerySchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
});
export const SetBookingStatusResponseSchema = BookingSchema;

export const GetBookingByIdParamSchema = z.object({
  bookingId: idSchema('Booking ID'),
});
export const GetBookingByIdResponseSchema = BookingSchema;

export const GetBookingsByUserIdParamSchema = z.object({
  userId: idSchema('User ID'),
});
export const GetBookingsByUserIdResponseSchema = BookingSchema.array();

// ADMIN BOOKING MANAGEMENT

// Admin Booking Schema (simplified for list view)
export const AdminBookingSchema = z.object({
  id: idSchema(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  totalPrice: z.number(),
  userId: idSchema('User ID'),
  userFullName: z.string(),
  carId: idSchema('Car ID'),
  carBrand: z.string(),
  carModel: z.string(),
});

// Search/Get Admin Bookings
export const SearchAdminBookingsQuerySchema = z.object({
  userId: idSchema('User ID').optional(),
  carId: idSchema('Car ID').optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']).optional(),
  dateFrom: z.string().optional(), // ISO date
  dateTo: z.string().optional(), // ISO date
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  page: z.number().min(0).optional(),
  size: z.number().min(1).max(100).optional(),
});

export const SearchAdminBookingsResponseSchema = z.object({
  content: AdminBookingSchema.array(),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  first: z.boolean(),
  last: z.boolean(),
});

// Bulk Status Update
export const BulkUpdateBookingStatusRequestSchema = z.object({
  bookingIds: z.array(idSchema('Booking ID')),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
  reason: z.string().optional(),
});

export const BulkUpdateBookingStatusResponseSchema = z.object({
  updatedCount: z.number(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
});

export type BookingSchemaType = z.infer<typeof BookingSchema>;
export type AdminBookingSchemaType = z.infer<typeof AdminBookingSchema>;

export type CreateBookingRequestSchemaType = z.infer<typeof CreateBookingRequestSchema>;
export type CreateBookingResponseSchemaType = z.infer<typeof CreateBookingResponseSchema>;

export type SetBookingStatusParamSchemaType = z.infer<typeof SetBookingStatusParamSchema>;
export type SetBookingStatusQuerySchemaType = z.infer<typeof SetBookingStatusQuerySchema>;
export type SetBookingStatusResponseSchemaType = z.infer<typeof SetBookingStatusResponseSchema>;

export type GetBookingByIdParamSchemaType = z.infer<typeof GetBookingByIdParamSchema>;
export type GetBookingByIdResponseSchemaType = z.infer<typeof GetBookingByIdResponseSchema>;

export type GetBookingsByUserIdParamSchemaType = z.infer<typeof GetBookingsByUserIdParamSchema>;
export type GetBookingsByUserIdResponseSchemaType = z.infer<typeof GetBookingsByUserIdResponseSchema>;

export type SearchAdminBookingsQuerySchemaType = z.infer<typeof SearchAdminBookingsQuerySchema>;
export type SearchAdminBookingsResponseSchemaType = z.infer<typeof SearchAdminBookingsResponseSchema>;

export type BulkUpdateBookingStatusRequestSchemaType = z.infer<typeof BulkUpdateBookingStatusRequestSchema>;
export type BulkUpdateBookingStatusResponseSchemaType = z.infer<typeof BulkUpdateBookingStatusResponseSchema>;
