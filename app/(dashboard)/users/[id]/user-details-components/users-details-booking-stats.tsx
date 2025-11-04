import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserSchemaType } from '@/schemas/users.schema';
import { Car, CheckCircle2, ShoppingBag } from 'lucide-react';

interface UsersDetailsBookingStatsProps {
  user: UserSchemaType;
}

export function UsersDetailsBookingStats({ user }: UsersDetailsBookingStatsProps) {
  return (
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
  );
}
