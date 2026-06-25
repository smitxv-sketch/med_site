import { HomePageClient } from './components/HomePageClient';
import { fetchPage, fetchSiteTheme, themeEngineState, type UtmQuery } from '../lib/bff';
import { DEFAULT_HOME_BLOCKS, DEFAULT_HOME_SEO } from '@med-site/contracts';

export const dynamic = 'force-dynamic';

type SearchParams = Record<string, string | string[] | undefined>;

function pickUtm(searchParams: SearchParams): UtmQuery | undefined {
  const utm: UtmQuery = {};
  for (const key of ['utm_source', 'utm_campaign', 'utm_term', 'utm_medium'] as const) {
    const raw = searchParams[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value) utm[key] = value;
  }
  return Object.keys(utm).length ? utm : undefined;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const utm = pickUtm(sp);

  let blocks = DEFAULT_HOME_BLOCKS;
  let title = DEFAULT_HOME_SEO.metaTitle ?? 'Клиника «Источник»';
  let engineState = themeEngineState(null);

  try {
    const [page, theme] = await Promise.all([
      fetchPage('home', 'chel'),
      fetchSiteTheme('chel', utm),
    ]);
    blocks = page.blocks;
    title = page.title ?? title;
    engineState = themeEngineState(theme);
  } catch (err) {
    console.error('[web] home fetch fallback to mock:', err);
  }

  return <HomePageClient blocks={blocks} title={title} engineState={engineState} />;
}
