import type { PageBlock } from '@/shared/types/block';

/** Выбирает A/B-вариант блока по weight (только production) */
export function applyAbTestVariant(
  block: PageBlock,
  isDevMode: boolean
): PageBlock {
  if (isDevMode || !block.variants?.length) {
    return block;
  }

  const totalWeight = block.variants.reduce(
    (sum, variant) => sum + (variant.weight || 0),
    0
  );
  if (totalWeight <= 0) return block;

  let random = Math.random() * totalWeight;
  let selected = block.variants[0];

  for (const variant of block.variants) {
    if (random < (variant.weight || 0)) {
      selected = variant;
      break;
    }
    random -= variant.weight || 0;
  }

  if (!selected) return block;

  return {
    ...block,
    content: { ...block.content, ...selected.content },
    design: { ...block.design, ...selected.design },
  };
}
