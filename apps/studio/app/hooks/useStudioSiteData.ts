'use client';

import type { GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import { useEffect } from 'react';
import { useSiteStore } from '@/shared/store/siteStore';

/** Подгружает navigation + global-setting в siteStore для SSOT shell в preview */
export function useStudioSiteData(tenantId: string) {
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const qs = `tenant=${encodeURIComponent(tenantId)}`;
        const [navRes, settingRes] = await Promise.all([
          fetch(`/api/content/navigation?${qs}`, { cache: 'no-store' }),
          fetch(`/api/content/global-setting?${qs}`, { cache: 'no-store' }),
        ]);

        const navigation = navRes.ok
          ? ((await navRes.json()) as NavigationDto)
          : null;
        const globalSetting = settingRes.ok
          ? ((await settingRes.json()) as GlobalSettingDto)
          : null;

        if (!cancelled) {
          useSiteStore.getState().hydrate({ navigation, globalSetting });
        }
      } catch {
        if (!cancelled) {
          useSiteStore.getState().hydrate({ navigation: null, globalSetting: null });
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [tenantId]);
}
