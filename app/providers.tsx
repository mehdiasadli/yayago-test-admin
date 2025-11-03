'use client';

import { getQueryClient } from '@/lib/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
      </SessionProvider>
      <Toaster richColors position='top-center' />
    </QueryClientProvider>
  );
}
