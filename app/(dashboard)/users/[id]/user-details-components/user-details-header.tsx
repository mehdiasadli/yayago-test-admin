import { Card, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Mail, Phone } from 'lucide-react';
import { UserSchemaType } from '@/schemas/users.schema';
import { SetUserStatusDialog } from '@/components/users/set-user-status-dialog';
import { DeleteUserDialog } from '@/components/users/delete-user-dialog';

interface UserDetailsHeaderProps {
  user: UserSchemaType;
}

export function UserDetailsHeader({ user }: UserDetailsHeaderProps) {
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
  );
}
