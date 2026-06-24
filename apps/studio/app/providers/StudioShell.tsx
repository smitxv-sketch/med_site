'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { DIProvider } from '@/shared/di/DIContext';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

/** Провайдеры прототипа для виджетов и Command Center */
export function StudioShell({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DIProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </DIProvider>
    </QueryClientProvider>
  );
}
