import type { PageBlock } from '@/shared/types/block';

export interface ReferenceBlockResult {
  block: PageBlock;
  missingRefId?: string;
}

/** Разворачивает ReferenceWidget в целевой блок */
export function resolveReferenceBlock(
  block: PageBlock,
  references?: Record<string, PageBlock>
): ReferenceBlockResult | null {
  if (block.type !== 'ReferenceWidget' || !block.config?.refId) {
    return { block };
  }

  if (!references) {
    return { block, missingRefId: block.config.refId };
  }

  const refBlock = references[block.config.refId];
  if (!refBlock) {
    return { block, missingRefId: block.config.refId };
  }

  return {
    block: {
      ...refBlock,
      id: block.id,
      config: { ...refBlock.config, ...block.config },
    },
  };
}
