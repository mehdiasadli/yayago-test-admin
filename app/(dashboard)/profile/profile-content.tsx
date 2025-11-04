'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ProfileLoading } from './profile-components/profile-loading';
import { ProfileHeader } from './profile-components/profile-header';
import { ProfileInfo } from './profile-components/profile-info';
import { ProfileStats } from './profile-components/profile-stats';

export function ProfileContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <ProfileLoading />;
  }

  if (status === 'unauthenticated' || !session?.user) {
    router.push('/auth');
    return null;
  }

  const user = session.user;

  return (
    <div className='space-y-6'>
      {/* Profile Header Card */}
      <ProfileHeader user={user} />

      {/* Account Information Card */}
      <ProfileInfo user={user} />

      {/* Account Stats Card */}
      <ProfileStats user={user} />
    </div>
  );
}
