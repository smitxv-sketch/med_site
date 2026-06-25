'use client';

import type { EngineState, GlobalSettingDto, NavigationDto, PageBlock } from '@med-site/contracts';
import { PageView } from './PageView';

interface HomePageClientProps {
  blocks: PageBlock[];
  title: string;
  engineState: EngineState;
  navigation: NavigationDto | null;
  globalSetting: GlobalSettingDto | null;
  tenantId: string;
}

/** Клиентская обёртка главной — PageView с виджетами прототипа */
export function HomePageClient({
  blocks,
  title,
  engineState,
  navigation,
  globalSetting,
  tenantId,
}: HomePageClientProps) {
  return (
    <PageView
      blocks={blocks}
      title={title}
      engineState={engineState}
      navigation={navigation}
      globalSetting={globalSetting}
      tenantId={tenantId}
    />
  );
}
