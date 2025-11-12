'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, CheckCircle2, Clock, XCircle, Gauge } from 'lucide-react';
import { DashboardStatsSchemaType } from '@/schemas/dashboard.schema';

interface DashboardFleetSectionProps {
  stats: DashboardStatsSchemaType;
}

export function DashboardFleetSection({ stats }: DashboardFleetSectionProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const total = stats.cars.summary.total;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Car className='h-5 w-5' />
          Fleet Overview
        </CardTitle>
        <CardDescription>Vehicle status and availability</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Available */}
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='flex items-center gap-3'>
            <div className='rounded-full bg-green-500/10 p-3'>
              <CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400' />
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Available</p>
              <p className='text-xs text-muted-foreground'>Ready for booking</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-2xl font-bold'>{formatNumber(stats.cars.available)}</p>
            <p className='text-xs text-muted-foreground'>{((stats.cars.available / total) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Occupied */}
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='flex items-center gap-3'>
            <div className='rounded-full bg-orange-500/10 p-3'>
              <Car className='h-5 w-5 text-orange-600 dark:text-orange-400' />
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Occupied</p>
              <p className='text-xs text-muted-foreground'>Currently rented</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-2xl font-bold'>{formatNumber(stats.cars.occupied)}</p>
            <p className='text-xs text-muted-foreground'>{((stats.cars.occupied / total) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Pending Approval */}
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='flex items-center gap-3'>
            <div className='rounded-full bg-yellow-500/10 p-3'>
              <Clock className='h-5 w-5 text-yellow-600 dark:text-yellow-400' />
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Pending</p>
              <p className='text-xs text-muted-foreground'>Awaiting approval</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-2xl font-bold'>{formatNumber(stats.cars.pending)}</p>
            <p className='text-xs text-muted-foreground'>{((stats.cars.pending / total) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Occupancy Rate Indicator */}
        <div className='rounded-lg bg-muted/50 p-4'>
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center gap-2'>
              <Gauge className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm font-medium'>Fleet Utilization</span>
            </div>
            <span className='text-xl font-bold'>
              {stats.cars.available + stats.cars.occupied === 0
                ? 'N/A '
                : ((stats.cars.occupied / (stats.cars.available + stats.cars.occupied)) * 100).toFixed(1)}
              %
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>
            {formatNumber(stats.cars.occupied)} of {formatNumber(stats.cars.available + stats.cars.occupied)} active
            vehicles in use
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
