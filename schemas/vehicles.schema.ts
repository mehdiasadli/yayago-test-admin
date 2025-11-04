import z from 'zod';
import { BookingSchema } from './bookings.schema';
import { idSchema } from './common.schema';

// ENUMS
export const TransmissionEnum = z.enum(['MANUAL', 'AUTOMATIC', 'OTHER']);

export const FuelTypeEnum = z.enum(['PETROL', 'DIESEL', 'HYBRID', 'PLUG_IN_HYBRID', 'ELECTRIC']);

export const CurrencyEnum = z.enum(['AED', 'USD', 'AZN', 'EUR', 'RUB', 'GBP']);

export const CarTypeEnum = z.enum([
  'SEDAN',
  'SUV',
  'COUPE',
  'HATCHBACK',
  'CONVERTIBLE',
  'WAGON',
  'VAN',
  'TRUCK',
  'SPORTS_CAR',
  'LUXURY',
  'COMPACT',
  'MINIVAN',
  'CROSSOVER',
  'ROADSTER',
  'LIMOUSINE',
]);

export const FuelPolicyEnum = z.enum([
  'SAME_TO_SAME',
  'PRE_PURCHASE',
  'PAY_FOR_USAGE',
  'QUARTER_TANK',
  'SAME_LEVEL',
  'FREE_TANK',
]);

export const DriveTypeEnum = z.enum(['FRONT', 'REAR', 'ALL', '4X4']);

export const CarStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'AVAILABLE',
  'BLOCKED',
  'INACTIVE',
  'OCCUPIED',
  'DISABLED',
]);

export const ImageStatusEnum = z.enum(['PENDING', 'APPROVED', 'REJECTED']);

// IMAGE SCHEMA
export const ImageSchema = z.object({
  id: idSchema(),
  carId: idSchema('Car ID'),
  imageUrl: z.string(),
  imageName: z.string(),
  imageSize: z.number(),
  mimeType: z.string(),
  isPrimary: z.boolean(),
  uploadDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  status: ImageStatusEnum,
});

// MAIN VEHICLE/CAR SCHEMA
export const VehicleSchema = z.object({
  id: idSchema(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  pricePerDay: z.number(),
  currency: z.string(),
  available: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  totalBookings: z.number(),
  activeBookings: z.number(),
  totalRevenue: z.number(),
  fuelType: z.string().nullish(),
  doorCount: z.number().nullish(),
  seatCount: z.number().nullish(),
  carType: z.string().nullish(),
  engineVolume: z.string().nullish(),
  color: z.string().nullish(),
  transmission: z.string().nullish(),
  featured: z.boolean(),
  deposit: z.number(),
  discountPercentage: z.number(),
  pricePerWeek: z.number().nullable().optional(),
  pricePerMonth: z.number().nullable().optional(),
  minimumRentalDays: z.number().nullable().optional(),
  maxMileagePerDay: z.number().nullable().optional(),
  maxMileagePerWeek: z.number().nullable().optional(),
  maxMileagePerMonth: z.number().nullable().optional(),
  fuelPolicy: FuelPolicyEnum.nullable().optional(),
  minimumAge: z.number().nullable().optional(),
  minimumDrivingExperience: z.number().nullable().optional(),
  driveType: DriveTypeEnum.nullable().optional(),
  horsepower: z.number().nullable().optional(),
  torque: z.number().nullable().optional(),
  maxSpeed: z.number().nullable().optional(),
  freeCancellationPolicy: z.number().nullable().optional(),
  favoritesCount: z.number(),
  isFavorited: z.boolean().nullish(),
  reviewCount: z.number(),
  averageRating: z.number().nullish(),
  status: CarStatusEnum,
  rejectionReason: z.string().nullable().optional(),
  images: ImageSchema.array().optional(),
});

export const VehicleParamSchema = z.object({
  carId: idSchema('Car ID'),
});

// GET VEHICLES (ALL)
export const GetVehiclesQuerySchema = z.object({
  searchTerm: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  available: z.boolean().optional(),
});

export const GetVehiclesResponseSchema = VehicleSchema.array();

// GET VEHICLE BY ID
export const GetVehicleByIdParamSchema = VehicleParamSchema;
export const GetVehicleByIdResponseSchema = VehicleSchema;

// CREATE VEHICLE
export const CreateVehicleRequestSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900, 'Year must be at least 1900').max(2100, 'Year must be at most 2100'),
  pricePerDay: z.number().min(0, 'Price per day must be positive'),
  currency: CurrencyEnum,
  available: z.boolean(),
  fuelType: FuelTypeEnum,
  doorCount: z.number().min(2, 'Door count must be at least 2').max(10, 'Door count must be at most 10'),
  seatCount: z.number().min(1, 'Seat count must be at least 1').max(50, 'Seat count must be at most 50'),
  carType: CarTypeEnum,
  engineVolume: z.string(),
  color: z.string().min(1, 'Color is required'),
  transmission: TransmissionEnum.optional(),
  featured: z.boolean(),
  deposit: z.number().min(0, 'Deposit must be positive'),
  discountPercentage: z
    .number()
    .min(0, 'Discount must be at least 0')
    .max(100, 'Discount must be at most 100')
    .optional(),
  pricePerWeek: z.number().min(0, 'Price per week must be positive').optional(),
  pricePerMonth: z.number().min(0, 'Price per month must be positive').optional(),
  minimumRentalDays: z.number().min(1, 'Minimum rental days must be at least 1').optional(),
  maxMileagePerDay: z.number().min(0, 'Max mileage per day must be positive').optional(),
  maxMileagePerWeek: z.number().min(0, 'Max mileage per week must be positive').optional(),
  maxMileagePerMonth: z.number().min(0, 'Max mileage per month must be positive').optional(),
  fuelPolicy: FuelPolicyEnum.optional(),
  minimumAge: z
    .number()
    .min(18, 'Minimum age must be at least 18')
    .max(100, 'Minimum age must be at most 100')
    .optional(),
  minimumDrivingExperience: z.number().min(0, 'Minimum driving experience must be positive').optional(),
  driveType: DriveTypeEnum.optional(),
  horsepower: z.number().min(0, 'Horsepower must be positive').optional(),
  torque: z.number().min(0, 'Torque must be positive').optional(),
  maxSpeed: z.number().min(0, 'Max speed must be positive').optional(),
  freeCancellationPolicy: z.number().min(0, 'Free cancellation policy must be positive').optional(),
});

