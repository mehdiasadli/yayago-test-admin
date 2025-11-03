import { PageHeader } from '@/components/page-header';
import { NotificationsPageContent } from './notifications-page-content';

export default function NotificationsPage() {
  return (
    <>
      <PageHeader title='Notifications' description='Manage system notifications and alerts' />
      <div className='mt-8'>
        <NotificationsPageContent />
      </div>
    </>
  );
}
