'use client';

import { createGetDashboardStatsQueryOptions } from '@/features/dashboard/dashboard.queries';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';
import { DashboardStatsCards } from './dashboard-page-components/dashboard-stats-cards';
import { DashboardRevenueSection } from './dashboard-page-components/dashboard-revenue-section';
import { DashboardBookingsSection } from './dashboard-page-components/dashboard-bookings-section';
import { DashboardFleetSection } from './dashboard-page-components/dashboard-fleet-section';
import { DashboardImagesSection } from './dashboard-page-components/dashboard-images-section';
import { DashboardReviewsSection } from './dashboard-page-components/dashboard-reviews-section';

export function DashboardPageContent() {
  const { data: stats, isLoading } = useQuery(createGetDashboardStatsQueryOptions());

  if (isLoading) {
    return (
      <div className='space-y-6'>
        {/* Stats Cards Skeleton */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
          <Skeleton className='h-32' />
        </div>

        {/* Main Grid Skeleton */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-96' />
          <Skeleton className='h-96' />
          <Skeleton className='h-96' />
        </div>

        {/* Additional Sections Skeleton */}
        <div className='grid gap-6 md:grid-cols-2'>
          <Skeleton className='h-80' />
          <Skeleton className='h-80' />
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

  return (
    <div className='space-y-6'>
      {/* Quick Stats Cards */}
      <DashboardStatsCards stats={stats} />

      {/* Main Dashboard Sections */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <DashboardRevenueSection stats={stats} />
        <DashboardBookingsSection stats={stats} />
        <DashboardFleetSection stats={stats} />
      </div>

      {/* Additional Sections */}
      <div className='grid gap-6 md:grid-cols-2'>
        <DashboardImagesSection stats={stats} />
        <DashboardReviewsSection stats={stats} />
      </div>
    </div>
  );
}