export const CreateVehicleResponseSchema = VehicleSchema;

// UPDATE VEHICLE
export const UpdateVehicleParamSchema = VehicleParamSchema;
export const UpdateVehicleRequestSchema = CreateVehicleRequestSchema.partial();
export const UpdateVehicleResponseSchema = VehicleSchema;

// DELETE VEHICLE
export const DeleteVehicleParamSchema = VehicleParamSchema;
export const DeleteVehicleResponseSchema = z.void();

// UPDATE VEHICLE STATUS
export const UpdateVehicleStatusParamSchema = VehicleParamSchema;
export const UpdateVehicleStatusRequestSchema = z.object({
  available: z.boolean(),
  reason: z.string().optional(),
});
export const UpdateVehicleStatusResponseSchema = z.void();

// UPDATE VEHICLE PRICE
export const UpdateVehiclePriceParamSchema = VehicleParamSchema;
export const UpdateVehiclePriceRequestSchema = z.object({
  pricePerDay: z.number(),
  reason: z.string().optional(),
});
export const UpdateVehiclePriceResponseSchema = z.void();

// APPROVE VEHICLE
export const ApproveVehicleParamSchema = VehicleParamSchema;
export const ApproveVehicleResponseSchema = VehicleSchema;

// REJECT VEHICLE
export const RejectVehicleParamSchema = VehicleParamSchema;
export const RejectVehicleQuerySchema = z.object({
  reason: z.string(),
});
export const RejectVehicleResponseSchema = VehicleSchema;

// GET VEHICLE BOOKINGS
export const GetVehicleBookingsParamSchema = VehicleParamSchema;
export const GetVehicleBookingsResponseSchema = BookingSchema.array();

// GET VEHICLE BOOKINGS COUNT
export const GetVehicleBookingsCountParamSchema = VehicleParamSchema;
export const GetVehicleBookingsCountResponseSchema = z.number();

// GET VEHICLE BOOKINGS ACTIVE COUNT
export const GetVehicleBookingsActiveCountParamSchema = VehicleParamSchema;
export const GetVehicleBookingsActiveCountResponseSchema = z.number();

// GET VEHICLE OCCUPANCY RATE
export const GetVehicleOccupancyRateParamSchema = VehicleParamSchema;
export const GetVehicleOccupancyRateResponseSchema = z.number();

// GET VEHICLES BY STATUS
export const GetVehiclesByStatusParamSchema = z.object({
  status: CarStatusEnum,
});
export const GetVehiclesByStatusResponseSchema = VehicleSchema.array();

// GET PENDING VEHICLES
export const GetPendingVehiclesResponseSchema = VehicleSchema.array();

// GET VEHICLES BY REVENUE
export const GetVehiclesByRevenueResponseSchema = VehicleSchema.array();

