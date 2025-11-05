'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadState {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  imageId?: number;
  imageUrl?: string;
  previewUrl?: string;
}

interface VehicleImagesUploadAreaProps {
  uploadingImages: ImageUploadState[];
  isUploading: boolean;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFromQueue: (index: number) => void;
  onUpload: () => void;
  onClearAll: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function VehicleImagesUploadArea({
  uploadingImages,
  isUploading,
  onFileSelect,
  onRemoveFromQueue,
  onUpload,
  onClearAll,
  fileInputRef,
}: VehicleImagesUploadAreaProps) {
  const allUploaded = uploadingImages.every((img) => img.status === 'success' || img.status === 'error');

  return (
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
            onChange={onFileSelect}
            disabled={isUploading}
          />
        </div>

        {uploadingImages.length > 0 && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium'>Upload Queue ({uploadingImages.length} images)</p>
              {!isUploading && (
                <Button size='sm' variant='outline' onClick={onClearAll}>
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
                    <Button size='sm' variant='ghost' onClick={() => onRemoveFromQueue(index)}>
                      <X className='size-4' />
                    </Button>
                  )}
                  {image.status === 'uploading' && <Loader2 className='size-5 animate-spin text-primary' />}
                  {image.status === 'success' && <CheckCircle2 className='size-5 text-green-500' />}
                  {image.status === 'error' && <X className='size-5 text-destructive' />}
                </div>
              ))}
            </div>

            {/* Upload All button */}
            <div className='flex justify-end'>
              <Button onClick={onUpload} disabled={isUploading || allUploaded}>
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
  );
}
