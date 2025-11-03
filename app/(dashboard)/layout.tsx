import { auth } from '@/auth';
import { AppSidebar } from '@/components/navigation/app-sidebar';
import ThemeToggle from '@/components/theme-toggle';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/auth');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2'>
          <div className='flex w-full items-center justify-between gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <ThemeToggle />
          </div>
        </header>
        <main className='p-4 pt-2'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
