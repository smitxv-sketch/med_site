'use client';

import { ChevronLeft, ChevronRight, RotateCcw, Settings2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { UnifiedWorkspace } from '@/widgets/marketing-control-panel/ui/workspaces/UnifiedWorkspace';
import { WidgetMatrixModal } from '@/widgets/marketing-control-panel/ui/components/WidgetMatrixModal';
import { usePanelResizer } from '@/widgets/marketing-control-panel/logic/usePanelResizer';

interface StudioCommandPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: () => void;
  publishing: boolean;
  revision: number;
  hasUnsavedChanges: boolean;
  isLabPage?: boolean;
}

/**
 * Command Center поверх превью (не сжимает контент).
 * Паттерн как DevModeToggle: fixed справа, сворачивается, Cmd/Ctrl+M.
 */
export function StudioCommandPanel({
  open,
  onOpenChange,
  onPublish,
  publishing,
  revision,
  hasUnsavedChanges,
  isLabPage = false,
}: StudioCommandPanelProps) {
  const store = useUISettingsStore();
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const { panelWidth, startResizing } = usePanelResizer(open);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <>
      {/* Вкладка «открыть панель», когда свёрнута */}
      <div
        className={`fixed top-1/2 right-0 z-[90] -translate-y-1/2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="group flex h-24 w-10 flex-col items-center justify-center gap-2 rounded-l-xl border border-r-0 border-border bg-background/90 px-2 py-4 text-slate-500 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-indigo-600 sm:h-32 sm:w-12"
          title="Командный Центр (Cmd/Ctrl + M)"
        >
          <Settings2 className="h-5 w-5 opacity-80 transition-transform group-hover:rotate-90 sm:h-6 sm:w-6" />
          <ChevronLeft className="mt-auto h-4 w-4 opacity-50 group-hover:opacity-100" />
        </button>
      </div>

      {/* Затемнение на мобильных */}
      <div
        className={`fixed inset-0 z-[95] bg-slate-900/10 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => onOpenChange(false)}
        aria-hidden={!open}
      />

      {/* Панель поверх контента */}
      <div
        className={`fixed inset-y-0 right-0 z-[96] flex flex-col overflow-hidden border-l border-border bg-background shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: panelWidth, maxWidth: '100vw' }}
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
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                title="Свернуть (Cmd/Ctrl + M)"
              >
                <ChevronRight className="h-5 w-5" />
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
