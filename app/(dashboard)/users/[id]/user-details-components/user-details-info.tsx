import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { UserSchemaType } from '@/schemas/users.schema';

interface UserDetailsInfoProps {
  user: UserSchemaType;
}

export function UserDetailsInfo({ user }: UserDetailsInfoProps) {
  return (
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
  );
}
