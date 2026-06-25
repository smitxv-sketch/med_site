import type { EngineState, PageDto, SiteThemeDto } from '@med-site/contracts';
import { DEFAULT_ENGINE_STATE } from '@med-site/contracts';

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
  tenant = 'chel',
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
  tenant = 'chel',
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

export function themeEngineState(theme: SiteThemeDto | null): EngineState {
  return theme?.engineState ?? DEFAULT_ENGINE_STATE;
}
