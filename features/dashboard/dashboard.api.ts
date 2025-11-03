import { getAuthHeaders } from '@/lib/auth-utils';
import {
  GetDashboardStatsResponseSchema,
  GetDashboardStatsResponseSchemaType,
  GetRevenueStatsQuerySchemaType,
  GetRevenueStatsResponseSchema,
  GetRevenueStatsResponseSchemaType,
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

// GET REVENUE STATS (with date range)
export async function getRevenueStats(
  params: GetRevenueStatsQuerySchemaType
): Promise<GetRevenueStatsResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard/revenue`);
  url.searchParams.append('startDate', params.startDate);
  url.searchParams.append('endDate', params.endDate);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch revenue stats');
    }

    const data = await response.json();
    return GetRevenueStatsResponseSchema.parse(data);
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
