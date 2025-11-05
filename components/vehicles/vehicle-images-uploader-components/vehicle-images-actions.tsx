'use client';

import { Button } from '@/components/ui/button';

interface VehicleImagesActionsProps {
  onCancel: () => void;
  onFinish: () => void;
}

export function VehicleImagesActions({ onCancel, onFinish }: VehicleImagesActionsProps) {
  return (
    <div className='flex items-center justify-between'>
      <Button variant='outline' onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onFinish}>Finish & View Vehicle</Button>
    </div>
  );
}
