import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { useQuickActionsRepository } from '@/shared/di/DIContext';
import { CategoriesVariantRegistry } from './CategoriesVariants';
import { Container } from '@/shared/ui/Container';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

export interface CategoriesWidgetProps {
  intent?: WidgetIntent;
  desktopVariant?: string;
  mobileVariant?: string;
  layoutPattern?: WidgetLayoutPattern; // legacy
}

export function CategoriesWidget({ intent, desktopVariant = 'cards', mobileVariant = 'carousel', layoutPattern }: CategoriesWidgetProps = {}) {
  const { quickActionsVariant } = useUISettingsStore();
  const quickActionsRepository = useQuickActionsRepository();

  const { data: actions = [], isLoading } = useQuery({
    queryKey: ['quick_actions'],
    queryFn: () => quickActionsRepository.getQuickActions(),
  });

  let activeVariant = quickActionsVariant;
  
  if (desktopVariant || layoutPattern) {
    const p = desktopVariant || layoutPattern;
    if (p === 'grid' || p === 'fluid' || p === 'cards') activeVariant = 'A'; // cards
    else if (p === 'split' || p === 'stack' || p === 'pills') activeVariant = 'B'; // pills
    else if (p === 'bento') activeVariant = 'C';
  } else if (intent) {
    if (intent === 'educational') activeVariant = 'B';
    else if (intent === 'direct-response') activeVariant = 'A';
    else if (intent === 'immersive') activeVariant = 'C';
  }

  if (activeVariant === 'none') {
    return null;
  }

  const finalMobile = mobileVariant || layoutPattern || 'carousel';

  // Fallback to Variant A while loading or if it's the requested variant
  const VariantComponent = CategoriesVariantRegistry[activeVariant] || CategoriesVariantRegistry.A;
  return (
    <div data-marketing-block="true" data-variant={activeVariant} data-mobile-variant={finalMobile}>
      <Container>
        <VariantComponent actions={actions} />
      </Container>
    </div>
  );
}

