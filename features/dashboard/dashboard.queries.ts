import { queryOptions } from '@tanstack/react-query';
import {
  getDashboardStats,
  getRevenueReport,
  getBookingAnalytics,
  getUserAnalytics,
  getReviewAnalytics,
  getTotalRevenue,
  getMonthlyRevenue,
  getDailyRevenue,
  getOccupancyRate,
} from './dashboard.api';
import { dashboardKeys } from './dashboard.keys';
import {
  GetRevenueReportQuerySchemaType,
  GetBookingAnalyticsQuerySchemaType,
  GetUserAnalyticsQuerySchemaType,
  GetReviewAnalyticsQuerySchemaType,
} from '@/schemas/dashboard.schema';

// GET DASHBOARD STATS
export function createGetDashboardStatsQueryOptions() {
  return queryOptions({
    queryKey: dashboardKeys.stats(),
    queryFn: () => getDashboardStats(),
  });
}

// GET REVENUE REPORT
export function createGetRevenueReportQueryOptions(params?: GetRevenueReportQuerySchemaType) {
  return queryOptions({
    queryKey: dashboardKeys.revenueReport(params),
    queryFn: () => getRevenueReport(params),
  });
}

// GET BOOKING ANALYTICS
export function createGetBookingAnalyticsQueryOptions(params?: GetBookingAnalyticsQuerySchemaType) {
  return queryOptions({
    queryKey: dashboardKeys.bookingAnalytics(params),
    queryFn: () => getBookingAnalytics(params),
  });
}

// GET USER ANALYTICS
export function createGetUserAnalyticsQueryOptions(params?: GetUserAnalyticsQuerySchemaType) {
  return queryOptions({
    queryKey: dashboardKeys.userAnalytics(params),
    queryFn: () => getUserAnalytics(params),
  });
}

// GET REVIEW ANALYTICS
export function createGetReviewAnalyticsQueryOptions(params?: GetReviewAnalyticsQuerySchemaType) {
  return queryOptions({
    queryKey: dashboardKeys.reviewAnalytics(params),
    queryFn: () => getReviewAnalytics(params),
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
