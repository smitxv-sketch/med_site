'use client';

import type { CoverImageDto } from '@med-site/contracts';

/** Десктоп / мобайл: если есть mobileUrl — отдаём через picture */
export function CoverPicture({
  cover,
  className,
  imgClassName,
}: {
  cover?: CoverImageDto;
  className?: string;
  imgClassName?: string;
}) {
  if (!cover?.url) return null;

  if (cover.mobileUrl) {
    return (
      <picture className={className}>
        <source media="(max-width: 767px)" srcSet={cover.mobileUrl} />
        <img
          src={cover.url}
          alt={cover.alt ?? ''}
          className={imgClassName}
          loading="lazy"
        />
      </picture>
    );
  }

  return (
    <img
      src={cover.url}
      alt={cover.alt ?? ''}
      className={imgClassName}
      loading="lazy"
    />
  );
}
