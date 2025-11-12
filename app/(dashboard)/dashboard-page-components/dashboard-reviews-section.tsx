'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, TrendingUp } from 'lucide-react';
import { DashboardStatsSchemaType } from '@/schemas/dashboard.schema';

interface DashboardReviewsSectionProps {
  stats: DashboardStatsSchemaType;
}

export function DashboardReviewsSection({ stats }: DashboardReviewsSectionProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const renderStars = (rating: number) => {
    return (
      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Star className='h-5 w-5' />
          Customer Reviews
        </CardTitle>
        <CardDescription>Review statistics and ratings</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Average Rating - Prominent Display */}
        <div className='flex flex-col items-center justify-center rounded-lg border-2 border-primary/20 bg-primary/5 p-6'>
          <p className='text-sm font-medium text-muted-foreground mb-2'>Average Rating</p>
          <div className='text-5xl font-bold mb-3'>{stats.reviews.averageRating.toFixed(1)}</div>
          {renderStars(Math.round(stats.reviews.averageRating))}
          <p className='text-xs text-muted-foreground mt-3'>
            Based on {formatNumber(stats.reviews.summary.total)} reviews
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Total Reviews */}
          <div className='rounded-lg border p-4 text-center'>
            <p className='text-2xl font-bold'>{formatNumber(stats.reviews.summary.total)}</p>
            <p className='text-xs text-muted-foreground mt-1'>Total Reviews</p>
          </div>

          {/* This Month */}
          <div className='rounded-lg border p-4 text-center'>
            <p className='text-2xl font-bold'>{formatNumber(stats.reviews.summary.thisMonth)}</p>
            <p className='text-xs text-muted-foreground mt-1'>This Month</p>
          </div>
        </div>

        {/* Growth Indicator */}
        <div className='flex items-center justify-between rounded-lg bg-muted/50 p-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Month-over-Month</p>
            <p className='text-xs text-muted-foreground'>
              {formatNumber(stats.reviews.summary.thisMonth - stats.reviews.summary.lastMonth)} difference
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <TrendingUp
              className={`h-5 w-5 ${stats.reviews.summary.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            />
            <span
              className={`text-xl font-bold ${stats.reviews.summary.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {stats.reviews.summary.growth >= 0 ? '+' : ''}
              {stats.reviews.summary.growth.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
