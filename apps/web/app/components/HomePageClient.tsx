'use client';

import type { EngineState, PageBlock } from '@med-site/contracts';
import { PageView } from './PageView';

interface HomePageClientProps {
  blocks: PageBlock[];
  title: string;
  engineState: EngineState;
}

/** Клиентская обёртка главной — PageView с виджетами прототипа */
export function HomePageClient({ blocks, title, engineState }: HomePageClientProps) {
  return <PageView blocks={blocks} title={title} engineState={engineState} />;
}
