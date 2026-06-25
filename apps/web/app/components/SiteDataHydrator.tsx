'use client';

import type { GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import { useLayoutEffect } from 'react';
import { useSiteStore } from '@/shared/store/siteStore';

interface SiteDataHydratorProps {
  navigation: NavigationDto | null;
  globalSetting: GlobalSettingDto | null;
}

export function SiteDataHydrator({
  navigation,
  globalSetting,
}: SiteDataHydratorProps) {
  useLayoutEffect(() => {
    useSiteStore.getState().hydrate({ navigation, globalSetting });
  }, [navigation, globalSetting]);

  return null;
}

