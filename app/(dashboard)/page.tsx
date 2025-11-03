import { PageHeader } from '@/components/page-header';
import { DashboardPageContent } from './dashboard-page-content';

export default function DashboardPage() {
  return (
    <div className='space-y-4'>
      <PageHeader title='Dashboard' description='Overview of your rental business' />
      <DashboardPageContent />
    </div>
  );
}
