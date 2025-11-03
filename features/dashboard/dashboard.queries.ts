import { queryOptions } from '@tanstack/react-query';
import {
  getDashboardStats,
  getRevenueStats,
  getTotalRevenue,
  getMonthlyRevenue,
  getDailyRevenue,
  getOccupancyRate,
} from './dashboard.api';
import { dashboardKeys } from './dashboard.keys';
import { GetRevenueStatsQuerySchemaType } from '@/schemas/dashboard.schema';

// GET DASHBOARD STATS
export function createGetDashboardStatsQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.stats(),
    queryFn: () => getDashboardStats(),
  });
}

// GET REVENUE STATS
export function createGetRevenueStatsQueryOptions(params: GetRevenueStatsQuerySchemaType) {
  return queryOptions({
    queryKey: dashboardKeys.revenueStats(params),
    queryFn: () => getRevenueStats(params),
  });
}

// GET TOTAL REVENUE
export function createGetTotalRevenueQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.totalRevenue(),
    queryFn: () => getTotalRevenue(),
  });
}

// GET MONTHLY REVENUE
export function createGetMonthlyRevenueQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.monthlyRevenue(),
    queryFn: () => getMonthlyRevenue(),
  });
}

// GET DAILY REVENUE
export function createGetDailyRevenueQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.dailyRevenue(),
    queryFn: () => getDailyRevenue(),
  });
}

// GET OCCUPANCY RATE
export function createGetOccupancyRateQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.occupancyRate(),
    queryFn: () => getOccupancyRate(),
  });
}
