import React, { useState, useEffect } from 'react';
import { Settings2, X, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { useUISettingsStore } from '../store/uiSettingsStore';
import { useSecretUnlocker } from '../../widgets/marketing-control-panel/logic/useSecretUnlocker';
import { usePanelResizer } from '../../widgets/marketing-control-panel/logic/usePanelResizer';
import { UnifiedWorkspace } from '../../widgets/marketing-control-panel/ui/workspaces/UnifiedWorkspace';
import { WidgetMatrixModal } from '@/widgets/marketing-control-panel/ui/components/WidgetMatrixModal';

export function DevModeToggle() {
  const store = useUISettingsStore();
  const { isDevMode, setIsDevMode } = store;
  const [isOpen, setIsOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  
  const { handleSecretTap, isUnlocked } = useSecretUnlocker();
  const { panelWidth, startResizing } = usePanelResizer(isOpen);

  // Keyboard shortcut toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+M or Cmd+M
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        store.unlockCommandCenter();
        setIsDevMode(true);
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsDevMode, store]);

  return (
    <>
      {/* Invisible Secret Hotspot in bottom left corner */}
      {!isUnlocked && (
        <div 
          className="fixed bottom-0 left-0 w-24 h-24 z-[9990] bg-transparent cursor-default"
          onClick={handleSecretTap}
        />
      )}

      {/* Floating Toggle Button (visible when unlocked and panel is closed) */}
      <div 
        className={`fixed top-1/2 right-0 -translate-y-1/2 z-[9991] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen || !isUnlocked ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <button
          onClick={() => {
            setIsDevMode(true);
            setIsOpen(true);
          }}
          className="group flex flex-col items-center justify-center gap-2 px-2 py-4 bg-background/90 backdrop-blur-md text-slate-500 border-y border-l border-border rounded-l-xl shadow-lg hover:bg-white hover:text-indigo-600 hover:shadow-xl transition-all duration-300 w-10 sm:w-12 h-24 sm:h-32"
          title="Командный Центр (Cmd/Ctrl + M)"
        >
          <Settings2 className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 opacity-80 group-hover:opacity-100 group-hover:rotate-90" />
          <ChevronLeft className="w-4 h-4 opacity-50 group-hover:opacity-100 mt-auto" />
        </button>
      </div>

      {/* Docked Sidebar Command Center */}
      <div 
        className={`fixed inset-0 bg-slate-900/10 z-[9997] backdrop-blur-[1px] lg:hidden transition-opacity duration-300 ${isDevMode && isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)} 
      />
      
      <div 
        className={`fixed inset-y-0 right-0 z-[9998] bg-background shadow-2xl border-l border-border flex flex-col overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDevMode && isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: `${panelWidth}px`, maxWidth: '100vw' }}
      >
        {/* Drag Handle */}
        <div 
          onMouseDown={startResizing}
          className="absolute left-0 top-0 bottom-0 w-3 cursor-col-resize hover:bg-slate-900/5 z-50 flex items-center justify-center -translate-x-1 transition-colors group"
        >
            <div className="w-1 h-12 rounded-full bg-slate-200 group-hover:bg-slate-400 pointer-events-none transition-colors" />
        </div>

        {/* Header */}
        <div className="flex flex-col p-4 sm:p-5 pb-2 sm:pb-3 bg-white border-b border-slate-100 shrink-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                <Settings2 className="w-4 h-4 animate-[spin_4s_linear_infinite]" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-slate-900 text-sm leading-none tracking-tight">Командный Центр</h3>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Управление ресурсом · v3.0</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 ml-4">
              <button 
                onClick={() => store.resetToDefaults()} 
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                title="Сбросить настройки к заводским"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                title="Свернуть панель (Cmd/Ctrl + M)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Unified Search Workspace */}
        <div className="flex-1 flex flex-col min-h-0 w-full bg-slate-50/30 relative z-10 overflow-hidden">
          <UnifiedWorkspace store={store} openMatrix={() => setIsMatrixOpen(true)} />
        </div>
      </div>
      
      {/* Keeping Modal wrapper for legacy compatibility */}
      <WidgetMatrixModal isOpen={isMatrixOpen} onClose={() => setIsMatrixOpen(false)} />
    </>
  );
}
