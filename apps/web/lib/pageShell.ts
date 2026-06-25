import type { GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import {
  fetchGlobalSetting,
  fetchNavigation,
  fetchSiteTheme,
  themeEngineState,
  type UtmQuery,
} from './bff';

/** Общие данные shell (тема + меню + контакты) для страниц Next */
export async function fetchPageShell(tenantId: string, utm?: UtmQuery) {
  const [theme, navigation, globalSetting] = await Promise.all([
    fetchSiteTheme(tenantId, utm),
    fetchNavigation(tenantId),
    fetchGlobalSetting(tenantId),
  ]);

  return {
    engineState: themeEngineState(theme),
    navigation: navigation as NavigationDto,
    globalSetting: globalSetting as GlobalSettingDto,
  };
}
