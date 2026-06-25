'use client';

import type { EngineState, GlobalSettingDto, NavigationDto, PageBlock } from '@med-site/contracts';
import { PageRenderer } from '@/shared/ui/PageRenderer';
import { PrototypeShell } from '../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';
import '../../../../src/index.css';

interface PageViewProps {
  blocks: PageBlock[];
  title?: string;
  engineState?: EngineState;
  navigation?: NavigationDto | null;
  globalSetting?: GlobalSettingDto | null;
  tenantId?: string;
}

/** Клиентский рендер блоков страницы через PageRenderer прототипа */
export function PageView({
  blocks,
  title,
  engineState,
  navigation = null,
  globalSetting = null,
  tenantId,
}: PageViewProps) {
  return (
    <PrototypeShell
      engineState={engineState}
      navigation={navigation}
      globalSetting={globalSetting}
      tenantId={tenantId}
    >
      <SiteChrome>
        {title ? <h1 className="sr-only">{title}</h1> : null}
        <div className="min-h-[100svh] pb-safe flex flex-col">
          <main className="flex-1 flex flex-col gap-[var(--spacing-section,3rem)]">
            <PageRenderer blocks={blocks} />
          </main>
        </div>
      </SiteChrome>
    </PrototypeShell>
  );
}
