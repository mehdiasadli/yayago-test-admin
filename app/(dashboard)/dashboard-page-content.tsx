'use client';

import { createGetDashboardStatsQueryOptions } from '@/features/dashboard/dashboard.queries';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Car, ShoppingBag, DollarSign, TrendingUp, CheckCircle2, Clock, XCircle, Gauge } from 'lucide-react';

export function DashboardPageContent() {
  const { data: stats, isLoading } = useQuery(createGetDashboardStatsQueryOptions());

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
        </div>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <TrendingUp className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No data available</h3>
          <p className='text-sm text-muted-foreground'>Unable to load dashboard statistics</p>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className='space-y-6'>
      {/* Quick Stats Row */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Total Revenue */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(stats.totalRevenue)}</div>
            <p className='text-xs text-muted-foreground mt-1'>All-time earnings</p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalUsers.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground mt-1'>Registered users</p>
          </CardContent>
        </Card>

        {/* Total Cars */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Cars</CardTitle>
            <Car className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalCars.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground mt-1'>
              {stats.availableCars} available • {stats.occupiedCars} occupied
            </p>
          </CardContent>
        </Card>

        {/* Total Bookings */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Bookings</CardTitle>
            <ShoppingBag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalBookings.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground mt-1'>{stats.activeBookings} currently active</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              Revenue Breakdown
            </CardTitle>
            <CardDescription>Revenue statistics by period</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Daily Revenue</p>
                <p className='text-2xl font-bold'>{formatCurrency(stats.dailyRevenue)}</p>
              </div>
              <div className='rounded-full bg-green-500/10 p-3'>
                <DollarSign className='h-6 w-6 text-green-600 dark:text-green-400' />
              </div>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Monthly Revenue</p>
                <p className='text-2xl font-bold'>{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
              <div className='rounded-full bg-blue-500/10 p-3'>
                <DollarSign className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ShoppingBag className='h-5 w-5' />
              Booking Status
            </CardTitle>
            <CardDescription>Breakdown by booking status</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-yellow-500/10 p-2'>
                  <Clock className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
                </div>
                <div>
                  <p className='text-sm font-medium'>Pending</p>
                  <p className='text-xs text-muted-foreground'>Awaiting confirmation</p>
                </div>
              </div>
              <span className='text-2xl font-bold'>{stats.pendingBookings}</span>
            </div>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-green-500/10 p-2'>
                  <CheckCircle2 className='h-4 w-4 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <p className='text-sm font-medium'>Confirmed</p>
                  <p className='text-xs text-muted-foreground'>Active bookings</p>
                </div>
              </div>
              <span className='text-2xl font-bold'>{stats.confirmedBookings}</span>
            </div>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-red-500/10 p-2'>
                  <XCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
                </div>
                <div>
                  <p className='text-sm font-medium'>Cancelled</p>
                  <p className='text-xs text-muted-foreground'>Cancelled bookings</p>
                </div>
              </div>
              <span className='text-2xl font-bold'>{stats.cancelledBookings}</span>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Car className='h-5 w-5' />
              Fleet Overview
            </CardTitle>
            <CardDescription>Vehicle availability and usage</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Available Cars</p>
                <p className='text-2xl font-bold'>{stats.availableCars}</p>
              </div>
              <div className='rounded-full bg-green-500/10 p-3'>
                <CheckCircle2 className='h-6 w-6 text-green-600 dark:text-green-400' />
              </div>
            </div>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Occupied Cars</p>
                <p className='text-2xl font-bold'>{stats.occupiedCars}</p>
              </div>
              <div className='rounded-full bg-orange-500/10 p-3'>
                <Car className='h-6 w-6 text-orange-600 dark:text-orange-400' />
              </div>
            </div>
            <div className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-2'>
                <Gauge className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm font-medium text-muted-foreground'>Occupancy Rate</span>
              </div>
              <span className='text-xl font-bold'>{stats.occupancyRate.toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.activeBookings}</div>
            <p className='text-xs text-muted-foreground mt-2'>
              {((stats.activeBookings / stats.totalBookings) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Pending Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.pendingBookings}</div>
            <p className='text-xs text-muted-foreground mt-2'>Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Confirmed Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.confirmedBookings}</div>
            <p className='text-xs text-muted-foreground mt-2'>
              {((stats.confirmedBookings / stats.totalBookings) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Cancelled Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold'>{stats.cancelledBookings}</div>
            <p className='text-xs text-muted-foreground mt-2'>
              {((stats.cancelledBookings / stats.totalBookings) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
