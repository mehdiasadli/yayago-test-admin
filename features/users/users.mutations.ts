import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, deleteUser, setUserStatus } from './users.api';
import { usersKeys } from './users.keys';
import { toast } from 'sonner';
import { CreateUserRequestSchemaType, SetUserStatusRequestSchemaType } from '@/schemas/users.schema';

export const useDeleteUserMutation = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser({ userId }),
    onSuccess: () => {
      toast.success('User deleted successfully');

      queryClient.invalidateQueries({ queryKey: usersKeys.list() });
      queryClient.invalidateQueries({ queryKey: usersKeys.detailsById(userId) });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSetUserStatusMutation = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SetUserStatusRequestSchemaType) => setUserStatus({ userId }, body),
    onSuccess: () => {
      toast.success('User status updated successfully');

      queryClient.invalidateQueries({ queryKey: usersKeys.list() });
      queryClient.invalidateQueries({ queryKey: usersKeys.detailsById(userId) });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateUserRequestSchemaType) => createUser(body),
    onSuccess: () => {
      toast.success('User created successfully');

      queryClient.invalidateQueries({ queryKey: usersKeys.list() });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
