import z from 'zod';
import { BookingSchema } from './bookings.schema';
import { idSchema } from './common.schema';

// COMMON
export const UserSchema = z.object({
  id: idSchema(),
  email: z.string(),
  fullName: z.string(),
  phoneNumber: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
  lastLoginAt: z.coerce.date().nullable(),
  totalBookings: z.number(),
  activeBookings: z.number(),
  avatarUrl: z.string().nullable(),
  avatarName: z.string().nullable(),
});

export const UserParamSchema = z.object({
  userId: idSchema('User ID'),
});

// CREATE USER
export const CreateUserRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string(),
  phoneNumber: z.string(),
  admin: z.boolean(),
});

// GET USERS
export const GetUsersQuerySchema = z.object({
  page: z.coerce.number().nonnegative().optional(),
  size: z.coerce.number().positive().optional(),
  searchTerm: z.string().optional(),
  active: z.boolean().optional(),
});
export const CreateUserResponseSchema = UserSchema;

export const GetUsersResponseSchema = UserSchema.array();

// GET USER BY ID (ADMIN)
export const GetUserByIdParamSchema = UserParamSchema;

export const GetUserByIdResponseSchema = UserSchema;

// DELETE USER
export const DeleteUserParamSchema = UserParamSchema;

export const DeleteUserResponseSchema = z.void();

// SET USER STATUS
export const SetUserStatusParamSchema = UserParamSchema;
export const SetUserStatusRequestSchema = z.object({
  active: z.boolean(),
  reason: z.string().optional(),
});
export const SetUserStatusResponseSchema = z.void();

// GET USER BOOKINGS
export const GetUserBookingsParamSchema = UserParamSchema;
export const GetUserBookingsResponseSchema = BookingSchema.array();

// GET USER BOOKINGS COUNT
export const GetUserBookingsCountParamSchema = UserParamSchema;
export const GetUserBookingsCountResponseSchema = z.number();

// GET USER BOOKINGS ACTIVE COUNT
export const GetUserBookingsActiveCountParamSchema = UserParamSchema;
export const GetUserBookingsActiveCountResponseSchema = z.number();

// === TYPES ===

export type UserSchemaType = z.infer<typeof UserSchema>;
export type UserParamSchemaType = z.infer<typeof UserParamSchema>;

export type GetUsersQuerySchemaType = z.infer<typeof GetUsersQuerySchema>;
export type GetUsersResponseSchemaType = z.infer<typeof GetUsersResponseSchema>;

export type GetUserByIdParamSchemaType = z.infer<typeof GetUserByIdParamSchema>;
export type GetUserByIdResponseSchemaType = z.infer<typeof GetUserByIdResponseSchema>;

export type DeleteUserParamSchemaType = z.infer<typeof DeleteUserParamSchema>;
export type DeleteUserResponseSchemaType = z.infer<typeof DeleteUserResponseSchema>;

export type SetUserStatusParamSchemaType = z.infer<typeof SetUserStatusParamSchema>;
export type SetUserStatusRequestSchemaType = z.infer<typeof SetUserStatusRequestSchema>;
export type SetUserStatusResponseSchemaType = z.infer<typeof SetUserStatusResponseSchema>;

export type GetUserBookingsParamSchemaType = z.infer<typeof GetUserBookingsParamSchema>;
export type GetUserBookingsResponseSchemaType = z.infer<typeof GetUserBookingsResponseSchema>;

export type GetUserBookingsCountParamSchemaType = z.infer<typeof GetUserBookingsCountParamSchema>;
export type GetUserBookingsCountResponseSchemaType = z.infer<typeof GetUserBookingsCountResponseSchema>;

export type GetUserBookingsActiveCountParamSchemaType = z.infer<typeof GetUserBookingsActiveCountParamSchema>;
export type GetUserBookingsActiveCountResponseSchemaType = z.infer<typeof GetUserBookingsActiveCountResponseSchema>;

export type CreateUserRequestSchemaType = z.infer<typeof CreateUserRequestSchema>;
export type CreateUserResponseSchemaType = z.infer<typeof CreateUserResponseSchema>;
