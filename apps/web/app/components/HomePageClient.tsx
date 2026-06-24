'use client';

import type { PageBlock } from '@med-site/contracts';
import { PageView } from './PageView';

interface HomePageClientProps {
  blocks: PageBlock[];
  title: string;
}

/** Клиентская обёртка главной — PageView с виджетами прототипа */
export function HomePageClient({ blocks, title }: HomePageClientProps) {
  return <PageView blocks={blocks} title={title} />;
}
