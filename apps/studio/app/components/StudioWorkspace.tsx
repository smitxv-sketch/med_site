'use client';

import { TenantProvider } from '@/shared/tenant/TenantContext';
import { useState } from 'react';
import { StudioCommandPanel } from './StudioCommandPanel';
import { StudioPreview } from './StudioPreview';
import { useStudioDraftBridge } from '../hooks/useStudioDraftBridge';

/** Превью на весь экран; Command Center — оверлей справа (как DevModeToggle) */
export function StudioWorkspace() {
  const {
    loading,
    error,
    revision,
    publishing,
    publish,
    hasUnsavedChanges,
    pageSlug,
    tenantId,
  } = useStudioDraftBridge();
  const [panelOpen, setPanelOpen] = useState(true);

  if (loading) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-slate-950 text-slate-300">
        Загрузка черновика…
      </div>
    );
  }

  return (
    <TenantProvider tenantId={tenantId}>
      <div className="relative min-h-[100svh] w-full overflow-x-hidden bg-slate-100">
      {pageSlug.startsWith('lab-') ? (
        <div className="absolute left-4 right-4 top-4 z-20 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3 py-2 text-xs text-purple-100">
          Лаборатория: <code className="font-mono">{pageSlug}</code> — не публикуется на сайт напрямую
        </div>
      ) : null}
      {error ? (
        <div className="absolute left-4 right-4 top-4 z-20 rounded-lg border border-amber-500/40 bg-amber-950/80 p-3 text-sm text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="min-h-[100svh] w-full overflow-y-auto">
        <StudioPreview />
      </div>

      <StudioCommandPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        revision={revision}
        publishing={publishing}
        onPublish={publish}
        hasUnsavedChanges={hasUnsavedChanges}
        isLabPage={pageSlug.startsWith('lab-')}
      />
      </div>
    </TenantProvider>
  );
}
