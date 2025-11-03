import { PageHeader } from '@/components/page-header';
import { ProfileContent } from './profile-content';
import { HeaderLogoutButton } from './header-logout-button';

export default function ProfilePage() {
  return (
    <>
      <PageHeader title='Profile' description='Manage your account information'>
        <HeaderLogoutButton />
      </PageHeader>
      <div className='container mx-auto py-6'>
        <ProfileContent />
      </div>
    </>
  );
}
