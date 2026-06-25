import { create } from 'zustand';
import type { GlobalSettingDto, NavigationDto } from '@med-site/contracts';

interface SiteState {
  navigation: NavigationDto | null;
  globalSetting: GlobalSettingDto | null;
  setNavigation: (nav: NavigationDto | null) => void;
  setGlobalSetting: (setting: GlobalSettingDto | null) => void;
  hydrate: (data: { navigation?: NavigationDto | null; globalSetting?: GlobalSettingDto | null }) => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  navigation: null,
  globalSetting: null,
  setNavigation: (nav) => set({ navigation: nav }),
  setGlobalSetting: (setting) => set({ globalSetting: setting }),
  hydrate: (data) =>
    set({
      navigation: data.navigation ?? null,
      globalSetting: data.globalSetting ?? null,
    }),
}));

