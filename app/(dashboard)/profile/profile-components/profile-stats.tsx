import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { AuthUser } from '@/auth';
import { format } from 'date-fns';

interface ProfileStatsProps {
  user: AuthUser;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  return (
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
  );
}
