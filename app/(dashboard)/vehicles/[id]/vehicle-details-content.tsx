'use client';

import {
  createGetVehicleByIdQueryOptions,
  createGetVehicleBookingsQueryOptions,
} from '@/features/vehicles/vehicles.queries';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingCard } from '@/components/bookings/booking-card';
import {
  Calendar,
  Car,
  CheckCircle2,
  XCircle,
  DollarSign,
  Gauge,
  Fuel,
  Users,
  Settings,
  TrendingUp,
  ShoppingBag,
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVerticalIcon, Edit } from 'lucide-react';
import { DeleteVehicleDialog } from '@/components/vehicles/delete-vehicle-dialog';
import { ApproveVehicleDialog } from '@/components/vehicles/approve-vehicle-dialog';
import { RejectVehicleDialog } from '@/components/vehicles/reject-vehicle-dialog';
import { UpdateVehicleStatusDialog } from '@/components/vehicles/update-vehicle-status-dialog';
import { UpdateVehiclePriceDialog } from '@/components/vehicles/update-vehicle-price-dialog';

interface VehicleDetailsContentProps {
  carId: number;
}

export function VehicleDetailsContent({ carId }: VehicleDetailsContentProps) {
  const { data: vehicle, isLoading } = useQuery(createGetVehicleByIdQueryOptions({ carId }));
  const { data: bookings, isLoading: isLoadingBookings } = useQuery(createGetVehicleBookingsQueryOptions({ carId }));

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-32 w-32 rounded-lg' />
              <div className='space-y-2 flex-1'>
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-4 w-64' />
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <Car className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Vehicle not found</h3>
          <p className='text-sm text-muted-foreground'>The vehicle you're looking for doesn't exist.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'available' || statusLower === 'approved') return 'success';
    if (statusLower === 'pending') return 'warning';
    if (statusLower === 'rejected') return 'destructive';
    if (statusLower === 'occupied') return 'info';
    return 'secondary';
  };

  const primaryImage = vehicle.images?.find((img) => img.isPrimary) || vehicle.images?.[0];

  return (
    <div className='space-y-6'>
      {/* Vehicle Header Card */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-start gap-4 flex-1'>
              {/* Vehicle Image */}
              <Link href={`/vehicles/${vehicle.id}/edit/images`}>
                <div className='relative h-32 w-32 rounded-lg overflow-hidden bg-muted shrink-0 cursor-pointer transition-opacity hover:opacity-80'>
                  {primaryImage ? (
                    <img
                      src={primaryImage.imageUrl}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <div className='h-full w-full flex items-center justify-center'>
                      <Car className='h-12 w-12 text-muted-foreground' />
                    </div>
                  )}
                  <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity'>
                    <p className='text-white text-xs font-medium'>Manage Images</p>
                  </div>
                </div>
              </Link>

              {/* Vehicle Info */}
              <div className='space-y-3 flex-1'>
                <div>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <h2 className='text-2xl font-bold'>
                      {vehicle.brand} {vehicle.model}
                    </h2>
                    <Badge variant={getStatusVariant(vehicle.status)} className='text-white'>
                      {vehicle.status}
                    </Badge>
                    <Badge variant={vehicle.available ? 'success' : 'destructive'} className='gap-1 text-white'>
                      {vehicle.available ? (
                        <>
                          <CheckCircle2 className='h-3 w-3' />
                          Available
                        </>
                      ) : (
                        <>
                          <XCircle className='h-3 w-3' />
                          Unavailable
                        </>
                      )}
                    </Badge>
                    {vehicle.featured && (
                      <Badge variant='primary' className='text-white'>
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className='text-muted-foreground mt-1'>Year: {vehicle.year}</p>
                </div>

                <div className='flex items-center gap-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <DollarSign className='h-4 w-4 text-muted-foreground' />
                    <span className='font-semibold'>
                      {vehicle.currency} {vehicle.pricePerDay.toFixed(2)}
                    </span>
                    <span className='text-muted-foreground'>/ day</span>
                  </div>
                  {vehicle.averageRating && (
                    <div className='flex items-center gap-1'>
                      <span className='font-semibold'>⭐ {vehicle.averageRating.toFixed(1)}</span>
                      <span className='text-muted-foreground'>({vehicle.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-2'>
              {vehicle.status === 'PENDING' && (
                <>
                  <ApproveVehicleDialog
                    carId={vehicle.id}
                    vehicleName={`${vehicle.brand} ${vehicle.model}`}
                    variant='button'
                  />
                  <RejectVehicleDialog
                    carId={vehicle.id}
                    vehicleName={`${vehicle.brand} ${vehicle.model}`}
                    variant='button'
                  />
                </>
              )}
              <UpdateVehicleStatusDialog
                carId={vehicle.id}
                currentStatus={vehicle.available}
                vehicleName={`${vehicle.brand} ${vehicle.model}`}
              />
              <UpdateVehiclePriceDialog
                carId={vehicle.id}
                currentPrice={vehicle.pricePerDay}
                currency={vehicle.currency}
                vehicleName={`${vehicle.brand} ${vehicle.model}`}
              />
              <Button asChild variant='outline' size='sm'>
                <Link href={`/vehicles/${vehicle.id}/edit`}>
                  <Edit className='h-4 w-4' />
                  Edit
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <EllipsisVerticalIcon className='size-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {vehicle.status === 'PENDING' && (
                    <>
                      <ApproveVehicleDialog carId={vehicle.id} vehicleName={`${vehicle.brand} ${vehicle.model}`} />
                      <RejectVehicleDialog carId={vehicle.id} vehicleName={`${vehicle.brand} ${vehicle.model}`} />
                    </>
                  )}
                  <DeleteVehicleDialog
                    carId={vehicle.id}
                    vehicleName={`${vehicle.brand} ${vehicle.model}`}
                    variant='button'
                    redirectOnSuccess={true}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Vehicle Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Settings className='h-5 w-5' />
              Specifications
            </CardTitle>
            <CardDescription>Technical details and features</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {vehicle.fuelType && (
              <>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Fuel className='h-4 w-4' />
                    <span>Fuel Type</span>
                  </div>
                  <span className='text-sm font-medium'>{vehicle.fuelType}</span>
                </div>
                <Separator />
              </>
            )}
            {vehicle.transmission && (
              <>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Gauge className='h-4 w-4' />
                    <span>Transmission</span>
                  </div>
                  <span className='text-sm font-medium'>{vehicle.transmission}</span>
                </div>
                <Separator />
              </>
            )}
            {vehicle.seatCount && (
              <>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Users className='h-4 w-4' />
                    <span>Seats</span>
                  </div>
                  <span className='text-sm font-medium'>{vehicle.seatCount}</span>
                </div>
                <Separator />
              </>
            )}
            {vehicle.doorCount && (
              <>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Car className='h-4 w-4' />
                    <span>Doors</span>
                  </div>
                  <span className='text-sm font-medium'>{vehicle.doorCount}</span>
                </div>
                <Separator />
              </>
            )}
            {vehicle.carType && (
              <>
                <div className='flex items-center justify-between py-2'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Car className='h-4 w-4' />
                    <span>Type</span>
                  </div>
                  <span className='text-sm font-medium'>{vehicle.carType}</span>
                </div>
                <Separator />
              </>
            )}
            {vehicle.color && (
              <div className='flex items-center justify-between py-2'>
                <span className='text-sm text-muted-foreground'>Color</span>
                <span className='text-sm font-medium'>{vehicle.color}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ShoppingBag className='h-5 w-5' />
              Booking Statistics
            </CardTitle>
            <CardDescription>Vehicle booking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Total Bookings</p>
                  <p className='text-3xl font-bold'>{vehicle.totalBookings}</p>
                </div>
                <div className='rounded-full bg-primary/10 p-3'>
                  <ShoppingBag className='h-6 w-6 text-primary' />
                </div>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Active Bookings</p>
                  <p className='text-3xl font-bold'>{vehicle.activeBookings}</p>
                </div>
                <div className='rounded-full bg-green-500/10 p-3'>
                  <CheckCircle2 className='h-6 w-6 text-green-600 dark:text-green-400' />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              Revenue
            </CardTitle>
            <CardDescription>Financial performance</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Total Revenue</p>
                <p className='text-3xl font-bold'>
                  {vehicle.currency} {vehicle.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className='rounded-full bg-blue-500/10 p-3'>
                <DollarSign className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between py-2'>
                <span className='text-sm text-muted-foreground'>Deposit</span>
                <span className='text-sm font-medium'>
                  {vehicle.currency} {vehicle.deposit.toFixed(2)}
                </span>
              </div>
              {vehicle.discountPercentage > 0 && (
                <>
                  <Separator />
                  <div className='flex items-center justify-between py-2'>
                    <span className='text-sm text-muted-foreground'>Discount</span>
                    <span className='text-sm font-medium'>{vehicle.discountPercentage}%</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Row */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Calendar className='h-5 w-5' />
              System Information
            </CardTitle>
            <CardDescription>Record details</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between py-2'>
              <span className='text-sm text-muted-foreground'>Vehicle ID</span>
              <span className='text-sm font-medium font-mono'>#{vehicle.id}</span>
            </div>
            <Separator />
            <div className='flex items-center justify-between py-2'>
              <span className='text-sm text-muted-foreground'>Created</span>
              <span className='text-sm font-medium'>{format(new Date(vehicle.createdAt), 'MMM dd, yyyy')}</span>
            </div>
            <Separator />
            <div className='flex items-center justify-between py-2'>
              <span className='text-sm text-muted-foreground'>Last Updated</span>
              <span className='text-sm font-medium'>{format(new Date(vehicle.updatedAt), 'MMM dd, yyyy')}</span>
            </div>
            {vehicle.rejectionReason && (
              <>
                <Separator />
                <div className='py-2'>
                  <p className='text-sm text-muted-foreground mb-1'>Rejection Reason</p>
                  <p className='text-sm text-destructive'>{vehicle.rejectionReason}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pricing Details */}
        {(vehicle.pricePerWeek || vehicle.pricePerMonth) && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <DollarSign className='h-5 w-5' />
                Pricing Plans
              </CardTitle>
              <CardDescription>Alternative pricing options</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center justify-between py-2'>
                <span className='text-sm text-muted-foreground'>Per Day</span>
                <span className='text-sm font-medium'>
                  {vehicle.currency} {vehicle.pricePerDay.toFixed(2)}
                </span>
              </div>
              {vehicle.pricePerWeek && (
                <>
                  <Separator />
                  <div className='flex items-center justify-between py-2'>
                    <span className='text-sm text-muted-foreground'>Per Week</span>
                    <span className='text-sm font-medium'>
                      {vehicle.currency} {vehicle.pricePerWeek.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
              {vehicle.pricePerMonth && (
                <>
                  <Separator />
                  <div className='flex items-center justify-between py-2'>
                    <span className='text-sm text-muted-foreground'>Per Month</span>
                    <span className='text-sm font-medium'>
                      {vehicle.currency} {vehicle.pricePerMonth.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Vehicle Bookings Section */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <ShoppingBag className='h-5 w-5' />
            Bookings
          </CardTitle>
          <CardDescription>All bookings for this vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingBookings ? (
            <div className='space-y-4'>
              <Skeleton className='h-40' />
              <Skeleton className='h-40' />
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} showCar={false} />
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <ShoppingBag className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
              <p className='text-sm text-muted-foreground'>No bookings found for this vehicle</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
