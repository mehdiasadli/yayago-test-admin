import { LoginForm } from '@/components/forms/login-form';
import { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login - Yayago Admin',
  description: 'Login to your Yayago Admin account',
};

export default async function AuthPage() {
  const session = await auth();

  // If user is already logged in, redirect to home
  if (session?.user) {
    redirect('/');
  }
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <Link href='/' className='flex justify-center gap-2 md:justify-start'>
          <Image src='/brand/Logo-Icon-Rounded-Brand.svg' alt='yayaGo' width={35} height={35} />
          <span className='flex items-center gap-2 font-medium'>yayaGo</span>
        </Link>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-sm'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img
          src='https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
