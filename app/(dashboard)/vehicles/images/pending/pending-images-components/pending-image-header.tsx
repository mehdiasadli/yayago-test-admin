import { ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PendingImageHeaderProps {
  totalImages: number;
}

export function PendingImageHeader({ totalImages }: PendingImageHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <Badge variant='secondary' className='text-base px-4 py-4'>
        <ImageIcon className='h-4 w-4 mr-2' />
        Total {totalImages} {totalImages === 1 ? 'image' : 'images'}
      </Badge>
    </div>
  );
}
