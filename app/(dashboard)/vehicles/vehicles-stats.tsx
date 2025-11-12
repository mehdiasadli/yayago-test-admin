'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import {
  createGetDashboardStatsQueryOptions,
  createGetBookingAnalyticsQueryOptions,
} from '@/features/dashboard/dashboard.queries';
import { Car, TrendingUp, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryState } from 'nuqs';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export function VehiclesStats() {
  const [period, setPeriod] = useQueryState('period', {
    defaultValue: 'month',
  });

  const { data: dashboardStats, isLoading: isLoadingDashboard } = useQuery(createGetDashboardStatsQueryOptions());

  const { data: bookingAnalytics, isLoading: isLoadingAnalytics } = useQuery(
    createGetBookingAnalyticsQueryOptions({
      period: period as 'day' | 'week' | 'month' | 'year',
    })
  );

  const isLoading = isLoadingDashboard || isLoadingAnalytics;

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          <Skeleton className='h-96' />
          <Skeleton className='h-96' />
        </div>
      </div>
    );
  }

  if (!dashboardStats || !bookingAnalytics) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <Car className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No data available</h3>
          <p className='text-sm text-muted-foreground'>Unable to load vehicle statistics</p>
        </CardContent>
      </Card>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'day':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'This Month';
    }
  };

  const utilizationRate =
    dashboardStats.cars.available + dashboardStats.cars.occupied > 0
      ? (dashboardStats.cars.occupied / (dashboardStats.cars.available + dashboardStats.cars.occupied)) * 100
      : 0;

  return (
    <div className='space-y-6'>
      {/* Period Selector */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Fleet Analytics</h3>
          <p className='text-sm text-muted-foreground'>Overview of vehicle performance and utilization</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select period' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='day'>Today</SelectItem>
            <SelectItem value='week'>This Week</SelectItem>
            <SelectItem value='month'>This Month</SelectItem>
            <SelectItem value='year'>This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Total Vehicles */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Vehicles</CardTitle>
            <Car className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(dashboardStats.cars.summary.total)}</div>
            <div className='flex items-center gap-2 mt-1'>
              <p className='text-xs text-muted-foreground'>{formatNumber(dashboardStats.cars.approved)} approved</p>
              <div
                className={`flex items-center gap-1 text-xs ${dashboardStats.cars.summary.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              >
                <TrendingUp className='h-3 w-3' />
                <span>
                  {dashboardStats.cars.summary.growth >= 0 ? '+' : ''}
                  {dashboardStats.cars.summary.growth.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Available</CardTitle>
            <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(dashboardStats.cars.available)}</div>
            <p className='text-xs text-muted-foreground mt-1'>Ready for booking</p>
          </CardContent>
        </Card>

        {/* Occupied */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Occupied</CardTitle>
            <Car className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(dashboardStats.cars.occupied)}</div>
            <p className='text-xs text-muted-foreground mt-1'>Currently rented</p>
          </CardContent>
        </Card>

        {/* Utilization Rate */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Utilization Rate</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{utilizationRate.toFixed(1)}%</div>
            <p className='text-xs text-muted-foreground mt-1'>
              {formatNumber(dashboardStats.cars.occupied)} of{' '}
              {formatNumber(dashboardStats.cars.available + dashboardStats.cars.occupied)} active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Top Revenue Vehicles */}
        <Card>
          <CardHeader>
            <CardTitle>Top Revenue Vehicles</CardTitle>
            <CardDescription>Highest earning vehicles for {getPeriodLabel()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {bookingAnalytics.bookingsByCar
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 10)
                .map((vehicle, index) => (
                  <Link href={`/vehicles/${vehicle.carId}`} key={vehicle.carId}>
                    <div className='flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors'>
                      <div className='flex items-center gap-3 flex-1'>
                        <div className='relative'>
                          <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                            <Car className='h-5 w-5 text-primary' />
                          </div>
                          {index < 3 && (
                            <div
                              className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0
                                  ? 'bg-yellow-500 text-yellow-900'
                                  : index === 1
                                    ? 'bg-gray-400 text-gray-900'
                                    : 'bg-amber-600 text-amber-100'
                              }`}
                            >
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium truncate'>{vehicle.carName}</p>
                          <p className='text-xs text-muted-foreground'>{formatNumber(vehicle.bookings)} bookings</p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-bold'>{formatCurrency(vehicle.revenue)}</p>
                        <p className='text-xs text-muted-foreground'>revenue</p>
                      </div>
                    </div>
                  </Link>
                ))}
              {bookingAnalytics.bookingsByCar.length === 0 && (
                <div className='flex flex-col items-center justify-center py-8 text-center'>
                  <Car className='h-12 w-12 text-muted-foreground mb-2' />
                  <p className='text-sm text-muted-foreground'>No booking data available for this period</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Vehicles */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Vehicles</CardTitle>
            <CardDescription>Most booked vehicles for {getPeriodLabel()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {bookingAnalytics.popularCars.slice(0, 10).map((vehicle, index) => (
                <Link href={`/vehicles/${vehicle.carId}`} key={vehicle.carId}>
                  <div className='flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors'>
                    <div className='flex items-center gap-3 flex-1'>
                      <div className='relative'>
                        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                          <Car className='h-5 w-5 text-primary' />
                        </div>
                        {index < 3 && (
                          <div
                            className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0
                                ? 'bg-yellow-500 text-yellow-900'
                                : index === 1
                                  ? 'bg-gray-400 text-gray-900'
                                  : 'bg-amber-600 text-amber-100'
                            }`}
                          >
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium truncate'>{vehicle.carName}</p>
                        <p className='text-xs text-muted-foreground'>{formatCurrency(vehicle.revenue)} revenue</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <Badge variant='secondary' className='font-mono'>
                        {formatNumber(vehicle.bookings)}
                      </Badge>
                      <p className='text-xs text-muted-foreground mt-1'>bookings</p>
                    </div>
                  </div>
                </Link>
              ))}
              {bookingAnalytics.popularCars.length === 0 && (
                <div className='flex flex-col items-center justify-center py-8 text-center'>
                  <Car className='h-12 w-12 text-muted-foreground mb-2' />
                  <p className='text-sm text-muted-foreground'>No popular vehicles data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Pending Approval */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Approval</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(dashboardStats.cars.pending)}</div>
            <p className='text-xs text-muted-foreground mt-1'>Awaiting review</p>
          </CardContent>
        </Card>

        {/* Total Bookings (Period) */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Bookings</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(bookingAnalytics.totalBookings)}</div>
            <p className='text-xs text-muted-foreground mt-1'>{getPeriodLabel()}</p>
          </CardContent>
        </Card>

        {/* Average Duration */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg Rental Duration</CardTitle>
            <Car className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{bookingAnalytics.averageDuration.toFixed(1)}</div>
            <p className='text-xs text-muted-foreground mt-1'>days per booking</p>
          </CardContent>
        </Card>

        {/* Unique Cars Booked */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Fleet</CardTitle>
            <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(bookingAnalytics.bookingsByCar.length)}</div>
            <p className='text-xs text-muted-foreground mt-1'>vehicles with bookings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
