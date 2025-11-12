'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Car, ShoppingBag, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStatsSchemaType } from '@/schemas/dashboard.schema';

interface DashboardStatsCardsProps {
  stats: DashboardStatsSchemaType;
}

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const GrowthIndicator = ({ growth }: { growth: number }) => {
    const isPositive = growth >= 0;
    return (
      <div
        className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
      >
        {isPositive ? <TrendingUp className='h-3 w-3' /> : <TrendingDown className='h-3 w-3' />}
        <span>
          {isPositive ? '+' : ''}
          {growth.toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {/* Total Revenue */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatCurrency(stats.revenue.summary.total)}</div>
          <div className='flex items-center gap-2 mt-1'>
            <p className='text-xs text-muted-foreground'>
              {formatCurrency(stats.revenue.summary.thisMonth)} this month
            </p>
            <GrowthIndicator growth={stats.revenue.summary.growth} />
          </div>
        </CardContent>
      </Card>

      {/* Total Users */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatNumber(stats.users.total)}</div>
          <div className='flex items-center gap-2 mt-1'>
            <p className='text-xs text-muted-foreground'>+{formatNumber(stats.users.thisMonth)} this month</p>
            <GrowthIndicator growth={stats.users.growth} />
          </div>
        </CardContent>
      </Card>

      {/* Total Cars */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Vehicles</CardTitle>
          <Car className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatNumber(stats.cars.summary.total)}</div>
          <div className='flex items-center gap-2 mt-1'>
            <p className='text-xs text-muted-foreground'>
              {formatNumber(stats.cars.available)} available • {formatNumber(stats.cars.occupied)} occupied
            </p>
            <GrowthIndicator growth={stats.cars.summary.growth} />
          </div>
        </CardContent>
      </Card>

      {/* Total Bookings */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Bookings</CardTitle>
          <ShoppingBag className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatNumber(stats.bookings.summary.total)}</div>
          <div className='flex items-center gap-2 mt-1'>
            <p className='text-xs text-muted-foreground'>
              +{formatNumber(stats.bookings.summary.thisMonth)} this month
            </p>
            <GrowthIndicator growth={stats.bookings.summary.growth} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
