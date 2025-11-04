import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveImage, rejectImage } from './admin-images.api';
import { adminImagesKeys } from './admin-images.keys';
import { ApproveImageParamSchemaType, RejectImageParamSchemaType } from '@/schemas/admin-images.schema';
import { carImagesKeys } from '@/features/car-images/car-images.keys';

// APPROVE IMAGE
export function useApproveImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ApproveImageParamSchemaType) => approveImage(params),
    onSuccess: () => {
      // Invalidate pending images list
      queryClient.invalidateQueries({ queryKey: adminImagesKeys.pending() });
      // Invalidate car images to refresh the status
      queryClient.invalidateQueries({ queryKey: carImagesKeys.all });
    },
  });
}

// REJECT IMAGE
export function useRejectImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RejectImageParamSchemaType) => rejectImage(params),
    onSuccess: () => {
      // Invalidate pending images list
      queryClient.invalidateQueries({ queryKey: adminImagesKeys.pending() });
      // Invalidate car images to refresh the status
      queryClient.invalidateQueries({ queryKey: carImagesKeys.all });
    },
  });
}
