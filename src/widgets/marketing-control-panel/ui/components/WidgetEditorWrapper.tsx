import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, EyeOff, Eye, Settings2, Trash2, X, Minimize2, Maximize2 } from 'lucide-react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { PageBlock } from '@/shared/types/block';
import { WIDGETS_REGISTRY } from '@/shared/config/widgetsRegistry';
import { WidgetPropSchema } from '@/shared/types/widget';

interface Props {
  block: PageBlock;
  index: number;
  totalBlocks: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onUpdateProps: (props: Record<string, any>) => void;
  onUpdateBlock?: (updates: Partial<PageBlock>) => void;
  children: React.ReactNode;
}

export function WidgetEditorWrapper({ 
  block, 
  index, 
  totalBlocks, 
  onMoveUp, 
  onMoveDown, 
  onRemove, 
  onUpdateProps, 
  onUpdateBlock,
  children 
}: Props) {
  const { 
    isDevMode, 
    isWidgetEditorMinimized,
    setIsWidgetEditorMinimized,
    isCommandCenterUnlocked, 
    heroMobileVariant, 
    setHeroMobileVariant, 
    heroDesktopVariant, 
    setHeroDesktopVariant 
  } = useUISettingsStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isEditingEnabled = isDevMode || isCommandCenterUnlocked;

  if (!isEditingEnabled) return <>{children}</>;

  const isFirst = index === 0;
  const isLast = index === totalBlocks - 1;

  const schema = WIDGETS_REGISTRY[block.type];

  // Helper bindings
  const config = block.config || {};
  const design = block.design || {};
  const content = block.content || {};
  const oldProps = block.props || {};

  const handleUpdateConfig = (updates: any) => {
    if (onUpdateBlock) {
      onUpdateBlock({ config: { ...config, ...updates } });
    } else {
      onUpdateProps(updates); // fallback
    }
  };

  const handleUpdateDesign = (updates: any) => {
    if (onUpdateBlock) {
      onUpdateBlock({ design: { ...design, ...updates } });
    } else {
      onUpdateProps(updates); // fallback
    }
  };

  const handleUpdateContent = (updates: any) => {
    if (onUpdateBlock) {
      onUpdateBlock({ content: { ...content, ...updates } });
    } else {
      onUpdateProps(updates); // fallback
    }
  };

  const renderPropInput = (prop: WidgetPropSchema) => {
    const getNamespacedValue = (p: WidgetPropSchema) => {
      const ns = p.namespace || 'content';
      if (ns === 'design') return design[p.name] ?? oldProps[p.name] ?? '';
      if (ns === 'config') return config[p.name] ?? oldProps[p.name] ?? '';
      return content[p.name] ?? oldProps[p.name] ?? '';
    };

    const updateNamespacedValue = (p: WidgetPropSchema, val: any) => {
      const ns = p.namespace || 'content';
      if (ns === 'design') return handleUpdateDesign({ [p.name]: val });
      if (ns === 'config') return handleUpdateConfig({ [p.name]: val });
      return handleUpdateContent({ [p.name]: val });
    };

    const value = getNamespacedValue(prop);
    
    switch (prop.type) {
      case 'select':
        return (
          <div key={prop.name} className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">{prop.label}</label>
            <select
              className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
              value={value}
              onChange={(e) => updateNamespacedValue(prop, e.target.value || undefined)}
            >
              {prop.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      case 'number':
        return (
          <div key={prop.name} className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">{prop.label}</label>
            <input
              type="number"
              className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
              value={value}
              placeholder={prop.placeholder}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10);
                updateNamespacedValue(prop, isNaN(num) ? undefined : num);
              }}
            />
          </div>
        );
      case 'string':
        return (
          <div key={prop.name} className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">{prop.label}</label>
            <input
              type="text"
              className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
              value={value}
              placeholder={prop.placeholder}
              onChange={(e) => updateNamespacedValue(prop, e.target.value || undefined)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const isHidden = config.hidden ?? oldProps.hidden;
  const toggleVisibility = () => {
    handleUpdateConfig({ hidden: !isHidden });
  };


  return (
    <div 
      className="group relative transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsSettingsOpen(false); }}
    >
      {/* Target Content (Widget) */}
      <div className={`transition-all duration-300 ${isSettingsOpen ? 'opacity-50 blur-[2px]' : ''} ${isHovered ? 'ring-2 ring-brand/50 rounded-2xl' : ''} ${isHidden ? 'opacity-30 grayscale' : ''}`}>
        {children}
      </div>

      {/* Hover Toolbar */}
      <AnimatePresence>
        {isHovered && !isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`absolute top-4 ${isWidgetEditorMinimized ? 'right-4 sm:right-auto sm:left-4 z-50' : 'left-4 right-4 sm:right-auto z-50 w-auto'} max-w-[calc(100%-32px)] flex flex-wrap justify-start items-center gap-1 p-2 shadow-xl border border-gray-100 rounded-xl bg-white/95 backdrop-blur`}
          >
            {isWidgetEditorMinimized ? (
              <div className="flex items-center">
                 <div className="px-2 border-r border-gray-100 hidden sm:flex items-center">
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">{schema?.title || block.type}</span>
                 </div>
                 <button onClick={() => setIsWidgetEditorMinimized(false)} className="p-2 text-gray-500 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors" title="Развернуть">
                   <Maximize2 className="w-4 h-4" />
                 </button>
                 {!schema?.configurable && !schema?.designTokens && (
                     <button onClick={() => setIsSettingsOpen(true)} className="p-2 text-gray-500 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors" title="Настройки">
                       <Settings2 className="w-4 h-4" />
                     </button>
                 )}
              </div>
            ) : (
              <>
                <div className="px-3 border-r border-gray-100 flex items-center gap-2">
                   <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{schema?.title || block.type} {isHidden && '(Скрыт)'}</span>
                   {block.props?.visibilityTarget === 'mobile' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Мобайл</span>}
                   {block.props?.visibilityTarget === 'desktop' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">ПК</span>}
                   {block.props?.visibilityAuth === 'auth' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700">Юзеры</span>}
                   {block.props?.visibilityAuth === 'guest' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">Гости</span>}
                </div>
                
                <button onClick={onMoveUp} disabled={isFirst} className="p-2 text-gray-500 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Вверх">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={onMoveDown} disabled={isLast} className="p-2 text-gray-500 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Вниз">
                  <ArrowDown className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-200 mx-1" />
            
            {block.type === 'HeroWidget' ? (
              <div className="flex items-center gap-2 mx-1 scale-[0.9] origin-left">
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100 shadow-inner">
                  <span className="text-[10px] text-gray-400/80 font-black uppercase mx-2 shrink-0">Моб</span>
                  {['A', 'B', 'C', 'E', 'F'].map((v) => {
                    const isActive = heroMobileVariant === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setHeroMobileVariant(v as any)}
                        className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200 ${isActive ? 'bg-white text-brand shadow border border-gray-100' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'}`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100 shadow-inner">
                  <span className="text-[10px] text-gray-400/80 font-black uppercase mx-2 shrink-0">ПК</span>
                  {['A', 'B', 'C', 'D'].map((v) => {
                    const isActive = heroDesktopVariant === v;
                    return (
                      <button
                        key={v}
                        onClick={() => setHeroDesktopVariant(v as any)}
                        className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200 ${isActive ? 'bg-white text-brand shadow border border-gray-100' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'}`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : schema?.variants && schema.variants.length > 0 && (
              <div className="flex items-center gap-2 mx-1 scale-[0.9] origin-left">
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100 shadow-inner">
                  <span className="text-[10px] text-gray-400/80 font-black uppercase mx-2 shrink-0">Моб</span>
                  {schema.variants.map((v) => {
                    const currentVariant = design.mobileVariant || design.variant || oldProps.variantOverride || schema.variants?.[0];
                    const isActive = currentVariant === v;
                    return (
                      <button
                        key={`mob-${v}`}
                        onClick={() => handleUpdateDesign({ mobileVariant: v, variant: undefined })}
                        className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200 ${isActive ? 'bg-white text-brand shadow border border-gray-100' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'}`}
                        title={`Вариант ${v} (Моб)`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100 shadow-inner">
                  <span className="text-[10px] text-gray-400/80 font-black uppercase mx-2 shrink-0">ПК</span>
                  {schema.variants.map((v) => {
                    const currentVariant = design.desktopVariant || design.variant || oldProps.variantOverride || schema.variants?.[0];
                    const isActive = currentVariant === v;
                    return (
                      <button
                        key={`desk-${v}`}
                        onClick={() => handleUpdateDesign({ desktopVariant: v, variant: undefined })}
                        className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200 ${isActive ? 'bg-white text-brand shadow border border-gray-100' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'}`}
                        title={`Вариант ${v} (ПК)`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {block.type !== 'HeroWidget' && <div className="w-px h-6 bg-gray-200 mx-1" />}

            <button onClick={toggleVisibility} className={`p-2 rounded-lg transition-colors ${isHidden ? 'text-orange-500 hover:bg-orange-50 bg-orange-50' : 'text-gray-500 hover:text-brand hover:bg-brand/10'}`} title={isHidden ? "Показать виджет" : "Скрыть виджет"}>
              {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="p-2 text-gray-500 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors" title="Настройки виджета">
              <Settings2 className="w-4 h-4" />
            </button>
            <button onClick={onRemove} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Удалить виджет">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button onClick={() => setIsWidgetEditorMinimized(true)} className="p-2 text-gray-500 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors" title="Свернуть">
              <Minimize2 className="w-4 h-4" />
            </button>
          </>
          )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-white shadow-2xl border border-gray-200 rounded-2xl z-[60] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <h4 className="text-sm font-bold text-gray-900">Настройки: {schema?.title || block.type}</h4>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto">
               <div className="mb-4 pb-4 border-b border-gray-100">
                 <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Отображение</h5>
                 <div className="mb-3">
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Где показывать</label>
                   <select
                     className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
                     value={config.visibilityTarget || oldProps.visibilityTarget || 'all'}
                     onChange={(e) => handleUpdateConfig({ visibilityTarget: e.target.value })}
                   >
                     <option value="all">Везде</option>
                     <option value="mobile">Только на мобильных</option>
                     <option value="desktop">Только на компьютерах</option>
                   </select>
                 </div>
                 <div className="mb-3">
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Кому показывать</label>
                   <select
                     className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
                     value={config.visibilityAuth || oldProps.visibilityAuth || 'all'}
                     onChange={(e) => handleUpdateConfig({ visibilityAuth: e.target.value })}
                   >
                     <option value="all">Всем пользователям</option>
                     <option value="auth">Только авторизованным</option>
                     <option value="guest">Только гостям (не авторизован)</option>
                   </select>
                 </div>
               </div>

               <div className="mb-4 pb-4 border-b border-gray-100">
                 <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Внешний вид</h5>
                 <div className="mb-3">
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Фон блока</label>
                   <select
                     className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
                     value={design.backgroundColor || oldProps.backgroundColor || 'default'}
                     onChange={(e) => handleUpdateDesign({ backgroundColor: e.target.value })}
                   >
                     <option value="default">Базовый (Прозрачный)</option>
                     <option value="white">Белый</option>
                     <option value="gray">Светло-серый</option>
                     <option value="brand">Бренд (Основной цвет)</option>
                     <option value="dark">Темный</option>
                   </select>
                 </div>
                 <div className="grid grid-cols-2 gap-3 mb-3">
                   <div>
                     <label className="block text-xs font-semibold text-gray-600 mb-1">Отступ сверху</label>
                     <select
                       className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
                       value={design.paddingTop || oldProps.paddingTop || 'default'}
                       onChange={(e) => handleUpdateDesign({ paddingTop: e.target.value })}
                     >
                       <option value="default">Стандартный</option>
                       <option value="none">Без отступа (0)</option>
                       <option value="small">Малый (s)</option>
                       <option value="large">Большой (l)</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-xs font-semibold text-gray-600 mb-1">Отступ снизу</label>
                     <select
                       className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-white"
                       value={design.paddingBottom || oldProps.paddingBottom || 'default'}
                       onChange={(e) => handleUpdateDesign({ paddingBottom: e.target.value })}
                     >
                       <option value="default">Стандартный</option>
                       <option value="none">Без отступа (0)</option>
                       <option value="small">Малый (s)</option>
                       <option value="large">Большой (l)</option>
                     </select>
                   </div>
                 </div>
               </div>

               <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Контент</h5>
               {schema?.props && schema.props.length > 0 ? (
                 schema.props.map(renderPropInput)
               ) : (
                 <p className="text-sm text-gray-500 italic pb-2 text-center">У виджета нет специфичных настроек</p>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

