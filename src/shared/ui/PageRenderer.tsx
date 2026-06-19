import React from 'react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { PageBlock } from '@/shared/types/block';
import { useSEO } from '@/shared/lib/seo/useSEO';
import { useCmsStore } from '@/shared/store/cmsStore';
import { PageRendererBlock } from '@/shared/ui/PageRendererBlock';
import { PageRendererAddBlockButton } from '@/shared/ui/PageRendererAddBlockButton';

interface PageRendererProps {
  blocks: PageBlock[];
  onUpdateBlocks?: (blocks: PageBlock[]) => void;
  isNested?: boolean;
  contentContext?: unknown;
  containerClassName?: string;
  references?: Record<string, PageBlock>;
  forceDevMode?: boolean;
}

export function PageRenderer({
  blocks,
  onUpdateBlocks,
  isNested = false,
  contentContext,
  containerClassName,
  references,
  forceDevMode,
}: PageRendererProps) {
  const storeDevMode = useUISettingsStore((state) => state.isDevMode);
  const isCommandCenterUnlocked = useUISettingsStore(
    (state) => state.isCommandCenterUnlocked
  );
  const isDevMode = forceDevMode ?? (storeDevMode || isCommandCenterUnlocked);

  const pageSeo = useCmsStore((state) => state.pageSeo);
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
    [newBlocks[index - 1], newBlocks[index]] = [
      newBlocks[index],
      newBlocks[index - 1],
    ];
    onUpdateBlocks(newBlocks);
  };

  const handleMoveDown = (index: number) => {
    if (!onUpdateBlocks || index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    [newBlocks[index + 1], newBlocks[index]] = [
      newBlocks[index],
      newBlocks[index + 1],
    ];
    onUpdateBlocks(newBlocks);
  };

  const handleRemove = (index: number) => {
    if (!onUpdateBlocks) return;
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    onUpdateBlocks(newBlocks);
  };

  const isEditable = Boolean(isDevMode && onUpdateBlocks);

  return (
    <div
      className={
        containerClassName ||
        (isNested
          ? 'flex flex-col gap-4'
          : 'flex flex-col gap-12 sm:gap-16 lg:gap-24')
      }
    >
      {blocks.map((block, index) => (
        <PageRendererBlock
          key={block.id}
          block={block}
          index={index}
          totalBlocks={blocks.length}
          isDevMode={isDevMode}
          isEditable={isEditable}
          contentContext={contentContext}
          references={references}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
          onRemove={() => handleRemove(index)}
          onUpdateBlock={(updates) => handleUpdateBlock(index, updates)}
        />
      ))}

      {isEditable && (
        <div
          className={`flex justify-center mt-4 ${isNested ? 'pb-2' : 'pb-8'}`}
        >
          <PageRendererAddBlockButton
            onAdd={(type) => {
              const newId = `widget-${Date.now()}`;
              onUpdateBlocks!([...blocks, { id: newId, type, props: {} }]);
            }}
          />
        </div>
      )}
    </div>
  );
}
