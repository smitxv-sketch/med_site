'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { EngineState, GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import { type ReactNode, useState } from 'react';
import { DIProvider } from '@/shared/di/DIContext';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { TenantProvider } from '@/shared/tenant/TenantContext';
import { EngineStateHydrator } from '../components/EngineStateHydrator';
import { SiteDataHydrator } from '../components/SiteDataHydrator';

interface PrototypeShellProps {
  children: ReactNode;
  /** Тема с BFF/Strapi — без Command Center на публичном сайте */
  engineState?: EngineState;
  navigation?: NavigationDto | null;
  globalSetting?: GlobalSettingDto | null;
  tenantId?: string;
}

/** Провайдеры прототипа — нужны виджетам (DI, React Query, тема) */
export function PrototypeShell({
  children,
  engineState,
  navigation = null,
  globalSetting = null,
  tenantId,
}: PrototypeShellProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider tenantId={tenantId}>
        <DIProvider>
          <ThemeProvider>
            {engineState ? <EngineStateHydrator engineState={engineState} /> : null}
            <SiteDataHydrator navigation={navigation} globalSetting={globalSetting} />
            {children as ReactNode}
          </ThemeProvider>
        </DIProvider>
      </TenantProvider>
    </QueryClientProvider>
  );
}
