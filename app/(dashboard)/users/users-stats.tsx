'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import {
  createGetDashboardStatsQueryOptions,
  createGetUserAnalyticsQueryOptions,
} from '@/features/dashboard/dashboard.queries';
import { Users, TrendingUp, UserPlus, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryState } from 'nuqs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

export function UsersStats() {
  const [period, setPeriod] = useQueryState('period', {
    defaultValue: 'month',
  });

  const { data: dashboardStats, isLoading: isLoadingDashboard } = useQuery(createGetDashboardStatsQueryOptions());

  const { data: userAnalytics, isLoading: isLoadingAnalytics } = useQuery(
    createGetUserAnalyticsQueryOptions({
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

  if (!dashboardStats || !userAnalytics) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <Users className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No data available</h3>
          <p className='text-sm text-muted-foreground'>Unable to load user statistics</p>
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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

  return (
    <div className='space-y-6'>
      {/* Period Selector */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>User Analytics</h3>
          <p className='text-sm text-muted-foreground'>Overview of user activity and growth</p>
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
        {/* Total Users */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(dashboardStats.users.total)}</div>
            <div className='flex items-center gap-2 mt-1'>
              <p className='text-xs text-muted-foreground'>{formatNumber(dashboardStats.users.thisMonth)} this month</p>
              <div
                className={`flex items-center gap-1 text-xs ${dashboardStats.users.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              >
                <TrendingUp className='h-3 w-3' />
                <span>
                  {dashboardStats.users.growth >= 0 ? '+' : ''}
                  {dashboardStats.users.growth.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Users (Period) */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>New Users</CardTitle>
            <UserPlus className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(userAnalytics.newUsers)}</div>
            <p className='text-xs text-muted-foreground mt-1'>{getPeriodLabel()}</p>
          </CardContent>
        </Card>

        {/* Active Users (Period) */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Users</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatNumber(userAnalytics.activeUsers)}</div>
            <p className='text-xs text-muted-foreground mt-1'>{getPeriodLabel()}</p>
          </CardContent>
        </Card>

        {/* Engagement Rate */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Engagement Rate</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {((userAnalytics.activeUsers / dashboardStats.users.total) * 100).toFixed(1)}%
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              {formatNumber(userAnalytics.activeUsers)} of {formatNumber(dashboardStats.users.total)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* User Growth Chart Data */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New vs active users over {period}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {userAnalytics.userGrowth.slice(0, 10).map((point, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>
                      {new Date(point.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: period === 'year' ? 'numeric' : undefined,
                      })}
                    </p>
                    <p className='text-xs text-muted-foreground'>{formatNumber(point.newUsers)} new users</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-bold'>{formatNumber(point.activeUsers)}</p>
                    <p className='text-xs text-muted-foreground'>active</p>
                  </div>
                </div>
              ))}
              {userAnalytics.userGrowth.length === 0 && (
                <div className='flex flex-col items-center justify-center py-8 text-center'>
                  <Users className='h-12 w-12 text-muted-foreground mb-2' />
                  <p className='text-sm text-muted-foreground'>No growth data available for this period</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card>
          <CardHeader>
            <CardTitle>Top Users</CardTitle>
            <CardDescription>Most active users by bookings and spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {userAnalytics.topUsers.slice(0, 10).map((user, index) => (
                <Link href={`/users/${user.userId}`} key={user.userId}>
                  <div className='flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors'>
                    <div className='flex items-center gap-3 flex-1'>
                      <div className='relative'>
                        <Avatar className='h-10 w-10'>
                          <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                        </Avatar>
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
                        <p className='text-sm font-medium truncate'>{user.fullName}</p>
                        <p className='text-xs text-muted-foreground'>{formatNumber(user.totalBookings)} bookings</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-bold'>{formatCurrency(user.totalSpent)}</p>
                      <p className='text-xs text-muted-foreground'>total spent</p>
                    </div>
                  </div>
                </Link>
              ))}
              {userAnalytics.topUsers.length === 0 && (
                <div className='flex flex-col items-center justify-center py-8 text-center'>
                  <Users className='h-12 w-12 text-muted-foreground mb-2' />
                  <p className='text-sm text-muted-foreground'>No user data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
