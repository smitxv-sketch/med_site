'use client';

import { StudioCommandPanel } from './StudioCommandPanel';
import { StudioPreview } from './StudioPreview';
import { useStudioDraftBridge } from '../hooks/useStudioDraftBridge';

/** Split-view: preview слева, Command Center справа */
export function StudioWorkspace() {
  const { loading, error, revision, publishing, publish, hasUnsavedChanges, pageSlug } =
    useStudioDraftBridge();

  if (loading) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-slate-950 text-slate-300">
        Загрузка черновика…
      </div>
    );
  }

  return (
    <div className="flex min-h-[100svh] w-full overflow-hidden bg-slate-100">
      <div className="min-w-0 flex-1 overflow-y-auto">
        {pageSlug.startsWith('lab-') ? (
          <div className="m-4 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3 py-2 text-xs text-purple-100">
            Лаборатория: <code className="font-mono">{pageSlug}</code> — не публикуется на сайт напрямую
          </div>
        ) : null}
        {error ? (
          <div className="m-4 rounded-lg border border-amber-500/40 bg-amber-950/80 p-3 text-sm text-amber-100">
            {error}
          </div>
        ) : null}
        <StudioPreview />
      </div>
      <StudioCommandPanel
        revision={revision}
        publishing={publishing}
        onPublish={publish}
        hasUnsavedChanges={hasUnsavedChanges}
        isLabPage={pageSlug.startsWith('lab-')}
      />
    </div>
  );
}
