import { queryOptions } from '@tanstack/react-query';
import { getPendingImages } from './admin-images.api';
import { adminImagesKeys } from './admin-images.keys';
import { GetPendingImagesQuerySchemaType } from '@/schemas/admin-images.schema';

// GET PENDING IMAGES
export function createGetPendingImagesQueryOptions(query?: GetPendingImagesQuerySchemaType) {
  return queryOptions({
    queryKey: adminImagesKeys.pending(query),
    queryFn: () => getPendingImages(query),
  });
}
