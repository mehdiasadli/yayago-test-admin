import { queryOptions } from '@tanstack/react-query';
import { getCarImages, getPrimaryImage } from './car-images.api';
import { carImagesKeys } from './car-images.keys';
import { GetCarImagesParamSchemaType, GetPrimaryImageParamSchemaType } from '@/schemas/car-images.schema';

// GET CAR IMAGES
export function createGetCarImagesQueryOptions(params: GetCarImagesParamSchemaType) {
  return queryOptions({
    queryKey: carImagesKeys.list(params),
    queryFn: () => getCarImages(params),
  });
}

// GET PRIMARY IMAGE
export function createGetPrimaryImageQueryOptions(params: GetPrimaryImageParamSchemaType) {
  return queryOptions({
    queryKey: carImagesKeys.primaryImage(params),
    queryFn: () => getPrimaryImage(params),
  });
}
