import { PageHeader } from '@/components/page-header';
import { UsersPageContent } from './users-page-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className='space-y-4'>
      <PageHeader title='Users' description='Manage your users'>
        <Button asChild>
          <Link href='/users/add'>
            <PlusIcon className='size-4' />
            Add User
          </Link>
        </Button>
      </PageHeader>
      <UsersPageContent />
    </div>
  );
}
