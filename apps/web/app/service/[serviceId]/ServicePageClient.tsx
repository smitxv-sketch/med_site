'use client';

import type { EngineState, GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import { ServicePage } from '@/pages/service/ui/ServicePage';
import { PrototypeShell } from '../../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';

export function ServicePageClient({
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
        <ServicePage />
      </SiteChrome>
    </PrototypeShell>
  );
}
