import {
  GetRevenueReportQuerySchemaType,
  GetBookingAnalyticsQuerySchemaType,
  GetUserAnalyticsQuerySchemaType,
  GetReviewAnalyticsQuerySchemaType,
} from '@/schemas/dashboard.schema';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  revenue: () => [...dashboardKeys.all, 'revenue'] as const,
  revenueReport: (params?: GetRevenueReportQuerySchemaType) => [...dashboardKeys.revenue(), 'report', params] as const,
  totalRevenue: () => [...dashboardKeys.revenue(), 'total'] as const,
  monthlyRevenue: () => [...dashboardKeys.revenue(), 'monthly'] as const,
  dailyRevenue: () => [...dashboardKeys.revenue(), 'daily'] as const,
  occupancyRate: () => [...dashboardKeys.all, 'occupancy-rate'] as const,
  bookingAnalytics: (params?: GetBookingAnalyticsQuerySchemaType) =>
    [...dashboardKeys.all, 'bookings', params] as const,
  userAnalytics: (params?: GetUserAnalyticsQuerySchemaType) => [...dashboardKeys.all, 'users', params] as const,
  reviewAnalytics: (params?: GetReviewAnalyticsQuerySchemaType) => [...dashboardKeys.all, 'reviews', params] as const,
};
