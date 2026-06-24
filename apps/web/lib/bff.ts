import type { EngineState, PageDto, SiteThemeDto } from '@med-site/contracts';
import { DEFAULT_ENGINE_STATE } from '@med-site/contracts';

const BFF_URL = process.env.BFF_INTERNAL_URL ?? process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:3001';

export async function fetchPage(slug: string, tenant = 'chel'): Promise<PageDto> {
  const url = `${BFF_URL}/api/pages/${slug}?tenant=${tenant}`;
  const res = await fetch(url, {
    next: { tags: [`page:${slug}`, `tenant:${tenant}`, 'pages'] },
  });

  if (!res.ok) {
    throw new Error(`BFF page fetch failed: ${res.status}`);
  }

  return res.json() as Promise<PageDto>;
}

/** Тема с BFF — после publish из Studio попадает на публичный сайт */
export async function fetchSiteTheme(tenant = 'chel'): Promise<SiteThemeDto> {
  const url = `${BFF_URL}/api/site-theme?tenant=${tenant}`;
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
