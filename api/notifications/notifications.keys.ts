export const notificationsKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationsKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...notificationsKeys.lists(), { filters }] as const,
  details: () => [...notificationsKeys.all, 'detail'] as const,
  detail: (id: number) => [...notificationsKeys.details(), id] as const,
  userNotifications: (userId: number) => [...notificationsKeys.all, 'user', userId] as const,
};
