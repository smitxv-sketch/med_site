import type { CoverImageDto } from '../types/contentCatalog.js';

/** Strapi v5 media field (упрощённый) */
interface StrapiMediaNode {
  url?: string;
  alternativeText?: string;
  formats?: Record<string, { url?: string }>;
}

type StrapiMediaField =
  | StrapiMediaNode
  | { data?: StrapiMediaNode | null }
  | null
  | undefined;

function resolveMediaUrl(node?: StrapiMediaNode | null): string | undefined {
  if (!node?.url) return undefined;
  return node.url;
}

/** Собирает DTO обложки: десктоп + опционально мобайл */
export function mapStrapiCover(
  desktop?: StrapiMediaField,
  mobile?: StrapiMediaField,
): CoverImageDto | undefined {
  const deskNode =
    desktop && 'data' in desktop ? desktop.data ?? undefined : desktop ?? undefined;
  const mobileNode =
    mobile && 'data' in mobile ? mobile.data ?? undefined : mobile ?? undefined;

  const url = resolveMediaUrl(deskNode as StrapiMediaNode);
  const mobileUrl = resolveMediaUrl(mobileNode as StrapiMediaNode);
  if (!url && !mobileUrl) return undefined;

  return {
    url: url ?? mobileUrl!,
    mobileUrl: mobileUrl && mobileUrl !== url ? mobileUrl : undefined,
    alt: (deskNode as StrapiMediaNode)?.alternativeText,
  };
}
