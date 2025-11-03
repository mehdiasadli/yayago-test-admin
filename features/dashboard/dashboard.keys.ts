import { GetRevenueStatsQuerySchemaType } from '@/schemas/dashboard.schema';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  revenue: () => [...dashboardKeys.all, 'revenue'] as const,
  revenueStats: (params: GetRevenueStatsQuerySchemaType) => [...dashboardKeys.revenue(), 'stats', params] as const,
  totalRevenue: () => [...dashboardKeys.revenue(), 'total'] as const,
  monthlyRevenue: () => [...dashboardKeys.revenue(), 'monthly'] as const,
  dailyRevenue: () => [...dashboardKeys.revenue(), 'daily'] as const,
  occupancyRate: () => [...dashboardKeys.all, 'occupancy-rate'] as const,
};
