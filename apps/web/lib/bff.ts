import type {
  EngineState,
  GlobalSettingDto,
  NavigationDto,
  PageDto,
  SiteThemeDto,
} from '@med-site/contracts';
import { DEFAULT_ENGINE_STATE, DEFAULT_TENANT_ID } from '@med-site/contracts';

const BFF_URL = process.env.BFF_INTERNAL_URL ?? process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:3001';

export interface UtmQuery {
  utm_source?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_medium?: string;
}

function utmSearchParams(utm?: UtmQuery): string {
  if (!utm) return '';
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(utm)) {
    if (value) q.set(key, value);
  }
  const s = q.toString();
  return s ? `&${s}` : '';
}

export async function fetchPage(
  slug: string,
  tenant = DEFAULT_TENANT_ID,
  opts?: { abSeed?: string },
): Promise<PageDto> {
  const ab = opts?.abSeed ? `&ab_seed=${encodeURIComponent(opts.abSeed)}` : '';
  const url = `${BFF_URL}/api/pages/${slug}?tenant=${tenant}${ab}`;
  const res = await fetch(url, {
    next: { tags: [`page:${slug}`, `tenant:${tenant}`, 'pages'] },
  });

  if (!res.ok) {
    throw new Error(`BFF page fetch failed: ${res.status}`);
  }

  return res.json() as Promise<PageDto>;
}

/** Тема с BFF — после publish из Studio + UTM rules (Wave 2) */
export async function fetchSiteTheme(
  tenant = DEFAULT_TENANT_ID,
  utm?: UtmQuery,
): Promise<SiteThemeDto> {
  const url = `${BFF_URL}/api/site-theme?tenant=${tenant}${utmSearchParams(utm)}`;
  const res = await fetch(url, {
    next: { tags: ['site-theme', `tenant:${tenant}`] },
  });

  if (!res.ok) {
    throw new Error(`BFF site-theme fetch failed: ${res.status}`);
  }

  return res.json() as Promise<SiteThemeDto>;
}

export async function fetchNavigation(
  tenant = DEFAULT_TENANT_ID,
): Promise<NavigationDto> {
  const url = `${BFF_URL}/api/navigation?tenant=${tenant}`;
  const res = await fetch(url, {
    next: { tags: ['navigation', `tenant:${tenant}`] },
  });

  if (!res.ok) {
    throw new Error(`BFF navigation fetch failed: ${res.status}`);
  }

  return res.json() as Promise<NavigationDto>;
}

export async function fetchGlobalSetting(
  tenant = DEFAULT_TENANT_ID,
): Promise<GlobalSettingDto> {
  const url = `${BFF_URL}/api/global-setting?tenant=${tenant}`;
  const res = await fetch(url, {
    next: { tags: ['global-setting', `tenant:${tenant}`] },
  });

  if (!res.ok) {
    throw new Error(`BFF global-setting fetch failed: ${res.status}`);
  }

  return res.json() as Promise<GlobalSettingDto>;
}

export function themeEngineState(theme: SiteThemeDto | null): EngineState {
  return theme?.engineState ?? DEFAULT_ENGINE_STATE;
}
