import { PageHeader } from '@/components/page-header';
import { UserDetailsContent } from './user-details-content';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface UserPageProps extends PageProps<'/users/[id]'> {}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  return (
    <div className='space-y-4'>
      <PageHeader title='User Details' description='View user details'>
        <Button asChild variant='outline'>
          <Link href='/users'>
            <ArrowLeft className='size-4' />
            Back to Users
          </Link>
        </Button>
      </PageHeader>
      <UserDetailsContent userId={Number(id)} />
    </div>
  );
}
