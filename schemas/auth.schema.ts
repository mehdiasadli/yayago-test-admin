import { z } from 'zod';
import { UserRoleEnum, UserSchema } from './users.schema';

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be at least 8 characters'),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  userId: z.number().positive(),
  role: UserRoleEnum,
});

export const LoginUserResponseSchema = UserSchema;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const RefreshTokenResponseSchema = z.object({
  token: z.string(),
  userId: z.number().positive(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>;

export type LoginUserResponseSchemaType = z.infer<typeof LoginUserResponseSchema>;

export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;
export type RefreshTokenResponseSchemaType = z.infer<typeof RefreshTokenResponseSchema>;
