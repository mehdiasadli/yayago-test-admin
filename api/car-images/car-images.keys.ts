import { CarIdParamSchemaType } from '@/schemas/car-images.schema';

export const carImagesKeys = {
  all: ['car-images'] as const,
  lists: () => [...carImagesKeys.all, 'list'] as const,
  list: (params: CarIdParamSchemaType) => [...carImagesKeys.lists(), params] as const,
  primaryImage: (params: CarIdParamSchemaType) => [...carImagesKeys.list(params), 'primary'] as const,
};
