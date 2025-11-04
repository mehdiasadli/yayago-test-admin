'use client';

import { createGetVehicleByIdQueryOptions } from '@/features/vehicles/vehicles.queries';
import { useQuery } from '@tanstack/react-query';
import VehicleDetailsReviewsSection from './vehicle-details-components/vehicle-details-reviews-section';
import VehicleDetailsPricing from './vehicle-details-components/vehicle-details-pricing';
import VehicleDetailsSystemInfo from './vehicle-details-components/vehicle-details-system-info';
import VehicleDetailsRevenue from './vehicle-details-components/vehicle-details-revenue';
import VehicleDetailsBookingStats from './vehicle-details-components/vehicle-details-booking-stats';
import VehicleDetailsSpecs from './vehicle-details-components/vehicle-details-specs';
import VehicleDetailsHeader from './vehicle-details-components/vehicle-details-header';
import { VehicleDetailsLoading } from './vehicle-details-components/vehicle-details-loading';
import { VehicleDetailsNotFound } from './vehicle-details-components/vehicle-details-not-found';
import { VehicleDetailsBookingsSection } from './vehicle-details-components/vehicle-details-bookings-section';

interface VehicleDetailsContentProps {
  carId: number;
}

export function VehicleDetailsContent({ carId }: VehicleDetailsContentProps) {
  const { data: vehicle, isLoading } = useQuery(createGetVehicleByIdQueryOptions({ carId }));

  if (isLoading) {
    return <VehicleDetailsLoading />;
  }

  if (!vehicle) {
    return <VehicleDetailsNotFound />;
  }

  return (
    <div className='space-y-6'>
      {/* Vehicle Header Card */}
      <VehicleDetailsHeader vehicle={vehicle} />

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Vehicle Specifications */}
        <VehicleDetailsSpecs vehicle={vehicle} />

        {/* Booking Statistics */}
        <VehicleDetailsBookingStats vehicle={vehicle} />

        {/* Revenue Information */}
        <VehicleDetailsRevenue vehicle={vehicle} />
      </div>

      {/* Additional Info Row */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* System Information */}
        <VehicleDetailsSystemInfo vehicle={vehicle} />

        {/* Pricing Details */}
        <VehicleDetailsPricing vehicle={vehicle} />
      </div>

      {/* Vehicle Bookings Section */}
      <VehicleDetailsBookingsSection carId={carId} />

      {/* Vehicle Reviews Section */}
      <VehicleDetailsReviewsSection carId={carId} averageRating={vehicle.averageRating} />
    </div>
  );
}
