'use client';

import { StudioCommandPanel } from './StudioCommandPanel';
import { StudioPreview } from './StudioPreview';
import { useStudioDraftBridge } from '../hooks/useStudioDraftBridge';

/** Split-view: preview слева, Command Center справа */
export function StudioWorkspace() {
  const { loading, error, revision, publishing, publish, hasUnsavedChanges } =
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
        publish={publish}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
}
