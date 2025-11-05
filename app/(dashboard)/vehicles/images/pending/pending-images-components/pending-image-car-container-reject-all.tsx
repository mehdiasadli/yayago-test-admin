'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRejectImageMutation } from '@/features/admin-images/admin-images.mutations';
import { CarImageSchemaType } from '@/schemas/car-images.schema';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PendingImageCarContainerRejectAllProps {
  images: CarImageSchemaType[];
  carId: number;
}

export function PendingImageCarContainerRejectAll({ images, carId }: PendingImageCarContainerRejectAllProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const rejectImageMutation = useRejectImageMutation();

  const handleRejectAll = async () => {
    setIsProcessing(true);

    try {
      // Process all images sequentially
      const promises = images.map((image) => rejectImageMutation.mutateAsync({ imageId: image.id }));

      await Promise.all(promises);

      toast.success(`Successfully rejected ${images.length} ${images.length === 1 ? 'image' : 'images'}`);
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to reject some images');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='outline' className='text-red-400 hover:text-red-500 hover:bg-red-50'>
          <X className='h-4 w-4 mr-2' />
          Reject All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject All Images</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reject all {images.length} {images.length === 1 ? 'image' : 'images'} for Vehicle #
            {carId}? This action will prevent them from being displayed to users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRejectAll}
            disabled={isProcessing}
            className='bg-destructive hover:bg-destructive/90'
          >
            {isProcessing ? 'Rejecting...' : 'Reject All'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
