'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateVehicleRequestSchema,
  UpdateVehicleRequestSchemaType,
  VehicleSchemaType,
} from '@/schemas/vehicles.schema';
import { Loader2, Car, DollarSign, Settings, FileText, Gauge } from 'lucide-react';
import { useUpdateVehicleMutation } from '@/features/vehicles/vehicles.mutations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const transmissionOptions = [
  { value: 'MANUAL', label: 'Manual' },
  { value: 'AUTOMATIC', label: 'Automatic' },
  { value: 'OTHER', label: 'Other' },
];

const fuelTypeOptions = [
  { value: 'PETROL', label: 'Petrol' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'PLUG_IN_HYBRID', label: 'Plug-in Hybrid' },
  { value: 'ELECTRIC', label: 'Electric' },
];

const currencyOptions = [
  { value: 'AED', label: 'AED - UAE Dirham' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'AZN', label: 'AZN - Azerbaijani Manat' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'RUB', label: 'RUB - Russian Ruble' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

const carTypeOptions = [
  { value: 'SEDAN', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'COUPE', label: 'Coupe' },
  { value: 'HATCHBACK', label: 'Hatchback' },
  { value: 'CONVERTIBLE', label: 'Convertible' },
  { value: 'WAGON', label: 'Wagon' },
  { value: 'VAN', label: 'Van' },
  { value: 'TRUCK', label: 'Truck' },
  { value: 'SPORTS_CAR', label: 'Sports Car' },
  { value: 'LUXURY', label: 'Luxury' },
  { value: 'COMPACT', label: 'Compact' },
  { value: 'MINIVAN', label: 'Minivan' },
  { value: 'CROSSOVER', label: 'Crossover' },
  { value: 'ROADSTER', label: 'Roadster' },
  { value: 'LIMOUSINE', label: 'Limousine' },
];

const driveTypeOptions = [
  { value: 'FRONT', label: 'Front-Wheel Drive (FWD)' },
  { value: 'REAR', label: 'Rear-Wheel Drive (RWD)' },
  { value: 'ALL', label: 'All-Wheel Drive (AWD)' },
  { value: '4X4', label: '4x4 / Four-Wheel Drive' },
];

const fuelPolicyOptions = [
  { value: 'SAME_TO_SAME', label: 'Same to Same' },
  { value: 'PRE_PURCHASE', label: 'Pre-Purchase' },
  { value: 'PAY_FOR_USAGE', label: 'Pay for Usage' },
  { value: 'QUARTER_TANK', label: 'Quarter Tank' },
  { value: 'SAME_LEVEL', label: 'Same Level' },
  { value: 'FREE_TANK', label: 'Free Tank' },
];

interface EditVehicleFormProps extends React.ComponentProps<'form'> {
  vehicle: VehicleSchemaType;
}

export function EditVehicleForm({ vehicle, className, ...props }: EditVehicleFormProps) {
  const router = useRouter();
  const updateVehicleMutation = useUpdateVehicleMutation();

  const form = useForm<UpdateVehicleRequestSchemaType>({
    resolver: zodResolver(UpdateVehicleRequestSchema),
    defaultValues: {
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      pricePerDay: vehicle.pricePerDay,
      currency: vehicle.currency as 'AED' | 'USD' | 'AZN' | 'EUR' | 'RUB' | 'GBP',
      available: vehicle.status === 'AVAILABLE',
      fuelType: (vehicle.fuelType as 'PETROL' | 'DIESEL' | 'HYBRID' | 'PLUG_IN_HYBRID' | 'ELECTRIC') || undefined,
      doorCount: vehicle.doorCount || undefined,
      seatCount: vehicle.seatCount || undefined,
      carType:
        (vehicle.carType as
          | 'SEDAN'
          | 'SUV'
          | 'COUPE'
          | 'HATCHBACK'
          | 'CONVERTIBLE'
          | 'WAGON'
          | 'VAN'
          | 'TRUCK'
          | 'SPORTS_CAR'
          | 'LUXURY'
          | 'COMPACT'
          | 'MINIVAN'
          | 'CROSSOVER'
          | 'ROADSTER'
          | 'LIMOUSINE') || undefined,
      engineVolume: vehicle.engineVolume || undefined,
      color: vehicle.color || undefined,
      transmission: (vehicle.transmission as 'MANUAL' | 'AUTOMATIC' | 'OTHER') || undefined,
      featured: vehicle.featured,
      deposit: vehicle.deposit,
      discountPercentage: vehicle.discountPercentage,
      pricePerWeek: vehicle.pricePerWeek || undefined,
      pricePerMonth: vehicle.pricePerMonth || undefined,
      minimumRentalDays: vehicle.minimumRentalDays || undefined,
      maxMileagePerDay: vehicle.maxMileagePerDay || undefined,
      maxMileagePerWeek: vehicle.maxMileagePerWeek || undefined,
      maxMileagePerMonth: vehicle.maxMileagePerMonth || undefined,
      fuelPolicy:
        (vehicle.fuelPolicy as
          | 'SAME_TO_SAME'
          | 'PRE_PURCHASE'
          | 'PAY_FOR_USAGE'
          | 'QUARTER_TANK'
          | 'SAME_LEVEL'
          | 'FREE_TANK') || undefined,
      minimumAge: vehicle.minimumAge || undefined,
      minimumDrivingExperience: vehicle.minimumDrivingExperience || undefined,
      driveType: (vehicle.driveType as 'FRONT' | 'REAR' | 'ALL' | '4X4') || undefined,
      horsepower: vehicle.horsepower || undefined,
      torque: vehicle.torque || undefined,
      maxSpeed: vehicle.maxSpeed || undefined,
      freeCancellationPolicy: vehicle.freeCancellationPolicy || undefined,
    },
  });

  const onSubmit = async (data: UpdateVehicleRequestSchemaType) => {
    try {
      await updateVehicleMutation.mutateAsync({
        params: { carId: vehicle.id },
        body: data,
      });
      toast.success('Vehicle updated successfully!');
      router.push(`/vehicles/${vehicle.id}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update vehicle';
      toast.error(errorMessage);
    }
  };

  return (
    <form className={cn('flex flex-col gap-8', className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
      {/* Basic Information */}
      <FieldSet className='rounded-lg border bg-card p-6'>
        <FieldLegend className='flex items-center gap-2'>
          <Car className='size-5' />
          Basic Information
        </FieldLegend>
        <FieldGroup>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <Controller
              control={form.control}
              name='brand'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Brand</FieldLabel>
                  <Input id={field.name} placeholder='e.g., Toyota, BMW, Tesla' {...field} value={field.value || ''} />
                  <FieldError
                    errors={
                      form.formState.errors.brand ? [{ message: form.formState.errors.brand.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='model'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Model</FieldLabel>
                  <Input id={field.name} placeholder='e.g., Camry, X5, Model 3' {...field} value={field.value || ''} />
                  <FieldError
                    errors={
                      form.formState.errors.model ? [{ message: form.formState.errors.model.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='year'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Year</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='2024'
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={form.formState.errors.year ? [{ message: form.formState.errors.year.message }] : undefined}
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='carType'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Car Type</FieldLabel>
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder='Select car type' />
                    </SelectTrigger>
                    <SelectContent>
                      {carTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.carType ? [{ message: form.formState.errors.carType.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='color'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                  <Input id={field.name} placeholder='e.g., Black, White, Red' {...field} value={field.value || ''} />
                  <FieldError
                    errors={
                      form.formState.errors.color ? [{ message: form.formState.errors.color.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='engineVolume'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Engine Volume</FieldLabel>
                  <Input id={field.name} placeholder='e.g., 2.0L, 3.5L' {...field} value={field.value || ''} />
                  <FieldError
                    errors={
                      form.formState.errors.engineVolume
                        ? [{ message: form.formState.errors.engineVolume.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>

      {/* Engine & Performance - Same structure as create form */}
      <FieldSet className='rounded-lg border bg-card p-6'>
        <FieldLegend className='flex items-center gap-2'>
          <Gauge className='size-5' />
          Engine & Performance
        </FieldLegend>
        <FieldGroup>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <Controller
              control={form.control}
              name='fuelType'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Fuel Type</FieldLabel>
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder='Select fuel type' />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.fuelType ? [{ message: form.formState.errors.fuelType.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='transmission'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Transmission</FieldLabel>
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder='Select transmission' />
                    </SelectTrigger>
                    <SelectContent>
                      {transmissionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.transmission
                        ? [{ message: form.formState.errors.transmission.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='driveType'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Drive Type</FieldLabel>
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder='Select drive type' />
                    </SelectTrigger>
                    <SelectContent>
                      {driveTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.driveType
                        ? [{ message: form.formState.errors.driveType.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='horsepower'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Horsepower (HP)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='e.g., 250'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.horsepower
                        ? [{ message: form.formState.errors.horsepower.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='torque'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Torque (Nm)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='e.g., 400'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.torque ? [{ message: form.formState.errors.torque.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='maxSpeed'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Max Speed (km/h)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='e.g., 250'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.maxSpeed ? [{ message: form.formState.errors.maxSpeed.message }] : undefined
                    }
                  />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>

      {/* Capacity & Features */}
      <FieldSet className='rounded-lg border bg-card p-6'>
        <FieldLegend className='flex items-center gap-2'>
          <Settings className='size-5' />
          Capacity & Features
        </FieldLegend>
        <FieldGroup>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <Controller
              control={form.control}
              name='seatCount'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Seat Count</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='5'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.seatCount
                        ? [{ message: form.formState.errors.seatCount.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='doorCount'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Door Count</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='4'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.doorCount
                        ? [{ message: form.formState.errors.doorCount.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='available'
              render={({ field }) => (
                <Field orientation='horizontal'>
                  <FieldLabel htmlFor={field.name}>Available for Rent</FieldLabel>
                  <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                  <FieldDescription>Toggle vehicle availability for rental</FieldDescription>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='featured'
              render={({ field }) => (
                <Field orientation='horizontal'>
                  <FieldLabel htmlFor={field.name}>Featured Vehicle</FieldLabel>
                  <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                  <FieldDescription>Show this vehicle prominently</FieldDescription>
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>

      {/* Pricing */}
      <FieldSet className='rounded-lg border bg-card p-6'>
        <FieldLegend className='flex items-center gap-2'>
          <DollarSign className='size-5' />
          Pricing & Deposit
        </FieldLegend>
        <FieldGroup>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <Controller
              control={form.control}
              name='currency'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder='Select currency' />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.currency ? [{ message: form.formState.errors.currency.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='pricePerDay'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Price Per Day</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='100'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.pricePerDay
                        ? [{ message: form.formState.errors.pricePerDay.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='pricePerWeek'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Price Per Week</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='600'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.pricePerWeek
                        ? [{ message: form.formState.errors.pricePerWeek.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='pricePerMonth'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Price Per Month</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='2000'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.pricePerMonth
                        ? [{ message: form.formState.errors.pricePerMonth.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='deposit'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Deposit</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='500'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.deposit ? [{ message: form.formState.errors.deposit.message }] : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='discountPercentage'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Discount (%)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='10'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.discountPercentage
                        ? [{ message: form.formState.errors.discountPercentage.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>

      {/* Rental Policies */}
      <FieldSet className='rounded-lg border bg-card p-6'>
        <FieldLegend className='flex items-center gap-2'>
          <FileText className='size-5' />
          Rental Policies & Requirements
        </FieldLegend>
        <FieldGroup>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <Controller
              control={form.control}
              name='minimumRentalDays'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Minimum Rental Days</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='1'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.minimumRentalDays
                        ? [{ message: form.formState.errors.minimumRentalDays.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='minimumAge'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Minimum Age</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='21'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.minimumAge
                        ? [{ message: form.formState.errors.minimumAge.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='minimumDrivingExperience'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Min. Driving Experience (years)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='2'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.minimumDrivingExperience
                        ? [{ message: form.formState.errors.minimumDrivingExperience.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='fuelPolicy'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Fuel Policy</FieldLabel>
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder='Select fuel policy' />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelPolicyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.fuelPolicy
                        ? [{ message: form.formState.errors.fuelPolicy.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='freeCancellationPolicy'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Free Cancellation (hours)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='24'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldDescription>Hours before pickup for free cancellation</FieldDescription>
                  <FieldError
                    errors={
                      form.formState.errors.freeCancellationPolicy
                        ? [{ message: form.formState.errors.freeCancellationPolicy.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>

      {/* Mileage Limits */}
      <FieldSet className='rounded-lg border bg-card p-6'>
        <FieldLegend>Mileage Limits</FieldLegend>
        <FieldDescription>Optional mileage restrictions for the vehicle</FieldDescription>
        <FieldGroup>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <Controller
              control={form.control}
              name='maxMileagePerDay'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Max Mileage Per Day (km)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='200'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.maxMileagePerDay
                        ? [{ message: form.formState.errors.maxMileagePerDay.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='maxMileagePerWeek'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Max Mileage Per Week (km)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='1000'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.maxMileagePerWeek
                        ? [{ message: form.formState.errors.maxMileagePerWeek.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='maxMileagePerMonth'
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Max Mileage Per Month (km)</FieldLabel>
                  <Input
                    id={field.name}
                    type='number'
                    placeholder='3000'
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <FieldError
                    errors={
                      form.formState.errors.maxMileagePerMonth
                        ? [{ message: form.formState.errors.maxMileagePerMonth.message }]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>

      {/* Submit Button */}
      <div className='flex items-center justify-end gap-4'>
        <Button type='button' variant='outline' onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className='size-4 animate-spin' />
              Updating Vehicle...
            </>
          ) : (
            'Update Vehicle'
          )}
        </Button>
      </div>
    </form>
  );
}
