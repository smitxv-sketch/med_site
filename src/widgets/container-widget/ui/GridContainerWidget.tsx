import React from 'react';
import { PageBlock } from '@/shared/types/block';
import { PageRenderer } from '@/shared/ui/PageRenderer';

interface GridContainerWidgetProps {
  columns?: string;
  gap?: string;
  childrenBlocks?: PageBlock[];
  onUpdateChildren?: (blocks: PageBlock[]) => void;
  isNested?: boolean;
}

export function GridContainerWidget({
  columns = '2',
  gap = 'default',
  childrenBlocks = [],
  onUpdateChildren,
  isNested
}: GridContainerWidgetProps) {
  let colsClass = 'grid-cols-1 md:grid-cols-2'; // Default
  if (columns === '1') colsClass = 'grid-cols-1';
  if (columns === '3') colsClass = 'grid-cols-1 md:grid-cols-3';
  if (columns === '4') colsClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

  let gapClass = 'gap-4 md:gap-8';
  if (gap === 'none') gapClass = 'gap-0';
  if (gap === 'small') gapClass = 'gap-2 md:gap-4';
  if (gap === 'large') gapClass = 'gap-8 md:gap-16';

  return (
    <div className="w-full">
      {/* Container widget orchestrates child blocks visually inside a grid */}
      <PageRenderer 
        blocks={childrenBlocks} 
        onUpdateBlocks={onUpdateChildren} 
        isNested={true}
        containerClassName={`grid ${colsClass} ${gapClass}`}
      />
      {(!childrenBlocks || childrenBlocks.length === 0) && (
        <div className="p-12 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center text-gray-500 w-full col-span-full">
          <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="font-medium">Пустая сетка (Grid Container)</span>
          <span className="text-sm opacity-70 mt-1">Добавьте дочерние блоки через панель настроек контейнера</span>
        </div>
      )}
    </div>
  );
}

export default GridContainerWidget;
