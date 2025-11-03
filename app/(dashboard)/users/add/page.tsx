import { PageHeader } from '@/components/page-header';
import { AddUserForm } from './add-user-form';

export default function UserAddPage() {
  return (
    <div className='space-y-4'>
      <PageHeader title='Add User' description='Add a new user to the system' />
      <AddUserForm />
    </div>
  );
}
