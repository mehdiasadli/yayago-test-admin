'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';

export function ProfileContent() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === 'loading') {
    return (
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-20 w-20 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-4 w-64' />
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Skeleton className='h-16 w-full' />
              <Skeleton className='h-16 w-full' />
              <Skeleton className='h-16 w-full' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-10'>
          <User className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Not authenticated</h3>
          <p className='text-sm text-muted-foreground'>Please sign in to view your profile.</p>
        </CardContent>
      </Card>
    );
  }

  const user = session.user;

  return (
    <div className='space-y-6'>
      {/* Profile Header Card */}
      <Card>
        <CardHeader>
          <div className='flex items-start gap-6'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src={user.avatarUrl ?? ''} alt={user.name} />
              <AvatarFallback className='text-2xl'>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className='flex-1 space-y-2'>
              <div className='flex items-center gap-3'>
                <h2 className='text-2xl font-bold'>{user.name}</h2>
                {/* <Badge variant='outline' className='capitalize'>
                  {user.role.toLowerCase()}
                </Badge> */}
              </div>
              <p className='text-muted-foreground'>{user.email}</p>
              {user.phoneNumber && (
                <p className='text-sm text-muted-foreground flex items-center gap-2'>
                  <Phone className='h-4 w-4' />
                  {user.phoneNumber}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Account Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {/* Email */}
            <div className='flex items-start gap-4'>
              <div className='rounded-lg bg-primary/10 p-2'>
                <Mail className='h-5 w-5 text-primary' />
              </div>
              <div className='flex-1'>
                <h3 className='font-medium mb-1'>Email Address</h3>
                <p className='text-sm text-muted-foreground'>{user.email}</p>
              </div>
            </div>

            <Separator />

            {/* Phone Number */}
            {user.phoneNumber && (
              <>
                <div className='flex items-start gap-4'>
                  <div className='rounded-lg bg-primary/10 p-2'>
                    <Phone className='h-5 w-5 text-primary' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium mb-1'>Phone Number</h3>
                    <p className='text-sm text-muted-foreground'>{user.phoneNumber}</p>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Role */}
            {/* <div className='flex items-start gap-4'>
              <div className='rounded-lg bg-primary/10 p-2'>
                <Shield className='h-5 w-5 text-primary' />
              </div>
              <div className='flex-1'>
                <h3 className='font-medium mb-1'>Role</h3>
                <div className='flex items-center gap-2'>
                  <p className='text-sm text-muted-foreground capitalize'>{user.role.toLowerCase()}</p>
                  <Badge variant='secondary' className='capitalize'>
                    {user.role.toLowerCase()}
                  </Badge>
                </div>
              </div>
            </div> */}

            {/* <Separator /> */}

            {/* Account Created */}
            <div className='flex items-start gap-4'>
              <div className='rounded-lg bg-primary/10 p-2'>
                <Calendar className='h-5 w-5 text-primary' />
              </div>
              <div className='flex-1'>
                <h3 className='font-medium mb-1'>Member Since</h3>
                <p className='text-sm text-muted-foreground'>{format(new Date(user.createdAt), 'MMMM d, yyyy')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Stats</CardTitle>
          <CardDescription>Your activity on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-lg border p-4'>
              <div className='text-2xl font-bold'>Admin</div>
              <p className='text-xs text-muted-foreground'>Access Level</p>
            </div>
            <div className='rounded-lg border p-4'>
              <div className='text-2xl font-bold'>{format(new Date(user.createdAt), 'yyyy')}</div>
              <p className='text-xs text-muted-foreground'>Year Joined</p>
            </div>
            <div className='rounded-lg border p-4'>
              <div className='text-2xl font-bold'>Active</div>
              <p className='text-xs text-muted-foreground'>Account Status</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
