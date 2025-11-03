import z from 'zod';

// DASHBOARD STATS SCHEMA
export const DashboardStatsSchema = z.object({
  totalUsers: z.number(),
  totalCars: z.number(),
  totalBookings: z.number(),
  activeBookings: z.number(),
  availableCars: z.number(),
  occupiedCars: z.number(),
  totalRevenue: z.number(),
  monthlyRevenue: z.number(),
  dailyRevenue: z.number(),
  occupancyRate: z.number(),
  pendingBookings: z.number(),
  confirmedBookings: z.number(),
  cancelledBookings: z.number(),
});

// REVENUE STATS SCHEMA
export const RevenueStatsSchema = z.object({
  date: z.coerce.date(),
  dailyRevenue: z.number(),
  cumulativeRevenue: z.number(),
  bookingsCount: z.number(),
});

// GET DASHBOARD STATS
export const GetDashboardStatsResponseSchema = DashboardStatsSchema;

// GET REVENUE STATS (with date range)
export const GetRevenueStatsQuerySchema = z.object({
  startDate: z.string(), // format: YYYY-MM-DD
  endDate: z.string(), // format: YYYY-MM-DD
});

export const GetRevenueStatsResponseSchema = RevenueStatsSchema.array();

// GET TOTAL REVENUE
export const GetTotalRevenueResponseSchema = z.number();

// GET MONTHLY REVENUE
export const GetMonthlyRevenueResponseSchema = z.number();

// GET DAILY REVENUE
export const GetDailyRevenueResponseSchema = z.number();

// GET OCCUPANCY RATE
export const GetOccupancyRateResponseSchema = z.number();

// === TYPES ===

export type DashboardStatsSchemaType = z.infer<typeof DashboardStatsSchema>;
export type RevenueStatsSchemaType = z.infer<typeof RevenueStatsSchema>;

export type GetDashboardStatsResponseSchemaType = z.infer<typeof GetDashboardStatsResponseSchema>;

export type GetRevenueStatsQuerySchemaType = z.infer<typeof GetRevenueStatsQuerySchema>;
export type GetRevenueStatsResponseSchemaType = z.infer<typeof GetRevenueStatsResponseSchema>;

export type GetTotalRevenueResponseSchemaType = z.infer<typeof GetTotalRevenueResponseSchema>;
export type GetMonthlyRevenueResponseSchemaType = z.infer<typeof GetMonthlyRevenueResponseSchema>;
export type GetDailyRevenueResponseSchemaType = z.infer<typeof GetDailyRevenueResponseSchema>;
export type GetOccupancyRateResponseSchemaType = z.infer<typeof GetOccupancyRateResponseSchema>;
