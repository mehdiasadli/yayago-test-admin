'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, CheckCircle2, Loader2, Image as ImageIcon, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';
import { bulkUploadImages } from '@/api/car-images/car-images.api';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  useDeleteImageMutation,
  useSetPrimaryImageMutation,
  useApproveImageMutation,
  useRejectImageMutation,
} from '@/api/car-images/car-images.mutations';
import { useQuery } from '@tanstack/react-query';
import { createGetVehicleByIdQueryOptions } from '@/api/vehicles/vehicles.queries';

interface ImageUploadState {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  imageId?: number;
  imageUrl?: string;
  previewUrl?: string;
}

interface VehicleImagesUploaderProps {
  carId: number;
}

export function VehicleImagesUploader({ carId }: VehicleImagesUploaderProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImages, setUploadingImages] = useState<ImageUploadState[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // WORKAROUND: Using vehicle details endpoint because /api/cars/{id}/images only returns primary image
  // TODO: Switch back to createGetCarImagesQueryOptions once backend bug is fixed
  // See: BUG_REPORT_CAR_IMAGES.md
  const { data: vehicleData, refetch: refetchImages } = useQuery(createGetVehicleByIdQueryOptions({ carId }));
  const existingImages = vehicleData?.images || [];
  const deleteImageMutation = useDeleteImageMutation();
  const setPrimaryImageMutation = useSetPrimaryImageMutation();
  const approveImageMutation = useApproveImageMutation();
  const rejectImageMutation = useRejectImageMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    const validFiles = files.filter((file) => {
      const isValid = file.type.startsWith('image/');
      if (!isValid) {
        toast.error(`${file.name} is not a valid image file`);
      }
      return isValid;
    });

    if (validFiles.length === 0) return;

    // Add to upload queue with preview URLs
    const newImages: ImageUploadState[] = validFiles.map((file) => ({
      file,
      status: 'pending',
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadingImages((prev) => [...prev, ...newImages]);
  };

  const handleUpload = async () => {
    const pendingImages = uploadingImages.filter((img) => img.status === 'pending');
    if (pendingImages.length === 0) {
      toast.info('No images to upload');
      return;
    }

    setIsUploading(true);

    try {
      // Use the bulk upload simulation with correct parameters
      const result = await bulkUploadImages(
        { carId }, // params object
        { files: pendingImages.map((img) => img.file) }, // request object
        (progressArray) => {
          // Update status for each image based on progress array
          setUploadingImages((prev) => {
            const newState = [...prev];
            progressArray.forEach((progress, idx) => {
              const pendingIndices = newState
                .map((img, i) => (img.status === 'pending' || img.status === 'uploading' ? i : -1))
                .filter((i) => i !== -1);

              if (pendingIndices[idx] !== undefined) {
                const actualIndex = pendingIndices[idx];
                newState[actualIndex] = {
                  ...newState[actualIndex],
                  status: progress.status,
                  error: progress.error,
                  imageId: progress.imageData?.id,
                  imageUrl: progress.imageData?.imageUrl,
                };
              }
            });
            return newState;
          });
        }
      );

      // Check if any uploads failed
      if (result.failedFiles && result.failedFiles.length > 0) {
        const failedCount = result.failedFiles.length;
        const successCount = result.uploadedImages.length;
        console.error('Failed uploads:', result.failedFiles);
        toast.error(`${failedCount} image(s) failed to upload. ${successCount} succeeded.`);
      } else {
        toast.success('All images uploaded successfully!');
      }

      await refetchImages();
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Some images failed to upload';
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFromQueue = (index: number) => {
    // Revoke the preview URL to free memory
    const imageToRemove = uploadingImages[index];
    if (imageToRemove.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    setUploadingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      uploadingImages.forEach((image) => {
        if (image.previewUrl) {
          URL.revokeObjectURL(image.previewUrl);
        }
      });
    };
  }, [uploadingImages]);

  const handleDeleteExistingImage = async (imageId: number) => {
    try {
      await deleteImageMutation.mutateAsync({ imageId });
      toast.success('Image deleted successfully');
      await refetchImages();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const handleSetPrimaryImage = async (imageId: number) => {
    try {
      await setPrimaryImageMutation.mutateAsync({ imageId });
      toast.success('Primary image set successfully');
      await refetchImages();
    } catch (error) {
      toast.error('Failed to set primary image');
    }
  };

  const handleApproveImage = async (imageId: number) => {
    try {
      await approveImageMutation.mutateAsync({ imageId });
      toast.success('Image approved successfully');
      await refetchImages();
    } catch (error) {
      toast.error('Failed to approve image');
    }
  };

  const handleRejectImage = async (imageId: number) => {
    try {
      await rejectImageMutation.mutateAsync({ imageId });
      toast.success('Image rejected successfully');
      await refetchImages();
    } catch (error) {
      toast.error('Failed to reject image');
    }
  };

  const handleFinish = () => {
    // Check if there are any successfully uploaded images
    const successfulUploads = uploadingImages.filter((img) => img.status === 'success').length;
    const totalImages = (existingImages?.length || 0) + successfulUploads;

    if (totalImages === 0) {
      toast.warning('Please upload at least one image before finishing');
      return;
    }
    router.push(`/vehicles/${carId}`);
  };

  const allUploaded = uploadingImages.every((img) => img.status === 'success' || img.status === 'error');

  return (
    <div className='space-y-6'>
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Vehicle Images</CardTitle>
          <CardDescription>
            Add high-quality images of the vehicle. You can upload multiple images at once.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors',
              'hover:border-primary hover:bg-primary/5'
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className='mb-4 size-12 text-muted-foreground' />
            <p className='mb-2 text-sm font-medium'>Click to upload or drag and drop</p>
            <p className='text-xs text-muted-foreground'>PNG, JPG, WEBP up to 10MB each</p>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              multiple
              className='hidden'
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </div>

          {uploadingImages.length > 0 && (
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium'>Upload Queue ({uploadingImages.length} images)</p>
                {!isUploading && (
                  <Button size='sm' variant='outline' onClick={() => setUploadingImages([])}>
                    Clear All
                  </Button>
                )}
              </div>

              <div className='space-y-2'>
                {uploadingImages.map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3',
                      image.status === 'success' && 'border-green-500/50 bg-green-500/5',
                      image.status === 'error' && 'border-destructive/50 bg-destructive/5'
                    )}
                  >
                    {/* Preview Image */}
                    {image.previewUrl ? (
                      <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted'>
                        <img src={image.previewUrl} alt={image.file.name} className='h-full w-full object-cover' />
                      </div>
                    ) : (
                      <ImageIcon className='size-16 shrink-0 text-muted-foreground' />
                    )}
                    <div className='flex-1 truncate'>
                      <p className='truncate text-sm font-medium'>{image.file.name}</p>
                      <p className='text-xs text-muted-foreground'>{(image.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      {image.error && <p className='text-xs text-destructive'>{image.error}</p>}
                    </div>
                    {image.status === 'pending' && !isUploading && (
                      <Button size='sm' variant='ghost' onClick={() => handleRemoveFromQueue(index)}>
                        <X className='size-4' />
                      </Button>
                    )}
                    {image.status === 'uploading' && <Loader2 className='size-5 animate-spin text-primary' />}
                    {image.status === 'success' && <CheckCircle2 className='size-5 text-green-500' />}
                    {image.status === 'error' && <X className='size-5 text-destructive' />}
                  </div>
                ))}
              </div>

              {/* Upload All button after the queue list */}
              <div className='flex justify-end'>
                <Button onClick={handleUpload} disabled={isUploading || allUploaded}>
                  {isUploading ? (
                    <>
                      <Loader2 className='mr-2 size-4 animate-spin' />
                      Uploading...
                    </>
                  ) : (
                    'Upload All'
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing Images */}
      {existingImages && existingImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Images ({existingImages.length})</CardTitle>
            <CardDescription>Manage your vehicle images. Click the star to set a primary image.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {existingImages.map((image) => (
                <div key={image.id} className='group relative overflow-hidden rounded-lg border bg-card'>
                  {/* Image */}
                  <div className='relative'>
                    <img src={image.imageUrl} alt={image.imageName} className='aspect-video w-full object-cover' />
                    {/* Hover overlay with actions */}
                    <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100'>
                      <Button
                        size='sm'
                        variant={image.isPrimary ? 'default' : 'secondary'}
                        onClick={() => handleSetPrimaryImage(image.id)}
                        disabled={setPrimaryImageMutation.isPending}
                        title='Set as primary'
                      >
                        <Star className={cn('size-4', image.isPrimary && 'fill-current')} />
                      </Button>
                      <Button
                        size='sm'
                        variant='destructive'
                        onClick={() => handleDeleteExistingImage(image.id)}
                        disabled={deleteImageMutation.isPending}
                        title='Delete image'
                      >
                        <X className='size-4' />
                      </Button>
                    </div>
                    {/* Primary badge */}
                    {image.isPrimary && (
                      <div className='absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground'>
                        Primary
                      </div>
                    )}
                  </div>

                  {/* Bottom actions bar - always visible */}
                  <div className='flex items-center justify-center gap-2 border-t p-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30'
                      onClick={() => handleApproveImage(image.id)}
                      disabled={approveImageMutation.isPending}
                    >
                      <ThumbsUp className='size-4' />
                      Approve
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30'
                      onClick={() => handleRejectImage(image.id)}
                      disabled={rejectImageMutation.isPending}
                    >
                      <ThumbsDown className='size-4' />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <Button variant='outline' onClick={() => router.push('/vehicles')}>
          Cancel
        </Button>
        <Button onClick={handleFinish}>Finish & View Vehicle</Button>
      </div>
    </div>
  );
}
