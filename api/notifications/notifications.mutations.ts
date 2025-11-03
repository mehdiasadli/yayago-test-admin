import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNotification, processPendingNotifications, retryFailedNotifications } from './notifications.api';
import { notificationsKeys } from './notifications.keys';
import { toast } from 'sonner';
import { CreateNotificationRequest } from '@/schemas/notifications.schema';

/**
 * Mutation for creating a new notification
 */
export const useCreateNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateNotificationRequest) => createNotification(request),
    onSuccess: (data) => {
      // Invalidate the user's notifications list
      queryClient.invalidateQueries({
        queryKey: notificationsKeys.userNotifications(data.userId),
      });
      toast.success('Notification created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create notification: ${error.message}`);
    },
  });
};

/**
 * Mutation for retrying failed notifications (Admin only)
 */
export const useRetryFailedNotificationsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => retryFailedNotifications(),
    onSuccess: () => {
      // Invalidate all notification queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      });
      toast.success('Failed notifications are being retried');
    },
    onError: (error: Error) => {
      toast.error(`Failed to retry notifications: ${error.message}`);
    },
  });
};

/**
 * Mutation for processing pending notifications (Admin only)
 */
export const useProcessPendingNotificationsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => processPendingNotifications(),
    onSuccess: () => {
      // Invalidate all notification queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      });
      toast.success('Pending notifications are being processed');
    },
    onError: (error: Error) => {
      toast.error(`Failed to process notifications: ${error.message}`);
    },
  });
};
