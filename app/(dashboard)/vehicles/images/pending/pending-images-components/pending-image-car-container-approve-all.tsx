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
import { useApproveImageMutation } from '@/features/admin-images/admin-images.mutations';
import { CarImageSchemaType } from '@/schemas/car-images.schema';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PendingImageCarContainerApproveAllProps {
  images: CarImageSchemaType[];
  carId: number;
}

export function PendingImageCarContainerApproveAll({ images, carId }: PendingImageCarContainerApproveAllProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const approveImageMutation = useApproveImageMutation();

  const handleApproveAll = async () => {
    setIsProcessing(true);

    try {
      // Process all images sequentially
      const promises = images.map((image) => approveImageMutation.mutateAsync({ imageId: image.id }));

      await Promise.all(promises);

      toast.success(`Successfully approved ${images.length} ${images.length === 1 ? 'image' : 'images'}`);
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to approve some images');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='outline' className='text-green-400 hover:text-green-500 hover:bg-green-50'>
          <Check className='h-4 w-4 mr-2' />
          Approve All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve All Images</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve all {images.length} {images.length === 1 ? 'image' : 'images'} for Vehicle
            #{carId}? This action will make them visible to users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleApproveAll}
            disabled={isProcessing}
            className='bg-green-600 hover:bg-green-700'
          >
            {isProcessing ? 'Approving...' : 'Approve All'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
