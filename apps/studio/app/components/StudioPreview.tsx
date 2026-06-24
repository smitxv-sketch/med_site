'use client';

import { PageRenderer } from '@/shared/ui/PageRenderer';
import { useCmsStore } from '@/shared/store/cmsStore';
import { StudioShell } from '../providers/StudioShell';
import '../../../../src/index.css';

/** Live-preview главной — блоки из cmsStore */
export function StudioPreview() {
  const pageBlocks = useCmsStore((s) => s.pageBlocks);

  return (
    <StudioShell>
      <div className="min-h-[100svh] bg-background pb-safe">
        <main className="flex flex-col gap-[var(--spacing-section,3rem)]">
          <PageRenderer blocks={pageBlocks} />
        </main>
      </div>
    </StudioShell>
  );
}
