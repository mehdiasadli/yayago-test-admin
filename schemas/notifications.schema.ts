import { z } from 'zod';

// Notification Type Enum
export const NotificationTypeEnum = z.enum([
  'BOOKING_CONFIRMED',
  'BOOKING_CANCELLED',
  'BOOKING_REMINDER',
  'PAYMENT_CONFIRMED',
  'PAYMENT_FAILED',
  'CAR_AVAILABLE',
  'WELCOME',
  'PASSWORD_RESET',
]);

export type NotificationType = z.infer<typeof NotificationTypeEnum>;

// Notification Status Enum
export const NotificationStatusEnum = z.enum(['PENDING', 'SENT', 'FAILED', 'CANCELLED']);

export type NotificationStatus = z.infer<typeof NotificationStatusEnum>;

// Create Notification Request Schema
export const CreateNotificationRequestSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive integer'),
  type: NotificationTypeEnum,
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  recipientEmail: z.string().email('Invalid email address'),
});

export type CreateNotificationRequest = z.infer<typeof CreateNotificationRequestSchema>;

// Notification Response Schema
export const NotificationSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  type: NotificationTypeEnum,
  status: NotificationStatusEnum,
  subject: z.string(),
  content: z.string(),
  recipientEmail: z.string(),
  sentAt: z.string().nullable().optional(),
  errorMessage: z.string().nullable().optional(),
  retryCount: z.number().int(),
  createdAt: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;

// Get Notifications by User Params Schema
export const GetNotificationsByUserParamsSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive integer'),
});

export type GetNotificationsByUserParams = z.infer<typeof GetNotificationsByUserParamsSchema>;

// Get Notification by ID Params Schema
export const GetNotificationByIdParamsSchema = z.object({
  id: z.number().int().positive('Notification ID must be a positive integer'),
});

export type GetNotificationByIdParams = z.infer<typeof GetNotificationByIdParamsSchema>;

// Array schema for multiple notifications
export const NotificationArraySchema = z.array(NotificationSchema);

export type NotificationArray = z.infer<typeof NotificationArraySchema>;
