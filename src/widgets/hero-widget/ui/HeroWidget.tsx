import React from 'react';
import { HeroSection } from './HeroSection';
import { HeroImmersive } from './HeroImmersive';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { Container } from '@/shared/ui/Container';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

export interface HeroWidgetProps {
  variantOverride?: string;
  variant?: string;
  desktopVariant?: string;
  mobileVariant?: string;
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayoutPattern;
}

export function HeroWidget({
  variantOverride,
  variant,
  desktopVariant,
  mobileVariant,
  intent,
  layoutPattern,
}: HeroWidgetProps = {}) {
  const { homePageConcept, heroDesktopVariant } = useUISettingsStore();

  let finalConcept = homePageConcept;

  if (variant === 'A' || variantOverride === 'A') {
    finalConcept = 'classic';
  } else if (variant === 'B' || variantOverride === 'B') {
    finalConcept = 'immersive';
  } else if (
    intent === 'immersive' ||
    layoutPattern === 'fluid' ||
    layoutPattern === 'stack'
  ) {
    finalConcept = 'immersive';
  } else if (intent || layoutPattern) {
    finalConcept = 'classic';
  }

  const hero =
    finalConcept === 'immersive' ? (
      <HeroImmersive />
    ) : (
      <HeroSection
        desktopVariant={desktopVariant}
        mobileVariant={mobileVariant}
      />
    );

  if (heroDesktopVariant === 'D' && finalConcept !== 'immersive') {
    return hero;
  }

  return <Container>{hero}</Container>;
}
