import { getAuthHeaders } from '@/lib/auth-utils';
import {
  ApproveVehicleParamSchemaType,
  ApproveVehicleResponseSchema,
  ApproveVehicleResponseSchemaType,
  CreateVehicleRequestSchemaType,
  CreateVehicleResponseSchema,
  CreateVehicleResponseSchemaType,
  DeleteVehicleParamSchemaType,
  DeleteVehicleResponseSchemaType,
  GetMostPopularVehiclesResponseSchema,
  GetMostPopularVehiclesResponseSchemaType,
  GetPendingVehiclesResponseSchema,
  GetPendingVehiclesResponseSchemaType,
  GetVehicleBookingsActiveCountParamSchemaType,
  GetVehicleBookingsActiveCountResponseSchema,
  GetVehicleBookingsActiveCountResponseSchemaType,
  GetVehicleBookingsCountParamSchemaType,
  GetVehicleBookingsCountResponseSchema,
  GetVehicleBookingsCountResponseSchemaType,
  GetVehicleBookingsParamSchemaType,
  GetVehicleBookingsResponseSchema,
  GetVehicleBookingsResponseSchemaType,
  GetVehicleByIdParamSchemaType,
  GetVehicleByIdResponseSchema,
  GetVehicleByIdResponseSchemaType,
  GetVehicleOccupancyRateParamSchemaType,
  GetVehicleOccupancyRateResponseSchema,
  GetVehicleOccupancyRateResponseSchemaType,
  GetVehiclesByRevenueResponseSchema,
  GetVehiclesByRevenueResponseSchemaType,
  GetVehiclesByStatusParamSchemaType,
  GetVehiclesByStatusResponseSchema,
  GetVehiclesByStatusResponseSchemaType,
  GetVehiclesQuerySchemaType,
  GetVehiclesResponseSchema,
  GetVehiclesResponseSchemaType,
  RejectVehicleParamSchemaType,
  RejectVehicleQuerySchemaType,
  RejectVehicleResponseSchema,
  RejectVehicleResponseSchemaType,
  UpdateVehicleParamSchemaType,
  UpdateVehiclePriceParamSchemaType,
  UpdateVehiclePriceRequestSchemaType,
  UpdateVehiclePriceResponseSchemaType,
  UpdateVehicleRequestSchemaType,
  UpdateVehicleResponseSchema,
  UpdateVehicleResponseSchemaType,
  UpdateVehicleStatusParamSchemaType,
  UpdateVehicleStatusRequestSchemaType,
  UpdateVehicleStatusResponseSchemaType,
} from '@/schemas/vehicles.schema';
import { z } from 'zod';

// GET ALL VEHICLES
export async function getVehicles(params?: GetVehiclesQuerySchemaType): Promise<GetVehiclesResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }

    const data = await response.json();
    return GetVehiclesResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET VEHICLE BY ID
export async function getVehicleById(params: GetVehicleByIdParamSchemaType): Promise<GetVehicleByIdResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle');
    }

    const data = await response.json();
    return GetVehicleByIdResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// CREATE VEHICLE
export async function createVehicle(body: CreateVehicleRequestSchemaType): Promise<CreateVehicleResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to create vehicle');
    }

    const data = await response.json();
    return CreateVehicleResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// UPDATE VEHICLE
export async function updateVehicle(
  params: UpdateVehicleParamSchemaType,
  body: UpdateVehicleRequestSchemaType
): Promise<UpdateVehicleResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update vehicle');
    }

    const data = await response.json();
    return UpdateVehicleResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// DELETE VEHICLE
export async function deleteVehicle(params: DeleteVehicleParamSchemaType): Promise<DeleteVehicleResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete vehicle');
    }
  } catch (error) {
    throw error;
  }
}

// UPDATE VEHICLE STATUS
export async function updateVehicleStatus(
  params: UpdateVehicleStatusParamSchemaType,
  body: UpdateVehicleStatusRequestSchemaType
): Promise<UpdateVehicleStatusResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/status`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update vehicle status');
    }
  } catch (error) {
    throw error;
  }
}

// UPDATE VEHICLE PRICE
export async function updateVehiclePrice(
  params: UpdateVehiclePriceParamSchemaType,
  body: UpdateVehiclePriceRequestSchemaType
): Promise<UpdateVehiclePriceResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/price`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update vehicle price');
    }
  } catch (error) {
    throw error;
  }
}

// APPROVE VEHICLE
export async function approveVehicle(params: ApproveVehicleParamSchemaType): Promise<ApproveVehicleResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/approve`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to approve vehicle');
    }

    const data = await response.json();
    return ApproveVehicleResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// REJECT VEHICLE
export async function rejectVehicle(
  params: RejectVehicleParamSchemaType,
  query: RejectVehicleQuerySchemaType
): Promise<RejectVehicleResponseSchemaType> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/reject`);
  url.searchParams.append('reason', query.reason);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to reject vehicle');
    }

    const data = await response.json();
    return RejectVehicleResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET VEHICLE BOOKINGS
export async function getVehicleBookings(
  params: GetVehicleBookingsParamSchemaType
): Promise<GetVehicleBookingsResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/bookings`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle bookings');
    }

    const data = await response.json();
    return GetVehicleBookingsResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET VEHICLE BOOKINGS COUNT
export async function getVehicleBookingsCount(
  params: GetVehicleBookingsCountParamSchemaType
): Promise<GetVehicleBookingsCountResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/bookings/count`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle bookings count');
    }

    const data = await response.json();
    return GetVehicleBookingsCountResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET VEHICLE BOOKINGS ACTIVE COUNT
export async function getVehicleBookingsActiveCount(
  params: GetVehicleBookingsActiveCountParamSchemaType
): Promise<GetVehicleBookingsActiveCountResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/bookings/active-count`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle active bookings count');
    }

    const data = await response.json();
    return GetVehicleBookingsActiveCountResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET VEHICLE OCCUPANCY RATE
export async function getVehicleOccupancyRate(
  params: GetVehicleOccupancyRateParamSchemaType
): Promise<GetVehicleOccupancyRateResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${params.carId}/occupancy-rate`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle occupancy rate');
    }

    const data = await response.json();
    return GetVehicleOccupancyRateResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET VEHICLES BY STATUS
export async function getVehiclesByStatus(
  params: GetVehiclesByStatusParamSchemaType
): Promise<GetVehiclesByStatusResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/status/${params.status}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicles by status');
    }

    const data = await response.json();
    return GetVehiclesByStatusResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET PENDING VEHICLES
export async function getPendingVehicles(): Promise<GetPendingVehiclesResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/pending`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pending vehicles');
    }

    const data = await response.json();
    return GetPendingVehiclesResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET VEHICLES BY REVENUE
export async function getVehiclesByRevenue(): Promise<GetVehiclesByRevenueResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/analytics/revenue`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicles by revenue');
    }

    const data = await response.json();
    return GetVehiclesByRevenueResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}

// GET MOST POPULAR VEHICLES
export async function getMostPopularVehicles(): Promise<GetMostPopularVehiclesResponseSchemaType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/analytics/popular`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch most popular vehicles');
    }

    const data = await response.json();
    return GetMostPopularVehiclesResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    throw error;
  }
}
