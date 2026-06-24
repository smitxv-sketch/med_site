'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { DIProvider } from '@/shared/di/DIContext';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

/** Провайдеры прототипа — нужны виджетам (DI, React Query, тема) */
export function PrototypeShell({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DIProvider>
        <ThemeProvider>{children as ReactNode}</ThemeProvider>
      </DIProvider>
    </QueryClientProvider>
  );
}
