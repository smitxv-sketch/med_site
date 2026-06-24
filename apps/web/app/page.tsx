import { HomePageClient } from './components/HomePageClient';
import { fetchPage } from '../lib/bff';
import { DEFAULT_HOME_BLOCKS, DEFAULT_HOME_SEO } from '@med-site/contracts';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let blocks = DEFAULT_HOME_BLOCKS;
  let title = DEFAULT_HOME_SEO.metaTitle ?? 'Клиника «Источник»';

  try {
    const page = await fetchPage('home', 'chel');
    blocks = page.blocks;
    title = page.title ?? title;
  } catch (err) {
    console.error('[web] home fetch fallback to mock:', err);
  }

  return <HomePageClient blocks={blocks} title={title} />;
}
