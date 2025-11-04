import { GetPendingImagesQuerySchemaType } from '@/schemas/admin-images.schema';

export const adminImagesKeys = {
  all: ['admin-images'] as const,
  pending: (query?: GetPendingImagesQuerySchemaType) => [...adminImagesKeys.all, 'pending', query] as const,
};
