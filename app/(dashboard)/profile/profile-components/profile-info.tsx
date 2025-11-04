import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { AuthUser } from '@/auth';

interface ProfileInfoProps {
  user: AuthUser;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
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
  );
}
