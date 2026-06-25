'use client';

import type { EngineState, GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import { DoctorsPage } from '@/pages/doctors/ui/DoctorsPage';
import { PrototypeShell } from '../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';

export function DoctorsPageClient({
  engineState,
  navigation,
  globalSetting,
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
        <DoctorsPage />
      </SiteChrome>
    </PrototypeShell>
  );
}

