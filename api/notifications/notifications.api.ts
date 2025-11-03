import { getAuthHeaders } from '@/lib/auth-utils';
import {
  CreateNotificationRequest,
  CreateNotificationRequestSchema,
  GetNotificationByIdParams,
  GetNotificationByIdParamsSchema,
  GetNotificationsByUserParams,
  GetNotificationsByUserParamsSchema,
  Notification,
  NotificationArraySchema,
  NotificationSchema,
} from '@/schemas/notifications.schema';

/**
 * Create a new notification manually (Admin only)
 * POST /api/notifications
 */
export async function createNotification(request: CreateNotificationRequest): Promise<Notification> {
  const validatedRequest = CreateNotificationRequestSchema.parse(request);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(validatedRequest),
  });

  if (!response.ok) {
    throw new Error(`Failed to create notification: ${response.statusText}`);
  }

  const data = await response.json();
  return NotificationSchema.parse(data);
}

/**
 * Retry all failed notifications (Admin only)
 * POST /api/notifications/retry-failed
 */
export async function retryFailedNotifications(): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/retry-failed`, {
    method: 'POST',
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to retry failed notifications: ${response.statusText}`);
  }
}

/**
 * Process all pending notifications (Admin only)
 * POST /api/notifications/process-pending
 */
export async function processPendingNotifications(): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/process-pending`, {
    method: 'POST',
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to process pending notifications: ${response.statusText}`);
  }
}

/**
 * Get notification by ID
 * GET /api/notifications/{id}
 */
export async function getNotificationById(params: GetNotificationByIdParams): Promise<Notification> {
  const validatedParams = GetNotificationByIdParamsSchema.parse(params);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${validatedParams.id}`, {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch notification: ${response.statusText}`);
  }

  const data = await response.json();
  return NotificationSchema.parse(data);
}

/**
 * Get all notifications for a specific user
 * GET /api/notifications/user/{userId}
 */
export async function getNotificationsByUser(params: GetNotificationsByUserParams): Promise<Notification[]> {
  const validatedParams = GetNotificationsByUserParamsSchema.parse(params);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/user/${validatedParams.userId}`, {
    method: 'GET',
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user notifications: ${response.statusText}`);
  }

  const data = await response.json();
  return NotificationArraySchema.parse(data);
}
