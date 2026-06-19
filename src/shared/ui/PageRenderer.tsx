import React, { Suspense } from 'react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { PageBlock } from '@/shared/types/block';
import { SectionErrorBoundary } from '@/shared/ui/SectionErrorBoundary';
import { WidgetEditorWrapper } from '@/widgets/marketing-control-panel/ui/components/WidgetEditorWrapper';
import {
  WIDGETS_REGISTRY,
  getWidgetComponent,
} from '@/shared/config/widgetManifest';
import { hydrateProps } from '@/shared/lib/dataBinding';
import { useSEO } from '@/shared/lib/seo/useSEO';
import { useCmsStore } from '@/shared/store/cmsStore';

interface PageRendererProps {
  blocks: PageBlock[];
  onUpdateBlocks?: (blocks: PageBlock[]) => void;
  isNested?: boolean;
  contentContext?: any;
  containerClassName?: string;
  references?: Record<string, PageBlock>;
  forceDevMode?: boolean;
}

export function PageRenderer({ blocks, onUpdateBlocks, isNested = false, contentContext, containerClassName, references, forceDevMode }: PageRendererProps) {
  const storeDevMode = useUISettingsStore(state => state.isDevMode);
  const isCommandCenterUnlocked = useUISettingsStore(state => state.isCommandCenterUnlocked);
  const isDevMode = forceDevMode ?? (storeDevMode || isCommandCenterUnlocked);
  
  // Use SEO only on top-level renderer
  const pageSeo = useCmsStore(state => state.pageSeo);
  useSEO(!isNested ? pageSeo.title : '', !isNested ? pageSeo.description : '');

  const handleUpdateBlock = (index: number, updates: Partial<PageBlock>) => {
    if (!onUpdateBlocks) return;
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    onUpdateBlocks(newBlocks);
  };

  const handleMoveUp = (index: number) => {
    if (!onUpdateBlocks || index === 0) return;
    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    onUpdateBlocks(newBlocks);
  };

  const handleMoveDown = (index: number) => {
    if (!onUpdateBlocks || index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    onUpdateBlocks(newBlocks);
  };

  const handleRemove = (index: number) => {
    if (!onUpdateBlocks) return;
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    onUpdateBlocks(newBlocks);
  };

  // Utility to replace {{key}} with value from contentContext (Stage 4 will replace this)
  const processData = (data: any, bindings: Record<string, string> | undefined): any => {
    if (!data) return data;
    return hydrateProps(data, bindings, contentContext);
  };

  return (
    <div className={containerClassName || (isNested ? "flex flex-col gap-4" : "flex flex-col gap-12 sm:gap-16 lg:gap-24")}>
      {blocks.map((block, index) => {
        // Stage 6: Reference Blocks handling
        let blockToRender = block;
        if (block.type === 'ReferenceWidget' && block.config?.refId && references) {
          const refBlock = references[block.config.refId];
          if (refBlock) {
             blockToRender = { 
               ...refBlock, 
               id: block.id, // keep the unique id of the reference wrapper
               config: { ...refBlock.config, ...block.config }
             };
          } else if (isDevMode) {
             return <div key={block.id} className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center">Reference block not found: {block.config.refId}</div>;
          } else {
             return null;
          }
        }

        const WidgetComponent = getWidgetComponent(blockToRender.type);
        if (!WidgetComponent) {
          if (isDevMode) {
            return (
              <div key={blockToRender.id} className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center">
                Виджет "{blockToRender.type}" не найден или был удален.
              </div>
            );
          }
          return null;
        }

        // Stage 5: A/B Testing handling (Simple randomization based on weight)
        if (blockToRender.variants && blockToRender.variants.length > 0 && !isDevMode) {
          const totalWeight = blockToRender.variants.reduce((sum, v) => sum + (v.weight || 0), 0);
          let random = Math.random() * totalWeight;
          let selectedVariant = null;
          for (const variant of blockToRender.variants) {
            if (random < (variant.weight || 0)) {
              selectedVariant = variant;
              break;
            }
            random -= (variant.weight || 0);
          }
          if (selectedVariant) {
            blockToRender = {
              ...blockToRender,
              content: { ...blockToRender.content, ...selectedVariant.content },
              design: { ...blockToRender.design, ...selectedVariant.design }
            };
          }
        }

        const processedContent = processData(blockToRender.content, blockToRender.bind) || {};
        const processedProps = processData(blockToRender.props, blockToRender.bind) || {}; // Fallback for old widgets
        const design = blockToRender.design || {};
        const config = blockToRender.config || {};
        
        let visibilityClass = '';
        const target = config.visibilityTarget || processedProps.visibilityTarget;
        const authRules = config.visibilityAuth || processedProps.visibilityAuth;
        const hidden = config.hidden ?? processedProps.hidden;
        const visibilityRule = config.visibilityRule;
        
        if (!isDevMode) {
          if (hidden) return null;
          if (target === 'mobile') visibilityClass = 'md:hidden block';
          if (target === 'desktop') visibilityClass = 'hidden md:block';
          
          if (authRules === 'auth') {
             // In real app useAuth(). Here just allow everything or mock
          }

          if (visibilityRule) {
             try {
                // Stage 6: Extremely simple Rules Engine POC
                const fn = new Function('context', `with(context) { return ${visibilityRule}; }`);
                const isVisible = fn({ context: contentContext || {} });
                if (!isVisible) return null;
             } catch (e) {
                console.warn('Visibility rule execution failed:', e);
             }
          }
        }

        const title = WIDGETS_REGISTRY[blockToRender.type]?.title || blockToRender.type;
        
        // Merge them for the widget component (temporarily, until we refactor widgets)
        const mergedWidgetProps = {
          ...processedProps,
          ...processedContent,
          ...design,
          childrenBlocks: blockToRender.children,
          slots: blockToRender.slots, // Stage 6: Named slots integration
          onUpdateChildren: (newChildren: PageBlock[]) => handleUpdateBlock(index, { children: newChildren }),
        };

        const content = (
          <WidgetEditorWrapper 
            key={blockToRender.id} 
            block={blockToRender}
            index={index}
            totalBlocks={blocks.length}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
            onRemove={() => handleRemove(index)}
            onUpdateProps={(props) => handleUpdateBlock(index, { props })} // Temporary fallback
            onUpdateBlock={(updates) => handleUpdateBlock(index, updates)}
          >
            <SectionErrorBoundary fallbackMessage={`Не удалось загрузить ${title}.`}>
              <Suspense fallback={<div className="w-full h-32 flex items-center justify-center bg-gray-50/50 animate-pulse rounded-[var(--app-radius)] border border-gray-100"></div>}>
                <WidgetComponent {...mergedWidgetProps} />
              </Suspense>
            </SectionErrorBoundary>
          </WidgetEditorWrapper>
        );

        const renderedContent = (isDevMode && onUpdateBlocks) ? content : (
          <SectionErrorBoundary fallbackMessage={`Не удалось загрузить ${title}.`}>
            <Suspense fallback={<div className="w-full h-32 flex items-center justify-center bg-gray-50/50 animate-pulse rounded-[var(--app-radius)] border border-gray-100"></div>}>
              <WidgetComponent {...mergedWidgetProps} />
            </Suspense>
          </SectionErrorBoundary>
        );
        
        // Stage 5: Advanced block styling using data attributes
        const themeBg = design.backgroundColor || processedProps.backgroundColor;
        const paddingTop = design.paddingTop || processedProps.paddingTop;
        const paddingBottom = design.paddingBottom || processedProps.paddingBottom;

        // Even without visibility/theme we MUST return a wrapper so we can attach X-Ray attributes
        return (
          <div 
            key={blockToRender.id} 
            className={visibilityClass || undefined}
            data-theme={themeBg || undefined}
            data-spacing-top={paddingTop || undefined}
            data-spacing-bottom={paddingBottom || undefined}
            data-block-id={blockToRender.id}
            data-block-type={blockToRender.type}
          >
            {renderedContent}
          </div>
        );
      })}
      
      {isDevMode && onUpdateBlocks && (
        <div className={`flex justify-center mt-4 ${isNested ? 'pb-2' : 'pb-8'}`}>
           <AddBlockButton onAdd={(type) => {
              const newId = `widget-${Date.now()}`;
              onUpdateBlocks([...blocks, { id: newId, type, props: {} }]);
           }} />
        </div>
      )}
    </div>
  );
}

function AddBlockButton({ onAdd }: { onAdd: (type: string) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button 
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-white border border-gray-200 border-dashed rounded-xl text-gray-500 hover:text-brand transition-all hover:shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        <span className="font-medium">Добавить блок</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-900">Выберите виджет</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
              {Object.keys(WIDGETS_REGISTRY).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                     onAdd(type);
                     setIsOpen(false);
                  }}
                  className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-100 rounded-xl hover:border-brand hover:bg-brand/5 transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-brand"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{WIDGETS_REGISTRY[type]?.title || type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
