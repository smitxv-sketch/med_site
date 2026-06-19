import type { BlockProcessedData } from './mergeWidgetProps';
import type { PageBlock } from '@/shared/types/block';

export interface BlockWrapperAttrs {
  className?: string;
  'data-theme'?: string;
  'data-spacing-top'?: string;
  'data-spacing-bottom'?: string;
  'data-block-id': string;
  'data-block-type': string;
}

export function buildBlockWrapperAttrs(
  block: PageBlock,
  data: BlockProcessedData,
  visibilityClass: string
): BlockWrapperAttrs {
  const { processedProps, design } = data;
  const themeBg = design.backgroundColor || processedProps.backgroundColor;
  const paddingTop = design.paddingTop || processedProps.paddingTop;
  const paddingBottom = design.paddingBottom || processedProps.paddingBottom;

  return {
    className: visibilityClass || undefined,
    'data-theme': (themeBg as string) || undefined,
    'data-spacing-top': (paddingTop as string) || undefined,
    'data-spacing-bottom': (paddingBottom as string) || undefined,
    'data-block-id': block.id,
    'data-block-type': block.type,
  };
}
