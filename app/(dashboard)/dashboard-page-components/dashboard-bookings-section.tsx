'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { DashboardStatsSchemaType } from '@/schemas/dashboard.schema';
import { Progress } from '@/components/ui/progress';

interface DashboardBookingsSectionProps {
  stats: DashboardStatsSchemaType;
}

export function DashboardBookingsSection({ stats }: DashboardBookingsSectionProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const total = stats.bookings.summary.total;
  const pendingPercent = (stats.bookings.pending / total) * 100;
  const confirmedPercent = (stats.bookings.confirmed / total) * 100;
  const cancelledPercent = (stats.bookings.cancelled / total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5' />
          Booking Status
        </CardTitle>
        <CardDescription>Breakdown by booking status</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Pending */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='rounded-full bg-yellow-500/10 p-2'>
                <Clock className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
              </div>
              <div>
                <p className='text-sm font-medium'>Pending</p>
                <p className='text-xs text-muted-foreground'>Awaiting confirmation</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold'>{formatNumber(stats.bookings.pending)}</p>
              <p className='text-xs text-muted-foreground'>{pendingPercent.toFixed(1)}%</p>
            </div>
          </div>
          <Progress value={pendingPercent} className='h-2 [&>div]:bg-yellow-500' />
        </div>

        {/* Confirmed */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='rounded-full bg-green-500/10 p-2'>
                <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
              </div>
              <div>
                <p className='text-sm font-medium'>Confirmed</p>
                <p className='text-xs text-muted-foreground'>Active bookings</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold'>{formatNumber(stats.bookings.confirmed)}</p>
              <p className='text-xs text-muted-foreground'>{confirmedPercent.toFixed(1)}%</p>
            </div>
          </div>
          <Progress value={confirmedPercent} className='h-2 [&>div]:bg-green-500' />
        </div>

        {/* Cancelled */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='rounded-full bg-red-500/10 p-2'>
                <XCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
              </div>
              <div>
                <p className='text-sm font-medium'>Cancelled</p>
                <p className='text-xs text-muted-foreground'>Cancelled bookings</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold'>{formatNumber(stats.bookings.cancelled)}</p>
              <p className='text-xs text-muted-foreground'>{cancelledPercent.toFixed(1)}%</p>
            </div>
          </div>
          <Progress value={cancelledPercent} className='h-2 [&>div]:bg-red-500' />
        </div>
      </CardContent>
    </Card>
  );
}
