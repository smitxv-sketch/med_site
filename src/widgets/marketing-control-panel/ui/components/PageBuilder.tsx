import React, { useState } from 'react';
import { Reorder, motion, AnimatePresence, useDragControls } from 'framer-motion';
import { GripVertical, Plus, Trash2, Settings2, X, FileEdit } from 'lucide-react';
import { useUISettingsStore, WidgetType } from '@/shared/store/uiSettingsStore';
import { useCmsStore } from '@/shared/store/cmsStore';
import { PageBlock } from '@/shared/types/block';
import {
  WIDGETS_REGISTRY,
} from '@/shared/config/widgetManifest';
import type { WidgetPropSchema } from '@/shared/types/widget';

function DraggableBlock({ block, schema, editingBlock, setEditingBlock, removeBlock }: any) {
  const dragControls = useDragControls();
  
  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={dragControls}
      className="bg-white border rounded-xl p-3 shadow-sm flex items-center justify-between group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="cursor-grab active:cursor-grabbing p-1.5 -ml-1.5 hover:bg-gray-50 rounded-md transition-colors"
          onPointerDown={(e) => dragControls.start(e)}
          style={{ touchAction: 'none' }}
        >
          <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-sm">{schema.title}</div>
          <div className="text-xs text-gray-400 font-mono">{block.type}</div>
          {block.props && Object.keys(block.props).length > 0 && (
            <div className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mt-1 inline-block">
              {JSON.stringify(block.props)}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setEditingBlock(editingBlock?.id === block.id ? null : block)}
          className={`p-1.5 rounded-md transition-colors ${editingBlock?.id === block.id ? 'bg-brand/10 text-brand' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
        >
          <Settings2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => removeBlock(block.id)}
          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Reorder.Item>
  );
}

export function PageBuilder() {
  const { pageBlocks, setPageBlocks } = useCmsStore();
  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null);

  const handleReorder = (newOrder: PageBlock[]) => {
    setPageBlocks(newOrder);
  };

  const addBlock = (type: WidgetType) => {
    const newBlock: PageBlock = {
      id: `${type}-${Date.now()}`,
      type,
      props: {}
    };
    setPageBlocks([...pageBlocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setPageBlocks(pageBlocks.filter((b) => b.id !== id));
  };

  const updateBlockProps = (id: string, props: Record<string, any>) => {
    setPageBlocks(pageBlocks.map((b) => (b.id === id ? { ...b, props: { ...b.props, ...props } } : b)));
  };

  const renderPropInput = (block: PageBlock, prop: WidgetPropSchema) => {
    const value = block.props?.[prop.name] ?? '';
    
    // Специальный визуальный рендер для Semantic Widget Matrix (Intent)
    if (prop.name === 'intent') {
      return (
        <div key={prop.name} className="mb-4 mt-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{prop.label}</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              { val: 'direct-response', icon: '⚡', title: 'Лиды (Lead Gen)', desc: 'Фокус на кнопки и форму' },
              { val: 'educational', icon: '💡', title: 'Инфо (Informative)', desc: 'Фокус на факты и текст' },
              { val: 'immersive', icon: '🎨', title: 'Эмоции (Immersive)', desc: 'Эмоции, большие фото' }
            ].map(opt => (
              <button
                key={opt.val}
                onClick={() => updateBlockProps(block.id, { [prop.name]: opt.val })}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${value === opt.val ? 'bg-brand/5 border-brand ring-1 ring-brand shadow-sm' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <span className="text-xl mb-1">{opt.icon}</span>
                <span className={`text-sm font-bold ${value === opt.val ? 'text-brand' : 'text-gray-800'}`}>{opt.title}</span>
                <span className="text-[10px] text-gray-500 leading-tight">{opt.desc}</span>
              </button>
            ))}
          </div>
          {prop.description && <p className="text-[10px] text-gray-400 mt-2">{prop.description}</p>}
        </div>
      )
    }

    // Специальный визуальный рендер для Semantic Widget Matrix (Layout Pattern)
    if (prop.name === 'layoutPattern') {
      return (
        <div key={prop.name} className="mb-4 mt-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{prop.label}</label>
          <div className="flex flex-wrap gap-2">
            {[
              { val: 'split', icon: '◫', label: 'Разделен. (Split)' },
              { val: 'grid', icon: '⊞', label: 'Сетка (Grid)' },
              { val: 'stack', icon: '⊟', label: 'Стопка (Stack)' },
              { val: 'fluid', icon: '▭', label: 'Поток (Fluid)' }
            ].map(opt => (
              <button
                key={opt.val}
                onClick={() => updateBlockProps(block.id, { [prop.name]: opt.val })}
                className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-all ${value === opt.val ? 'bg-brand text-white border-brand shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <span className="text-lg font-light leading-none">{opt.icon}</span>
                <span className="text-xs font-semibold">{opt.label}</span>
              </button>
            ))}
          </div>
          {prop.description && <p className="text-[10px] text-gray-400 mt-2">{prop.description}</p>}
        </div>
      )
    }

    // Специальный визуальный рендер для Semantic Widget Matrix (Custom Variant / Escape Hatch)
    if (prop.name === 'customVariant') {
      return (
        <div key={prop.name} className="mb-4 mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
          <label className="block text-xs font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            ⚠️ {prop.label} (Escape Hatch)
          </label>
          <input
            type="text"
            className="w-full text-sm border-red-200 rounded-md p-2 bg-white outline-none focus:ring-1 focus:ring-red-400"
            value={value}
            placeholder={prop.placeholder}
            onChange={(e) => updateBlockProps(block.id, { [prop.name]: e.target.value || undefined })}
          />
          {prop.description && <p className="text-[10px] text-red-500 mt-2">{prop.description}</p>}
        </div>
      );
    }

    switch (prop.type) {
      case 'select':
        return (
          <div key={prop.name} className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">{prop.label}</label>
            <select
              className="w-full text-sm border-gray-200 rounded-lg p-2 bg-white"
              value={value}
              onChange={(e) => updateBlockProps(block.id, { [prop.name]: e.target.value || undefined })}
            >
              {prop.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {prop.description && <p className="text-[10px] text-gray-400 mt-1">{prop.description}</p>}
          </div>
        );
      case 'number':
        return (
          <div key={prop.name} className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">{prop.label}</label>
            <input
              type="number"
              className="w-full text-sm border-gray-200 rounded-lg p-2 bg-white"
              value={value}
              placeholder={prop.placeholder}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10);
                updateBlockProps(block.id, { [prop.name]: isNaN(num) ? undefined : num });
              }}
            />
            {prop.description && <p className="text-[10px] text-gray-400 mt-1">{prop.description}</p>}
          </div>
        );
      case 'string':
        return (
          <div key={prop.name} className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">{prop.label}</label>
            <input
              type="text"
              className="w-full text-sm border-gray-200 rounded-lg p-2 bg-white"
              value={value}
              placeholder={prop.placeholder}
              onChange={(e) => updateBlockProps(block.id, { [prop.name]: e.target.value || undefined })}
            />
            {prop.description && <p className="text-[10px] text-gray-400 mt-1">{prop.description}</p>}
          </div>
        );
      // We can easily expand to 'boolean' / 'checkbox' later!
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Конструктор Главной Страницы</h3>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold uppercase tracking-wider">Drag & Drop</span>
      </div>

      <Reorder.Group axis="y" values={pageBlocks} onReorder={handleReorder} className="flex flex-col gap-2">
        <AnimatePresence>
          {pageBlocks.map((block) => {
            const schema = WIDGETS_REGISTRY[block.type];
            return (
              <DraggableBlock 
                key={block.id} 
                block={block} 
                schema={schema} 
                editingBlock={editingBlock} 
                setEditingBlock={setEditingBlock} 
                removeBlock={removeBlock} 
              />
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      {/* Editing Panel (Dynamic Properties) */}
      <AnimatePresence>
        {editingBlock && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-brand" />
                  Параметры: {WIDGETS_REGISTRY[editingBlock.type].title}
                </h4>
                <button onClick={() => setEditingBlock(null)} className="text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>
              </div>
              
              <div className="space-y-1">
                {WIDGETS_REGISTRY[editingBlock.type].props.length > 0 ? (
                  WIDGETS_REGISTRY[editingBlock.type].props.map((propSchema) => renderPropInput(editingBlock, propSchema))
                ) : (
                  <p className="text-xs text-gray-500 italic py-2">У этого виджета пока нет настраиваемых параметров.</p>
                )}
                
                <p className="text-[10px] text-gray-400 mt-4 border-t border-gray-200 pt-2">
                  Динамическая схема берется из widgetManifest.ts
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Добавить виджет</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(WIDGETS_REGISTRY) as WidgetType[]).map((type) => {
            const schema = WIDGETS_REGISTRY[type];
            return (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-white hover:border-gray-300 border border-transparent text-gray-700 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0"
                title={schema.description}
              >
                <Plus className="w-3 h-3" />
                {schema.title}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
