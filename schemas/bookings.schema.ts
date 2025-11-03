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
    .object({
      hour: z.number(),
      minute: z.number(),
      second: z.number(),
      nano: z.number(),
    })
    .nullable(),
  returnTime: z
    .object({
      hour: z.number(),
      minute: z.number(),
      second: z.number(),
      nano: z.number(),
    })
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

export type BookingSchemaType = z.infer<typeof BookingSchema>;

export type CreateBookingRequestSchemaType = z.infer<typeof CreateBookingRequestSchema>;
export type CreateBookingResponseSchemaType = z.infer<typeof CreateBookingResponseSchema>;

export type SetBookingStatusParamSchemaType = z.infer<typeof SetBookingStatusParamSchema>;
export type SetBookingStatusQuerySchemaType = z.infer<typeof SetBookingStatusQuerySchema>;
export type SetBookingStatusResponseSchemaType = z.infer<typeof SetBookingStatusResponseSchema>;

export type GetBookingByIdParamSchemaType = z.infer<typeof GetBookingByIdParamSchema>;
export type GetBookingByIdResponseSchemaType = z.infer<typeof GetBookingByIdResponseSchema>;

export type GetBookingsByUserIdParamSchemaType = z.infer<typeof GetBookingsByUserIdParamSchema>;
export type GetBookingsByUserIdResponseSchemaType = z.infer<typeof GetBookingsByUserIdResponseSchema>;
