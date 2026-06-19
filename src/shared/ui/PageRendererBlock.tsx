import React, { Suspense } from 'react';
import type { PageBlock } from '@/shared/types/block';
import { SectionErrorBoundary } from '@/shared/ui/SectionErrorBoundary';
import { WidgetEditorWrapper } from '@/widgets/marketing-control-panel/ui/components/WidgetEditorWrapper';
import {
  getWidgetComponent,
  WIDGETS_REGISTRY,
} from '@/shared/config/widgetManifest';
import {
  applyAbTestVariant,
  buildBlockWrapperAttrs,
  mergeWidgetProps,
  processBlockData,
  resolveBlockVisibility,
  resolveReferenceBlock,
} from '@/shared/lib/pageRenderer';

interface PageRendererBlockProps {
  block: PageBlock;
  index: number;
  totalBlocks: number;
  isDevMode: boolean;
  contentContext?: unknown;
  references?: Record<string, PageBlock>;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onUpdateBlock: (updates: Partial<PageBlock>) => void;
  isEditable: boolean;
}

export function PageRendererBlock({
  block,
  index,
  totalBlocks,
  isDevMode,
  contentContext,
  references,
  onMoveUp,
  onMoveDown,
  onRemove,
  onUpdateBlock,
  isEditable,
}: PageRendererBlockProps) {
  const refResult = resolveReferenceBlock(block, references);
  if (!refResult) return null;

  if (refResult.missingRefId) {
    if (!isDevMode) return null;
    return (
      <div
        key={block.id}
        className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center"
      >
        Reference block not found: {refResult.missingRefId}
      </div>
    );
  }

  const blockToRender = applyAbTestVariant(refResult.block, isDevMode);

  const WidgetComponent = getWidgetComponent(blockToRender.type);
  if (!WidgetComponent) {
    if (!isDevMode) return null;
    return (
      <div
        key={blockToRender.id}
        className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center"
      >
        Виджет &quot;{blockToRender.type}&quot; не найден или был удален.
      </div>
    );
  }

  const processed = processBlockData(blockToRender, contentContext);
  const visibility = resolveBlockVisibility(processed, {
    isDevMode,
    contentContext,
  });
  if (visibility.isHidden) return null;

  const mergedWidgetProps = mergeWidgetProps({
    block: blockToRender,
    ...processed,
    onUpdateChildren: (children) => onUpdateBlock({ children }),
  });

  const title =
    WIDGETS_REGISTRY[blockToRender.type]?.title || blockToRender.type;
  const wrapperAttrs = buildBlockWrapperAttrs(
    blockToRender,
    processed,
    visibility.visibilityClass
  );

  const widgetTree = (
    <SectionErrorBoundary fallbackMessage={`Не удалось загрузить ${title}.`}>
      <Suspense
        fallback={
          <div className="w-full h-32 flex items-center justify-center bg-gray-50/50 animate-pulse rounded-[var(--app-radius)] border border-gray-100" />
        }
      >
        <WidgetComponent {...mergedWidgetProps} />
      </Suspense>
    </SectionErrorBoundary>
  );

  const renderedContent = isEditable ? (
      <WidgetEditorWrapper
        block={blockToRender}
        index={index}
        totalBlocks={totalBlocks}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onRemove={onRemove}
        onUpdateProps={(props) => onUpdateBlock({ props })}
        onUpdateBlock={onUpdateBlock}
      >
        {widgetTree}
      </WidgetEditorWrapper>
    ) : (
      widgetTree
    );

  return (
    <div key={blockToRender.id} {...wrapperAttrs}>
      {renderedContent}
    </div>
  );
}
