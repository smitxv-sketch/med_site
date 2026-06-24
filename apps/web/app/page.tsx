import { HomePageClient } from './components/HomePageClient';
import { fetchPage, fetchSiteTheme, themeEngineState } from '../lib/bff';
import { DEFAULT_HOME_BLOCKS, DEFAULT_HOME_SEO } from '@med-site/contracts';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let blocks = DEFAULT_HOME_BLOCKS;
  let title = DEFAULT_HOME_SEO.metaTitle ?? 'Клиника «Источник»';
  let engineState = themeEngineState(null);

  try {
    const [page, theme] = await Promise.all([
      fetchPage('home', 'chel'),
      fetchSiteTheme('chel'),
    ]);
    blocks = page.blocks;
    title = page.title ?? title;
    engineState = themeEngineState(theme);
  } catch (err) {
    console.error('[web] home fetch fallback to mock:', err);
  }

  return <HomePageClient blocks={blocks} title={title} engineState={engineState} />;
}
