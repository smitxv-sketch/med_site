'use client';

import type { PageBlock } from '@med-site/contracts';
import { PageRenderer } from '@/shared/ui/PageRenderer';
import { PrototypeShell } from '../providers/PrototypeShell';
import '../../../../src/index.css';

interface PageViewProps {
  blocks: PageBlock[];
  title?: string;
}

/** Клиентский рендер блоков страницы через PageRenderer прототипа */
export function PageView({ blocks, title }: PageViewProps) {
  return (
    <PrototypeShell>
      <div className="min-h-[100svh] pb-safe flex flex-col">
        {title ? <h1 className="sr-only">{title}</h1> : null}
        <main className="flex-1 flex flex-col gap-[var(--spacing-section,3rem)]">
          <PageRenderer blocks={blocks} />
        </main>
      </div>
    </PrototypeShell>
  );
}
