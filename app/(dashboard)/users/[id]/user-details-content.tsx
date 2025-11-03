'use client';

import { createGetUserByIdQueryOptions, createGetUserBookingsQueryOptions } from '@/features/users/users.queries';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { SetUserStatusDialog } from '@/components/users/set-user-status-dialog';
import { DeleteUserDialog } from '@/components/users/delete-user-dialog';
import { BookingCard } from '@/components/bookings/booking-card';
import { Calendar, Mail, Phone, User, CalendarClock, Car, CheckCircle2, XCircle, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';

interface UserDetailsContentProps {
  userId: number;
}

export function UserDetailsContent({ userId }: UserDetailsContentProps) {
  const { data: user, isLoading } = useQuery(createGetUserByIdQueryOptions({ userId }));
  const { data: bookings, isLoading: isLoadingBookings } = useQuery(createGetUserBookingsQueryOptions({ userId }));

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-20 w-20 rounded-full' />
              <div className='space-y-2 flex-1'>
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-4 w-64' />
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className='grid gap-6 md:grid-cols-2'>
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <User className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>User not found</h3>
          <p className='text-sm text-muted-foreground'>The user you're looking for doesn't exist.</p>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className='space-y-6'>
      {/* User Header Card */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-20 w-20'>
                <AvatarImage src={user.avatarUrl || undefined} alt={user.fullName} />
                <AvatarFallback className='text-lg'>{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <h2 className='text-2xl font-bold'>{user.fullName}</h2>
                  <Badge variant={user.active ? 'success' : 'destructive'} className='gap-1 text-white'>
                    {user.active ? (
                      <>
                        <CheckCircle2 className='h-3 w-3' />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className='h-3 w-3' />
                        Inactive
                      </>
                    )}
                  </Badge>
                </div>
                <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4' />
                    {user.email}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4' />
                    {user.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <SetUserStatusDialog userId={user.id} initialStatus={user.active} />
              <DeleteUserDialog userId={user.id} userName={user.fullName} variant='icon' />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* User Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              User Information
            </CardTitle>
            <CardDescription>Personal details and account information</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between py-2'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  <span>Joined</span>
                </div>
                <span className='text-sm font-medium'>{format(new Date(user.createdAt), 'MMM dd, yyyy')}</span>
              </div>
              <Separator />
              <div className='flex items-center justify-between py-2'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <CalendarClock className='h-4 w-4' />
                  <span>Last Login</span>
                </div>
                <span className='text-sm font-medium'>
                  {user.lastLoginAt ? format(new Date(user.lastLoginAt), 'MMM dd, yyyy HH:mm') : 'Never'}
                </span>
              </div>
              <Separator />
              <div className='flex items-center justify-between py-2'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <User className='h-4 w-4' />
                  <span>User ID</span>
                </div>
                <span className='text-sm font-medium font-mono'>#{user.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ShoppingBag className='h-5 w-5' />
              Booking Statistics
            </CardTitle>
            <CardDescription>User's booking activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Total Bookings</p>
                  <p className='text-3xl font-bold'>{user.totalBookings}</p>
                </div>
                <div className='rounded-full bg-primary/10 p-3'>
                  <Car className='h-6 w-6 text-primary' />
                </div>
              </div>
              <div className='flex items-center justify-between rounded-lg border p-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Active Bookings</p>
                  <p className='text-3xl font-bold'>{user.activeBookings}</p>
                </div>
                <div className='rounded-full bg-green-500/10 p-3'>
                  <CheckCircle2 className='h-6 w-6 text-green-600 dark:text-green-400' />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Bookings Section */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Car className='h-5 w-5' />
            Bookings
          </CardTitle>
          <CardDescription>All bookings made by this user</CardDescription>
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
                <BookingCard key={booking.id} booking={booking} showUser={false} />
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <Car className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
              <p className='text-sm text-muted-foreground'>No bookings found for this user</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
