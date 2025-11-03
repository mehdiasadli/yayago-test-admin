'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

export function HeaderLogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/auth',
        redirect: true,
      });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <Button variant='outline' onClick={handleLogout}>
      <LogOut className='size-4' />
      Log out
    </Button>
  );
}