// GET MOST POPULAR VEHICLES
export const GetMostPopularVehiclesResponseSchema = VehicleSchema.array();

// === TYPES ===

export type ImageSchemaType = z.infer<typeof ImageSchema>;
export type VehicleSchemaType = z.infer<typeof VehicleSchema>;
export type VehicleParamSchemaType = z.infer<typeof VehicleParamSchema>;

export type GetVehiclesQuerySchemaType = z.infer<typeof GetVehiclesQuerySchema>;
export type GetVehiclesResponseSchemaType = z.infer<typeof GetVehiclesResponseSchema>;

export type GetVehicleByIdParamSchemaType = z.infer<typeof GetVehicleByIdParamSchema>;
export type GetVehicleByIdResponseSchemaType = z.infer<typeof GetVehicleByIdResponseSchema>;

export type CreateVehicleRequestSchemaType = z.infer<typeof CreateVehicleRequestSchema>;
export type CreateVehicleResponseSchemaType = z.infer<typeof CreateVehicleResponseSchema>;

export type UpdateVehicleParamSchemaType = z.infer<typeof UpdateVehicleParamSchema>;
export type UpdateVehicleRequestSchemaType = z.infer<typeof UpdateVehicleRequestSchema>;
export type UpdateVehicleResponseSchemaType = z.infer<typeof UpdateVehicleResponseSchema>;

export type DeleteVehicleParamSchemaType = z.infer<typeof DeleteVehicleParamSchema>;
export type DeleteVehicleResponseSchemaType = z.infer<typeof DeleteVehicleResponseSchema>;

export type UpdateVehicleStatusParamSchemaType = z.infer<typeof UpdateVehicleStatusParamSchema>;
export type UpdateVehicleStatusRequestSchemaType = z.infer<typeof UpdateVehicleStatusRequestSchema>;
export type UpdateVehicleStatusResponseSchemaType = z.infer<typeof UpdateVehicleStatusResponseSchema>;

export type UpdateVehiclePriceParamSchemaType = z.infer<typeof UpdateVehiclePriceParamSchema>;
export type UpdateVehiclePriceRequestSchemaType = z.infer<typeof UpdateVehiclePriceRequestSchema>;
export type UpdateVehiclePriceResponseSchemaType = z.infer<typeof UpdateVehiclePriceResponseSchema>;

export type ApproveVehicleParamSchemaType = z.infer<typeof ApproveVehicleParamSchema>;
export type ApproveVehicleResponseSchemaType = z.infer<typeof ApproveVehicleResponseSchema>;

export type RejectVehicleParamSchemaType = z.infer<typeof RejectVehicleParamSchema>;
export type RejectVehicleQuerySchemaType = z.infer<typeof RejectVehicleQuerySchema>;
export type RejectVehicleResponseSchemaType = z.infer<typeof RejectVehicleResponseSchema>;

export type GetVehicleBookingsParamSchemaType = z.infer<typeof GetVehicleBookingsParamSchema>;
export type GetVehicleBookingsResponseSchemaType = z.infer<typeof GetVehicleBookingsResponseSchema>;

export type GetVehicleBookingsCountParamSchemaType = z.infer<typeof GetVehicleBookingsCountParamSchema>;
export type GetVehicleBookingsCountResponseSchemaType = z.infer<typeof GetVehicleBookingsCountResponseSchema>;

export type GetVehicleBookingsActiveCountParamSchemaType = z.infer<typeof GetVehicleBookingsActiveCountParamSchema>;
export type GetVehicleBookingsActiveCountResponseSchemaType = z.infer<
  typeof GetVehicleBookingsActiveCountResponseSchema
>;

export type GetVehicleOccupancyRateParamSchemaType = z.infer<typeof GetVehicleOccupancyRateParamSchema>;
export type GetVehicleOccupancyRateResponseSchemaType = z.infer<typeof GetVehicleOccupancyRateResponseSchema>;

export type GetVehiclesByStatusParamSchemaType = z.infer<typeof GetVehiclesByStatusParamSchema>;
export type GetVehiclesByStatusResponseSchemaType = z.infer<typeof GetVehiclesByStatusResponseSchema>;

export type GetPendingVehiclesResponseSchemaType = z.infer<typeof GetPendingVehiclesResponseSchema>;

export type GetVehiclesByRevenueResponseSchemaType = z.infer<typeof GetVehiclesByRevenueResponseSchema>;

export type GetMostPopularVehiclesResponseSchemaType = z.infer<typeof GetMostPopularVehiclesResponseSchema>;

export type CarStatusEnumType = z.infer<typeof CarStatusEnum>;
