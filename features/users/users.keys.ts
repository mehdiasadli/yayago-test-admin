import { GetUsersQuerySchemaType } from '@/schemas/users.schema';

export const usersKeys = {
  index: () => ['users'] as const,

  // list all users
  list: () => [...usersKeys.index(), 'list'] as const,
  listWithQuery: (query: GetUsersQuerySchemaType) => [...usersKeys.list(), query] as const,

  // get a user by id
  details: () => [...usersKeys.index(), 'details'] as const,
  detailsById: (userId: number) => [...usersKeys.details(), userId] as const,

  // get user bookings
  bookings: () => [...usersKeys.index(), 'bookings'] as const,
  bookingsByUserId: (userId: number) => [...usersKeys.bookings(), userId] as const,

  // get user bookings count
  bookingsCount: () => [...usersKeys.index(), 'bookings-count'] as const,
  bookingsCountByUserId: (userId: number) => [...usersKeys.bookingsCount(), userId] as const,

  // get user active bookings count
  bookingsActiveCount: () => [...usersKeys.index(), 'bookings-active-count'] as const,
  bookingsActiveCountByUserId: (userId: number) => [...usersKeys.bookingsActiveCount(), userId] as const,
};
