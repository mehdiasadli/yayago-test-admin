'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { bulkUploadImages } from '@/features/car-images/car-images.api';
import { useRouter } from 'next/navigation';
import {
  useDeleteImageMutation,
  useSetPrimaryImageMutation,
  useApproveImageMutation,
  useRejectImageMutation,
} from '@/features/car-images/car-images.mutations';
import { useQuery } from '@tanstack/react-query';
import { createGetVehicleByIdQueryOptions } from '@/features/vehicles/vehicles.queries';
import { VehicleImagesUploadArea } from './vehicle-images-uploader-components/vehicle-images-upload-area';
import { VehicleImagesExistingImages } from './vehicle-images-uploader-components/vehicle-images-existing-images';
import { VehicleImagesActions } from './vehicle-images-uploader-components/vehicle-images-actions';

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleCancel = () => {
    router.push('/vehicles');
  };

  return (
    <div className='space-y-6'>
      <VehicleImagesUploadArea
        uploadingImages={uploadingImages}
        isUploading={isUploading}
        onFileSelect={handleFileSelect}
        onRemoveFromQueue={handleRemoveFromQueue}
        onUpload={handleUpload}
        onClearAll={() => setUploadingImages([])}
        fileInputRef={fileInputRef}
      />

      <VehicleImagesExistingImages
        images={existingImages}
        onSetPrimaryImage={handleSetPrimaryImage}
        onDeleteImage={handleDeleteExistingImage}
        onApproveImage={handleApproveImage}
        onRejectImage={handleRejectImage}
        isSetPrimaryPending={setPrimaryImageMutation.isPending}
        isDeletePending={deleteImageMutation.isPending}
        isApprovePending={approveImageMutation.isPending}
        isRejectPending={rejectImageMutation.isPending}
      />

      <VehicleImagesActions onCancel={handleCancel} onFinish={handleFinish} />
    </div>
  );
}
