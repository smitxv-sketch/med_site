import type { PageBlock } from '@med-site/contracts';

/** Детерминированный выбор варианта A/B по seed (cookie / query / день) */
function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function applyVariant(block: PageBlock, variantId: string): PageBlock {
  const variant = block.abVariants?.find((v) => v.id === variantId);
  if (!variant) return block;

  return {
    ...block,
    content: { ...block.content, ...variant.content },
    design: { ...block.design, ...variant.design },
  };
}

/** Применяет block-level A/B к дереву блоков */
export function applyBlockAbTests(
  blocks: PageBlock[],
  seed: string,
  forced?: Record<string, string>,
): PageBlock[] {
  return blocks.map((block) => {
    let resolved = block;

    if (block.abVariants?.length) {
      const forcedId = forced?.[block.id];
      const pick =
        forcedId ??
        block.abVariants[hashSeed(`${seed}:${block.id}`) % block.abVariants.length]?.id;
      if (pick) resolved = applyVariant(block, pick);
    }

    if (resolved.children?.length) {
      return {
        ...resolved,
        children: applyBlockAbTests(resolved.children, seed, forced),
      };
    }

    return resolved;
  });
}

export function parseAbForceQuery(
  abParam: string | undefined,
): Record<string, string> | undefined {
  if (!abParam) return undefined;
  const map: Record<string, string> = {};
  for (const pair of abParam.split(',')) {
    const [blockId, variantId] = pair.split(':');
    if (blockId && variantId) map[blockId.trim()] = variantId.trim();
  }
  return Object.keys(map).length ? map : undefined;
}
