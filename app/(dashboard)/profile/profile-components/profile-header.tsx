import { Card, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone } from 'lucide-react';
import { AuthUser } from '@/auth';

interface ProfileHeaderProps {
  user: AuthUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
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
  );
}
