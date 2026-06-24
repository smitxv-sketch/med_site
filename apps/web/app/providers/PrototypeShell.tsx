'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { EngineState } from '@med-site/contracts';
import { type ReactNode, useState } from 'react';
import { DIProvider } from '@/shared/di/DIContext';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { EngineStateHydrator } from '../components/EngineStateHydrator';

interface PrototypeShellProps {
  children: ReactNode;
  /** Тема с BFF/Strapi — без Command Center на публичном сайте */
  engineState?: EngineState;
}

/** Провайдеры прототипа — нужны виджетам (DI, React Query, тема) */
export function PrototypeShell({ children, engineState }: PrototypeShellProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DIProvider>
        <ThemeProvider>
          {engineState ? <EngineStateHydrator engineState={engineState} /> : null}
          {children as ReactNode}
        </ThemeProvider>
      </DIProvider>
    </QueryClientProvider>
  );
}
