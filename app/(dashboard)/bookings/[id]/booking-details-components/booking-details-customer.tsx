import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookingSchemaType } from '@/schemas/bookings.schema';
import { User, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface BookingDetailsCustomerProps {
  booking: BookingSchemaType;
}

export default function BookingDetailsCustomer({ booking }: BookingDetailsCustomerProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Customer
        </CardTitle>
        <CardDescription>Booking customer information</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center gap-3'>
          <Avatar className='h-16 w-16'>
            <AvatarFallback className='bg-primary/10 text-primary text-lg font-semibold'>
              {getInitials(booking.userFullName)}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <h3 className='font-semibold text-lg'>{booking.userFullName}</h3>
            <p className='text-sm text-muted-foreground'>Customer ID: #{booking.userId}</p>
          </div>
        </div>
        <Separator />
        <div className='space-y-3'>
          <div className='flex items-center justify-between py-2'>
            <span className='text-sm text-muted-foreground'>User ID</span>
            <span className='text-sm font-medium font-mono'>#{booking.userId}</span>
          </div>
          <Separator />
          <div className='pt-2'>
            <Button asChild variant='outline' size='sm' className='w-full'>
              <Link href={`/users/${booking.userId}`}>
                <ExternalLink className='h-4 w-4 mr-2' />
                View Customer Profile
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
