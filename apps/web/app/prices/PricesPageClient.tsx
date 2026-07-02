'use client';

import type { EngineState, GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import { PricesPage } from '@/pages/prices/ui/PricesPage';
import { PrototypeShell } from '../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';

export function PricesPageClient({
  engineState,
  navigation,
  globalSetting,
  tenantId,
}: {
  engineState: EngineState;
  navigation: NavigationDto | null;
  globalSetting: GlobalSettingDto | null;
  tenantId: string;
}) {
  return (
    <PrototypeShell
      engineState={engineState}
      navigation={navigation}
      globalSetting={globalSetting}
      tenantId={tenantId}
    >
      <SiteChrome>
        <PricesPage />
      </SiteChrome>
    </PrototypeShell>
  );
}
