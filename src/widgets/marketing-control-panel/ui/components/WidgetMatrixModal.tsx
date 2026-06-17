import React from 'react';
import { X } from 'lucide-react';
import { PageRenderer } from '@/shared/ui/PageRenderer';
import { WIDGETS_REGISTRY } from '@/shared/config/widgetsRegistry';

interface WidgetMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WidgetMatrixModal({ isOpen, onClose }: WidgetMatrixModalProps) {
  if (!isOpen) return null;

  // We want to render all widgets with their available layoutPatterns (Variants)
  const renderAllWidgets = () => {
    return Object.entries(WIDGETS_REGISTRY).map(([widgetName, schema]) => {
      // Find the layoutPattern prop to get its discrete options
      const layoutProp = schema.props.find(p => p.name === 'layoutPattern');
      if (!layoutProp || !layoutProp.options || layoutProp.options.length === 0) return null;

      return (
        <div key={widgetName} className="mb-16">
          <h2 className="text-3xl font-black mb-2 text-gray-900 border-b-2 border-gray-100 pb-2 flex items-center gap-4">
            <span className="text-brand">{schema.title}</span>
            <span className="text-sm font-mono text-gray-400 font-medium px-3 py-1 bg-gray-100 rounded-lg">{widgetName}</span>
          </h2>
          <p className="text-gray-500 mb-8">{schema.description}</p>
          
          <div className="flex flex-col gap-12">
            {layoutProp.options.map((opt) => (
              <div key={opt.value} className="bg-gray-50/50 outline outline-1 outline-gray-200 p-8 rounded-[32px] shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 left-0 bg-brand text-gray-900 text-xs font-bold uppercase px-4 py-1.5 rounded-br-2xl shadow-md z-50 flex items-center gap-2">
                  <span className="opacity-70">Разметка:</span> 
                  <span className="opacity-100">{opt.label || opt.value}</span>
                  <span className="font-mono opacity-50 px-1 bg-white/40 rounded ml-2 text-[10px]">{opt.value}</span>
                </div>
                
                {/* Pointer events none is removed to allow interaction, but we isolate styles */}
                <div className="mt-4 transition-transform duration-500">
                  <PageRenderer 
                    blocks={[{
                      id: `${widgetName}-${opt.value}`,
                      type: widgetName,
                      props: { layoutPattern: opt.value }
                    }]} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col bg-gray-50">
      <header className="shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Матрица Виджетов</h1>
          <p className="text-sm text-gray-500 font-medium">Глобальная лаборатория всех доступных вариантов отображения (Layout Patterns)</p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-12 custom-scrollbar relative">
        <div className="max-w-[1400px] mx-auto">
          {renderAllWidgets()}
        </div>
      </div>
    </div>
  );
}
