import { QueryOptions, queryOptions } from '@tanstack/react-query';
import { usersKeys } from './users.keys';
import {
  GetUserBookingsActiveCountParamSchemaType,
  GetUserBookingsActiveCountResponseSchemaType,
  GetUserBookingsCountParamSchemaType,
  GetUserBookingsCountResponseSchemaType,
  GetUserBookingsParamSchemaType,
  GetUserBookingsResponseSchemaType,
  GetUserByIdParamSchemaType,
  GetUserByIdResponseSchemaType,
  GetUsersQuerySchemaType,
  GetUsersResponseSchemaType,
} from '@/schemas/users.schema';
import { getUserBookings, getUserBookingsActiveCount, getUserBookingsCount, getUserById, getUsers } from './users.api';

export const createGetUsersQueryOptions = (
  query: GetUsersQuerySchemaType = {},
  options: Omit<
    QueryOptions<GetUsersResponseSchemaType, Error, GetUsersResponseSchemaType>,
    'queryFn' | 'queryKey'
  > = {}
) =>
  queryOptions({
    queryKey: usersKeys.listWithQuery(query),
    queryFn: () => getUsers(query),
    ...options,
  });

export const createGetUserByIdQueryOptions = (
  params: GetUserByIdParamSchemaType,
  options: Omit<
    QueryOptions<GetUserByIdResponseSchemaType, Error, GetUserByIdResponseSchemaType>,
    'queryFn' | 'queryKey'
  > = {}
) =>
  queryOptions({
    queryKey: usersKeys.detailsById(params.userId),
    queryFn: () => getUserById(params),
    enabled: typeof params.userId === 'number',
    ...options,
  });

export const createGetUserBookingsQueryOptions = (
  params: GetUserBookingsParamSchemaType,
  options: Omit<
    QueryOptions<GetUserBookingsResponseSchemaType, Error, GetUserBookingsResponseSchemaType>,
    'queryFn' | 'queryKey'
  > = {}
) =>
  queryOptions({
    queryKey: usersKeys.bookingsByUserId(params.userId),
    queryFn: () => getUserBookings(params),
    enabled: typeof params.userId === 'number',
    ...options,
  });

export const createGetUserBookingsCountQueryOptions = (
  params: GetUserBookingsCountParamSchemaType,
  options: Omit<
    QueryOptions<GetUserBookingsCountResponseSchemaType, Error, GetUserBookingsCountResponseSchemaType>,
    'queryFn' | 'queryKey'
  > = {}
) =>
  queryOptions({
    queryKey: usersKeys.bookingsCountByUserId(params.userId),
    queryFn: () => getUserBookingsCount(params),
    enabled: typeof params.userId === 'number',
    ...options,
  });

export const createGetUserBookingsActiveCountQueryOptions = (
  params: GetUserBookingsActiveCountParamSchemaType,
  options: Omit<
    QueryOptions<GetUserBookingsActiveCountResponseSchemaType, Error, GetUserBookingsActiveCountResponseSchemaType>,
    'queryFn' | 'queryKey'
  > = {}
) =>
  queryOptions({
    queryKey: usersKeys.bookingsActiveCountByUserId(params.userId),
    queryFn: () => getUserBookingsActiveCount(params),
    enabled: typeof params.userId === 'number',
    ...options,
  });
