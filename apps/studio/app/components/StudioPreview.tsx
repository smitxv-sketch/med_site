'use client';

import { PageRenderer } from '@/shared/ui/PageRenderer';
import { useCmsStore } from '@/shared/store/cmsStore';
import { SiteChrome } from '@/app/layouts/SiteChrome';
import { useTenant } from '@/shared/tenant/TenantContext';
import { useStudioSiteData } from '../hooks/useStudioSiteData';
import { StudioShell } from '../providers/StudioShell';
import '../../../../src/index.css';

/** Live-preview с inline-edit (Wave 4) */
export function StudioPreview() {
  const pageBlocks = useCmsStore((s) => s.pageBlocks);
  const setPageBlocks = useCmsStore((s) => s.setPageBlocks);
  const { tenantId } = useTenant();

  // Меню и контакты — те же данные, что на проде (per tenant)
  useStudioSiteData(tenantId);

  return (
    <StudioShell>
      <SiteChrome>
        <div className="min-h-[100svh] bg-background pb-safe">
          <main className="flex flex-col gap-[var(--spacing-section,3rem)]">
            <PageRenderer
              blocks={pageBlocks}
              onUpdateBlocks={setPageBlocks}
              forceDevMode
            />
          </main>
        </div>
      </SiteChrome>
    </StudioShell>
  );
}
