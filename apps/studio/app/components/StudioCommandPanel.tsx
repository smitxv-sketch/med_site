'use client';

import { RotateCcw, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { UnifiedWorkspace } from '@/widgets/marketing-control-panel/ui/workspaces/UnifiedWorkspace';
import { WidgetMatrixModal } from '@/widgets/marketing-control-panel/ui/components/WidgetMatrixModal';
import { usePanelResizer } from '@/widgets/marketing-control-panel/logic/usePanelResizer';

interface StudioCommandPanelProps {
  onPublish: () => void;
  publishing: boolean;
  revision: number;
  hasUnsavedChanges: boolean;
  isLabPage?: boolean;
}

/** Command Center без секретного unlock — всегда доступен в Studio */
export function StudioCommandPanel({
  onPublish,
  publishing,
  revision,
  hasUnsavedChanges,
  isLabPage = false,
}: StudioCommandPanelProps) {
  const store = useUISettingsStore();
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const { panelWidth, startResizing } = usePanelResizer(true);

  return (
    <>
      <div
        className="relative flex h-full min-h-0 flex-col border-l border-border bg-background shadow-xl"
        style={{ width: panelWidth, minWidth: 320, maxWidth: '100%' }}
      >
        <div
          onMouseDown={startResizing}
          className="group absolute left-0 top-0 z-50 flex h-full w-3 -translate-x-1 cursor-col-resize items-center justify-center hover:bg-slate-900/5"
        >
          <div className="pointer-events-none h-12 w-1 rounded-full bg-slate-200 transition-colors group-hover:bg-slate-400" />
        </div>

        <header className="z-20 shrink-0 border-b border-slate-100 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                <Settings2 className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none text-slate-900">
                  Командный Центр
                </h1>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Studio · rev {revision}
                  {hasUnsavedChanges ? ' · несохранено' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => store.resetToDefaults()}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                title="Сбросить"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={publishing || isLabPage}
                onClick={onPublish}
                title={isLabPage ? 'Лабораторные страницы публикуются через перенос на home' : undefined}
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
              >
                {isLabPage ? 'Lab only' : publishing ? 'Публикация…' : 'Опубликовать'}
              </button>
            </div>
          </div>
        </header>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden bg-slate-50/30">
          <UnifiedWorkspace store={store} openMatrix={() => setIsMatrixOpen(true)} />
        </div>
      </div>

      <WidgetMatrixModal isOpen={isMatrixOpen} onClose={() => setIsMatrixOpen(false)} />
    </>
  );
}
