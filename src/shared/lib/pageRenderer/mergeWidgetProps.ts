import { hydrateProps } from '@/shared/lib/dataBinding';
import type { PageBlock } from '@/shared/types/block';

export interface BlockProcessedData {
  processedContent: Record<string, unknown>;
  processedProps: Record<string, unknown>;
  design: NonNullable<PageBlock['design']>;
  config: NonNullable<PageBlock['config']>;
}

export function processBlockData(
  block: PageBlock,
  contentContext?: unknown
): BlockProcessedData {
  const hydrate = (data: unknown) =>
    hydrateProps(
      data as Record<string, unknown> | undefined,
      block.bind,
      contentContext
    ) || {};

  return {
    processedContent: hydrate(block.content) as Record<string, unknown>,
    processedProps: hydrate(block.props) as Record<string, unknown>,
    design: block.design || {},
    config: block.config || {},
  };
}

export interface MergeWidgetPropsInput extends BlockProcessedData {
  block: PageBlock;
  onUpdateChildren: (children: PageBlock[]) => void;
}

/** content + design + config + legacy props → props для WidgetComponent */
export function mergeWidgetProps({
  block,
  processedContent,
  processedProps,
  design,
  onUpdateChildren,
}: MergeWidgetPropsInput): Record<string, unknown> {
  return {
    ...processedProps,
    ...processedContent,
    ...design,
    childrenBlocks: block.children,
    slots: block.slots,
    onUpdateChildren,
  };
}
