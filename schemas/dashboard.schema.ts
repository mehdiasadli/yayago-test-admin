import z from 'zod';

// COMMON SCHEMAS
const MetricSchema = z.object({
  total: z.number(),
  thisMonth: z.number(),
  lastMonth: z.number(),
  growth: z.number(),
});

const MonetaryMetricSchema = z.object({
  total: z.number(),
  thisMonth: z.number(),
  lastMonth: z.number(),
  growth: z.number(),
});

const BookingMetricsSchema = z.object({
  summary: MetricSchema,
  pending: z.number(),
  confirmed: z.number(),
  cancelled: z.number(),
});

const CarMetricsSchema = z.object({
  summary: MetricSchema,
  approved: z.number(),
  pending: z.number(),
  occupied: z.number(),
  available: z.number(),
});

const RevenueMetricsSchema = z.object({
  summary: MonetaryMetricSchema,
  averagePerBooking: z.number(),
  thisMonthAveragePerBooking: z.number(),
});

const ImageMetricsSchema = z.object({
  summary: MetricSchema,
  approved: z.number(),
  pending: z.number(),
  rejected: z.number(),
});

const ReviewMetricsSchema = z.object({
  summary: MetricSchema,
  averageRating: z.number(),
});

// DASHBOARD STATS SCHEMA (Enhanced)
export const DashboardStatsSchema = z.object({
  users: MetricSchema,
  bookings: BookingMetricsSchema,
  revenue: RevenueMetricsSchema,
  cars: CarMetricsSchema,
  images: ImageMetricsSchema,
  reviews: ReviewMetricsSchema,
});

// REVENUE REPORT SCHEMA
const RevenueGroupSchema = z.object({
  periodStart: z.coerce.date(),
  totalRevenue: z.number(),
  bookingsCount: z.number(),
  averageBookingValue: z.number(),
});

export const AdminRevenueReportSchema = z.object({
  period: z.string(),
  groupBy: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  totalRevenue: z.number(),
  groups: RevenueGroupSchema.array(),
});

// BOOKING ANALYTICS SCHEMA
const BookingsByCarSchema = z.object({
  carId: z.number(),
  carName: z.string(),
  bookings: z.number(),
  revenue: z.number(),
});

export const BookingAnalyticsSchema = z.object({
  period: z.string(),
  totalBookings: z.number(),
  bookingsByStatus: z.record(z.number()),
  bookingsByCar: BookingsByCarSchema.array(),
  popularCars: BookingsByCarSchema.array(),
  averageDuration: z.number(),
});

// USER ANALYTICS SCHEMA
const UserGrowthPointSchema = z.object({
  date: z.coerce.date(),
  newUsers: z.number(),
  activeUsers: z.number(),
});

const TopUserSchema = z.object({
  userId: z.number(),
  fullName: z.string(),
  totalBookings: z.number(),
  totalSpent: z.number(),
});

export const UserAnalyticsSchema = z.object({
  period: z.string(),
  newUsers: z.number(),
  activeUsers: z.number(),
  userGrowth: UserGrowthPointSchema.array(),
  topUsers: TopUserSchema.array(),
});

// REVIEW ANALYTICS SCHEMA
export const ReviewAnalyticsSchema = z.object({
  period: z.string(),
  total: z.number(),
  averageRating: z.number(),
  thisPeriod: z.number(),
  pending: z.number(),
});

// GET DASHBOARD STATS
export const GetDashboardStatsResponseSchema = DashboardStatsSchema;

// GET REVENUE REPORT
export const GetRevenueReportQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year', 'custom']).optional().default('month'),
  from: z.string().optional(), // ISO date
  to: z.string().optional(), // ISO date
  groupBy: z.enum(['day', 'week', 'month']).optional().default('day'),
});
export const GetRevenueReportResponseSchema = AdminRevenueReportSchema;

// GET BOOKING ANALYTICS
export const GetBookingAnalyticsQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year', 'custom']).optional().default('month'),
  from: z.string().optional(), // ISO date
  to: z.string().optional(), // ISO date
});
export const GetBookingAnalyticsResponseSchema = BookingAnalyticsSchema;

// GET USER ANALYTICS
export const GetUserAnalyticsQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year', 'custom']).optional().default('month'),
  from: z.string().optional(), // ISO date
  to: z.string().optional(), // ISO date
});
export const GetUserAnalyticsResponseSchema = UserAnalyticsSchema;

// GET REVIEW ANALYTICS
export const GetReviewAnalyticsQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year', 'custom']).optional().default('month'),
  from: z.string().optional(), // ISO date
  to: z.string().optional(), // ISO date
});
export const GetReviewAnalyticsResponseSchema = ReviewAnalyticsSchema;

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
export type AdminRevenueReportSchemaType = z.infer<typeof AdminRevenueReportSchema>;
export type BookingAnalyticsSchemaType = z.infer<typeof BookingAnalyticsSchema>;
export type UserAnalyticsSchemaType = z.infer<typeof UserAnalyticsSchema>;
export type ReviewAnalyticsSchemaType = z.infer<typeof ReviewAnalyticsSchema>;

export type GetDashboardStatsResponseSchemaType = z.infer<typeof GetDashboardStatsResponseSchema>;

export type GetRevenueReportQuerySchemaType = z.infer<typeof GetRevenueReportQuerySchema>;
export type GetRevenueReportResponseSchemaType = z.infer<typeof GetRevenueReportResponseSchema>;

export type GetBookingAnalyticsQuerySchemaType = z.infer<typeof GetBookingAnalyticsQuerySchema>;
export type GetBookingAnalyticsResponseSchemaType = z.infer<typeof GetBookingAnalyticsResponseSchema>;

export type GetUserAnalyticsQuerySchemaType = z.infer<typeof GetUserAnalyticsQuerySchema>;
export type GetUserAnalyticsResponseSchemaType = z.infer<typeof GetUserAnalyticsResponseSchema>;

export type GetReviewAnalyticsQuerySchemaType = z.infer<typeof GetReviewAnalyticsQuerySchema>;
export type GetReviewAnalyticsResponseSchemaType = z.infer<typeof GetReviewAnalyticsResponseSchema>;

export type GetTotalRevenueResponseSchemaType = z.infer<typeof GetTotalRevenueResponseSchema>;
export type GetMonthlyRevenueResponseSchemaType = z.infer<typeof GetMonthlyRevenueResponseSchema>;
export type GetDailyRevenueResponseSchemaType = z.infer<typeof GetDailyRevenueResponseSchema>;
export type GetOccupancyRateResponseSchemaType = z.infer<typeof GetOccupancyRateResponseSchema>;
