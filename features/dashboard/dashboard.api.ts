import { getAuthHeaders } from '@/lib/auth-utils';
import {
  GetDashboardStatsResponseSchema,
  GetDashboardStatsResponseSchemaType,
  GetRevenueReportQuerySchemaType,
  GetRevenueReportResponseSchema,
  GetRevenueReportResponseSchemaType,
  GetBookingAnalyticsQuerySchemaType,
  GetBookingAnalyticsResponseSchema,
  GetBookingAnalyticsResponseSchemaType,
  GetUserAnalyticsQuerySchemaType,
  GetUserAnalyticsResponseSchema,
  GetUserAnalyticsResponseSchemaType,
  GetReviewAnalyticsQuerySchemaType,
  GetReviewAnalyticsResponseSchema,
  GetReviewAnalyticsResponseSchemaType,
  GetTotalRevenueResponseSchema,
  GetTotalRevenueResponseSchemaType,
  GetMonthlyRevenueResponseSchema,
  GetMonthlyRevenueResponseSchemaType,
  GetDailyRevenueResponseSchema,
  GetDailyRevenueResponseSchemaType,
  GetOccupancyRateResponseSchema,
  GetOccupancyRateResponseSchemaType,
} from '@/schemas/dashboard.schema';
import { z } from 'zod';

// GET DASHBOARD STATS
export async function getDashboardStats(): Promise<GetDashboardStatsResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/stats`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    const data = await response.json();
    return GetDashboardStatsResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET REVENUE REPORT
export async function getRevenueReport(
  params?: GetRevenueReportQuerySchemaType
): Promise<GetRevenueReportResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/revenue`);

  if (params) {
    if (params.period) url.searchParams.append('period', params.period);
    if (params.from) url.searchParams.append('from', params.from);
    if (params.to) url.searchParams.append('to', params.to);
    if (params.groupBy) url.searchParams.append('groupBy', params.groupBy);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch revenue report');
    }

    const data = await response.json();
    return GetRevenueReportResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET BOOKING ANALYTICS
export async function getBookingAnalytics(
  params?: GetBookingAnalyticsQuerySchemaType
): Promise<GetBookingAnalyticsResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/bookings`);

  if (params) {
    if (params.period) url.searchParams.append('period', params.period);
    if (params.from) url.searchParams.append('from', params.from);
    if (params.to) url.searchParams.append('to', params.to);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch booking analytics');
    }

    const data = await response.json();
    return GetBookingAnalyticsResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET USER ANALYTICS
export async function getUserAnalytics(
  params?: GetUserAnalyticsQuerySchemaType
): Promise<GetUserAnalyticsResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/users`);

  if (params) {
    if (params.period) url.searchParams.append('period', params.period);
    if (params.from) url.searchParams.append('from', params.from);
    if (params.to) url.searchParams.append('to', params.to);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user analytics');
    }

    const data = await response.json();
    return GetUserAnalyticsResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET REVIEW ANALYTICS
export async function getReviewAnalytics(
  params?: GetReviewAnalyticsQuerySchemaType
): Promise<GetReviewAnalyticsResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/reviews`);

  if (params) {
    if (params.period) url.searchParams.append('period', params.period);
    if (params.from) url.searchParams.append('from', params.from);
    if (params.to) url.searchParams.append('to', params.to);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch review analytics');
    }

    const data = await response.json();
    return GetReviewAnalyticsResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET TOTAL REVENUE
export async function getTotalRevenue(): Promise<GetTotalRevenueResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/revenue/total`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch total revenue');
    }

    const data = await response.json();
    return GetTotalRevenueResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET MONTHLY REVENUE
export async function getMonthlyRevenue(): Promise<GetMonthlyRevenueResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/revenue/monthly`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch monthly revenue');
    }

    const data = await response.json();
    return GetMonthlyRevenueResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET DAILY REVENUE
export async function getDailyRevenue(): Promise<GetDailyRevenueResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/revenue/daily`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch daily revenue');
    }

    const data = await response.json();
    return GetDailyRevenueResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET OCCUPANCY RATE
export async function getOccupancyRate(): Promise<GetOccupancyRateResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/occupancy-rate`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch occupancy rate');
    }

    const data = await response.json();
    return GetOccupancyRateResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}
