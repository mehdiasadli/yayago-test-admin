'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { DashboardStatsSchemaType } from '@/schemas/dashboard.schema';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface DashboardImagesSectionProps {
  stats: DashboardStatsSchemaType;
}

export function DashboardImagesSection({ stats }: DashboardImagesSectionProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Image className='h-5 w-5' />
              Image Management
            </CardTitle>
            <CardDescription>Vehicle image approval status</CardDescription>
          </div>
          {stats.images.pending > 0 && (
            <Link href='/vehicles/images/pending'>
              <Button variant='outline' size='sm'>
                Review Pending
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Pending - Highlighted if any */}
        {stats.images.pending > 0 && (
          <div className='flex items-center justify-between rounded-lg border-2 border-yellow-500/50 bg-yellow-500/5 p-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-yellow-500/10 p-2'>
                <Clock className='h-5 w-5 text-yellow-600 dark:text-yellow-400' />
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>Pending Review</p>
                <p className='text-xs text-muted-foreground'>Awaiting approval</p>
              </div>
            </div>
            <p className='text-2xl font-bold'>{formatNumber(stats.images.pending)}</p>
          </div>
        )}

        {/* Approved */}
        <div className='flex items-center justify-between py-2'>
          <div className='flex items-center gap-2'>
            <div className='rounded-full bg-green-500/10 p-2'>
              <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
            </div>
            <div>
              <p className='text-sm font-medium'>Approved</p>
              <p className='text-xs text-muted-foreground'>Live on platform</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-xl font-bold'>{formatNumber(stats.images.approved)}</p>
            <p className='text-xs text-muted-foreground'>
              {((stats.images.approved / stats.images.summary.total) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Rejected */}
        <div className='flex items-center justify-between py-2'>
          <div className='flex items-center gap-2'>
            <div className='rounded-full bg-red-500/10 p-2'>
              <XCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
            </div>
            <div>
              <p className='text-sm font-medium'>Rejected</p>
              <p className='text-xs text-muted-foreground'>Not approved</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-xl font-bold'>{formatNumber(stats.images.rejected)}</p>
            <p className='text-xs text-muted-foreground'>
              {((stats.images.rejected / stats.images.summary.total) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Total */}
        <div className='flex items-center justify-between rounded-lg bg-muted/50 p-4'>
          <span className='text-sm font-medium text-muted-foreground'>Total Images</span>
          <span className='text-2xl font-bold'>{formatNumber(stats.images.summary.total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
