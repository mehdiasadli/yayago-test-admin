import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  approveVehicle,
  createVehicle,
  deleteVehicle,
  rejectVehicle,
  updateVehicle,
  updateVehiclePrice,
  updateVehicleStatus,
} from './vehicles.api';
import { vehiclesKeys } from './vehicles.keys';
import {
  ApproveVehicleParamSchemaType,
  CreateVehicleRequestSchemaType,
  DeleteVehicleParamSchemaType,
  RejectVehicleParamSchemaType,
  RejectVehicleQuerySchemaType,
  UpdateVehicleParamSchemaType,
  UpdateVehiclePriceParamSchemaType,
  UpdateVehiclePriceRequestSchemaType,
  UpdateVehicleRequestSchemaType,
  UpdateVehicleStatusParamSchemaType,
  UpdateVehicleStatusRequestSchemaType,
} from '@/schemas/vehicles.schema';

// CREATE VEHICLE
export function useCreateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVehicleRequestSchemaType) => createVehicle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// UPDATE VEHICLE
export function useUpdateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params, body }: { params: UpdateVehicleParamSchemaType; body: UpdateVehicleRequestSchemaType }) =>
      updateVehicle(params, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables.params) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// DELETE VEHICLE
export function useDeleteVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteVehicleParamSchemaType) => deleteVehicle(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// UPDATE VEHICLE STATUS
export function useUpdateVehicleStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      params,
      body,
    }: {
      params: UpdateVehicleStatusParamSchemaType;
      body: UpdateVehicleStatusRequestSchemaType;
    }) => updateVehicleStatus(params, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables.params) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// UPDATE VEHICLE PRICE
export function useUpdateVehiclePriceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      params,
      body,
    }: {
      params: UpdateVehiclePriceParamSchemaType;
      body: UpdateVehiclePriceRequestSchemaType;
    }) => updateVehiclePrice(params, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables.params) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// APPROVE VEHICLE
export function useApproveVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ApproveVehicleParamSchemaType) => approveVehicle(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.pending() });
    },
  });
}

// REJECT VEHICLE
export function useRejectVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ params, query }: { params: RejectVehicleParamSchemaType; query: RejectVehicleQuerySchemaType }) =>
      rejectVehicle(params, query),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables.params) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.pending() });
    },
  });
}
