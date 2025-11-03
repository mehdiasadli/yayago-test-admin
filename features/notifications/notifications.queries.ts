import { queryOptions } from '@tanstack/react-query';
import { getNotificationById, getNotificationsByUser } from './notifications.api';
import { notificationsKeys } from './notifications.keys';
import { GetNotificationByIdParams, GetNotificationsByUserParams } from '@/schemas/notifications.schema';

/**
 * Query options for fetching a single notification by ID
 */
export const createGetNotificationByIdQueryOptions = (params: GetNotificationByIdParams) => {
  return queryOptions({
    queryKey: notificationsKeys.detail(params.id),
    queryFn: () => getNotificationById(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Query options for fetching all notifications for a specific user
 */
export const createGetNotificationsByUserQueryOptions = (params: GetNotificationsByUserParams) => {
  return queryOptions({
    queryKey: notificationsKeys.userNotifications(params.userId),
    queryFn: () => getNotificationsByUser(params),
    staleTime: 1000 * 60 * 2, // 2 minutes - notifications should be relatively fresh
  });
};
