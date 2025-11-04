import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ReviewSchemaType } from '@/schemas/reviews.schema';
import { format } from 'date-fns';
import { EllipsisVerticalIcon, Star, Trash2, Car } from 'lucide-react';
import { useDeleteReviewByAdminMutation } from '@/features/reviews/reviews.mutations';
import { toast } from 'sonner';
import Link from 'next/link';

interface ReviewCardProps {
  review: ReviewSchemaType;
  showActions?: boolean;
  variant?: 'user' | 'vehicle'; // 'user' shows user info (default), 'vehicle' shows car info
}

export function ReviewCard({ review, showActions = true, variant = 'user' }: ReviewCardProps) {
  const deleteReviewMutation = useDeleteReviewByAdminMutation();

  const handleDeleteReview = async () => {
    try {
      await deleteReviewMutation.mutateAsync({
        params: { reviewId: review.id },
        carId: review.carId,
      });
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return (
      <div className='flex items-center gap-0.5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'destructive';
  };

  return (
    <Card className='relative'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2'>
          {variant === 'user' ? (
            // Show user information (for vehicle details page)
            <Link href={`/users/${review.userId}`} className='flex items-center gap-3'>
              <Avatar className='h-10 w-10'>
                <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                  {getInitials(review.userFullName)}
                </AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <h4 className='font-semibold text-sm'>{review.userFullName}</h4>
                  <Badge variant={getRatingColor(review.rating)} className='text-xs px-2 py-0 h-5'>
                    {review.rating}.0
                  </Badge>
                </div>
                <div className='flex items-center gap-2'>{renderStars(review.rating)}</div>
              </div>
            </Link>
          ) : (
            // Show vehicle information (for user details page)
            <Link
              href={`/vehicles/${review.carId}`}
              className='flex items-center gap-3 hover:opacity-80 transition-opacity'
            >
              <div className='h-10 w-10 rounded-lg bg-muted flex items-center justify-center'>
                <Car className='h-5 w-5 text-muted-foreground' />
              </div>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <h4 className='font-semibold text-sm'>Vehicle #{review.carId}</h4>
                  <Badge variant={getRatingColor(review.rating)} className='text-xs px-2 py-0 h-5'>
                    {review.rating}.0
                  </Badge>
                </div>
                <div className='flex items-center gap-2'>{renderStars(review.rating)}</div>
              </div>
            </Link>
          )}
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
                  <EllipsisVerticalIcon className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={handleDeleteReview}
                  disabled={deleteReviewMutation.isPending}
                  className='text-destructive focus:text-destructive'
                >
                  <Trash2 className='h-4 w-4 mr-2' />
                  Delete Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        {review.comment && <p className='text-sm text-muted-foreground leading-relaxed'>{review.comment}</p>}
        <CardDescription className='text-xs'>
          {format(new Date(review.createdAt), 'MMM dd, yyyy • HH:mm')}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
