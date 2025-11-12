'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import {
  createGetDashboardStatsQueryOptions,
  createGetBookingAnalyticsQueryOptions,
} from '@/features/dashboard/dashboard.queries';
import { Calendar, CheckCircle2, Clock, XCircle, TrendingUp, Car } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryState } from 'nuqs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function BookingsStats() {
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
        <CardHeader>
          <CardTitle>Booking Analytics</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const pendingCount = bookingAnalytics.bookingsByStatus.PENDING || 0;
  const confirmedCount = bookingAnalytics.bookingsByStatus.CONFIRMED || 0;
  const completedCount = bookingAnalytics.bookingsByStatus.COMPLETED || 0;
  const cancelledCount = bookingAnalytics.bookingsByStatus.CANCELLED || 0;

  return (
    <div className='space-y-6'>
      {/* Period Selector */}
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-lg font-semibold'>Booking Analytics</h3>
          <p className='text-sm text-muted-foreground'>Overview of booking performance for the selected period</p>
        </div>
        <Select value={period || 'month'} onValueChange={setPeriod}>
          <SelectTrigger className='w-32'>
            <SelectValue placeholder='Period' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='day'>Day</SelectItem>
            <SelectItem value='week'>Week</SelectItem>
            <SelectItem value='month'>Month</SelectItem>
            <SelectItem value='year'>Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Bookings</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{bookingAnalytics.totalBookings}</div>
            <p className='text-xs text-muted-foreground'>
              This {period === 'day' ? 'day' : period === 'week' ? 'week' : period === 'month' ? 'month' : 'year'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Confirmed</CardTitle>
            <CheckCircle2 className='h-4 w-4 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{confirmedCount}</div>
            <p className='text-xs text-muted-foreground'>
              {bookingAnalytics.totalBookings > 0
                ? ((confirmedCount / bookingAnalytics.totalBookings) * 100).toFixed(1)
                : 0}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending</CardTitle>
            <Clock className='h-4 w-4 text-yellow-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingCount}</div>
            <p className='text-xs text-muted-foreground'>Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg Duration</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{bookingAnalytics.averageDuration.toFixed(1)}</div>
            <p className='text-xs text-muted-foreground'>Days per booking</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings by Status */}
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Status</CardTitle>
            <CardDescription>Distribution of booking statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='warning' className='text-white'>
                      PENDING
                    </Badge>
                    <span className='text-sm font-medium'>{pendingCount} bookings</span>
                  </div>
                </div>
                <div className='w-full bg-muted rounded-full h-2'>
                  <div
                    className='bg-yellow-500 h-2 rounded-full transition-all'
                    style={{
                      width: `${bookingAnalytics.totalBookings > 0 ? (pendingCount / bookingAnalytics.totalBookings) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='success' className='text-white'>
                      CONFIRMED
                    </Badge>
                    <span className='text-sm font-medium'>{confirmedCount} bookings</span>
                  </div>
                </div>
                <div className='w-full bg-muted rounded-full h-2'>
                  <div
                    className='bg-green-500 h-2 rounded-full transition-all'
                    style={{
                      width: `${bookingAnalytics.totalBookings > 0 ? (confirmedCount / bookingAnalytics.totalBookings) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='info' className='text-white'>
                      COMPLETED
                    </Badge>
                    <span className='text-sm font-medium'>{completedCount} bookings</span>
                  </div>
                </div>
                <div className='w-full bg-muted rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full transition-all'
                    style={{
                      width: `${bookingAnalytics.totalBookings > 0 ? (completedCount / bookingAnalytics.totalBookings) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='destructive' className='text-white'>
                      CANCELLED
                    </Badge>
                    <span className='text-sm font-medium'>{cancelledCount} bookings</span>
                  </div>
                </div>
                <div className='w-full bg-muted rounded-full h-2'>
                  <div
                    className='bg-red-500 h-2 rounded-full transition-all'
                    style={{
                      width: `${bookingAnalytics.totalBookings > 0 ? (cancelledCount / bookingAnalytics.totalBookings) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Cars */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Vehicles</CardTitle>
            <CardDescription>Top vehicles by booking count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {bookingAnalytics.popularCars.length > 0 ? (
                bookingAnalytics.popularCars.slice(0, 10).map((car, index) => (
                  <Link href={`/vehicles/${car.carId}`} key={car.carId}>
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
                          <p className='text-sm font-medium truncate'>{car.carName}</p>
                          <p className='text-xs text-muted-foreground'>{car.bookings} bookings</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className='text-sm text-muted-foreground text-center py-4'>No data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
