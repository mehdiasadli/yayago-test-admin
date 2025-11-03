import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  uploadImage,
  bulkUploadImages,
  setPrimaryImage,
  approveImage,
  rejectImage,
  deleteImage,
  deleteAllCarImages,
} from './car-images.api';
import { carImagesKeys } from './car-images.keys';
import {
  UploadImageParamSchemaType,
  UploadImageQuerySchemaType,
  BulkUploadImagesParamSchemaType,
  BulkUploadImagesRequestSchemaType,
  SetPrimaryImageParamSchemaType,
  ApproveImageParamSchemaType,
  RejectImageParamSchemaType,
  DeleteImageParamSchemaType,
  DeleteAllCarImagesParamSchemaType,
  ImageUploadProgress,
} from '@/schemas/car-images.schema';
import { vehiclesKeys } from '../vehicles/vehicles.keys';

// UPLOAD SINGLE IMAGE
export function useUploadImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      params,
      file,
      query,
    }: {
      params: UploadImageParamSchemaType;
      file: File;
      query?: UploadImageQuerySchemaType;
    }) => uploadImage(params, file, query),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: carImagesKeys.list(variables.params) });
      queryClient.invalidateQueries({ queryKey: carImagesKeys.primaryImage(variables.params) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables.params) });
    },
  });
}

// BULK UPLOAD IMAGES
export function useBulkUploadImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      params,
      request,
      onProgress,
    }: {
      params: BulkUploadImagesParamSchemaType;
      request: BulkUploadImagesRequestSchemaType;
      onProgress?: (progress: ImageUploadProgress[]) => void;
    }) => bulkUploadImages(params, request, onProgress),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: carImagesKeys.list(variables.params) });
      queryClient.invalidateQueries({ queryKey: carImagesKeys.primaryImage(variables.params) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables.params) });
    },
  });
}

// SET PRIMARY IMAGE
export function useSetPrimaryImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SetPrimaryImageParamSchemaType) => setPrimaryImage(params),
    onSuccess: () => {
      // Invalidate all image queries since we don't know which car this image belongs to
      queryClient.invalidateQueries({ queryKey: carImagesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// APPROVE IMAGE
export function useApproveImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ApproveImageParamSchemaType) => approveImage(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carImagesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// REJECT IMAGE
export function useRejectImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RejectImageParamSchemaType) => rejectImage(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carImagesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// DELETE IMAGE
export function useDeleteImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteImageParamSchemaType) => deleteImage(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carImagesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.lists() });
    },
  });
}

// DELETE ALL CAR IMAGES
export function useDeleteAllCarImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteAllCarImagesParamSchemaType) => deleteAllCarImages(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: carImagesKeys.list(variables) });
      queryClient.invalidateQueries({ queryKey: carImagesKeys.primaryImage(variables) });
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.detail(variables) });
    },
  });
}
