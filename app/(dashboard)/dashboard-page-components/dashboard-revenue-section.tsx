'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp } from 'lucide-react';
import { DashboardStatsSchemaType } from '@/schemas/dashboard.schema';

interface DashboardRevenueSectionProps {
  stats: DashboardStatsSchemaType;
}

export function DashboardRevenueSection({ stats }: DashboardRevenueSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          Revenue Overview
        </CardTitle>
        <CardDescription>Revenue statistics and trends</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* This Month */}
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>This Month</p>
            <p className='text-2xl font-bold'>{formatCurrency(stats.revenue.summary.thisMonth)}</p>
            <p className='text-xs text-muted-foreground'>
              Avg per booking: {formatCurrency(stats.revenue.thisMonthAveragePerBooking)}
            </p>
          </div>
          <div className='rounded-full bg-green-500/10 p-3'>
            <DollarSign className='h-6 w-6 text-green-600 dark:text-green-400' />
          </div>
        </div>

        {/* Last Month */}
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Last Month</p>
            <p className='text-2xl font-bold'>{formatCurrency(stats.revenue.summary.lastMonth)}</p>
            <p className='text-xs text-muted-foreground'>
              Avg per booking: {formatCurrency(stats.revenue.averagePerBooking)}
            </p>
          </div>
          <div className='rounded-full bg-blue-500/10 p-3'>
            <DollarSign className='h-6 w-6 text-blue-600 dark:text-blue-400' />
          </div>
        </div>

        {/* Growth Indicator */}
        <div className='flex items-center justify-between rounded-lg bg-muted/50 p-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Month-over-Month Growth</p>
            <p className='text-xs text-muted-foreground'>
              {formatCurrency(stats.revenue.summary.thisMonth - stats.revenue.summary.lastMonth)} difference
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <TrendingUp
              className={`h-5 w-5 ${stats.revenue.summary.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            />
            <span
              className={`text-2xl font-bold ${stats.revenue.summary.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {stats.revenue.summary.growth >= 0 ? '+' : ''}
              {stats.revenue.summary.growth.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
