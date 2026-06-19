import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { isContextualBottomNavPage } from '../lib/isContextualPage';
import {
  BottomNavClassicRegistry,
  BottomNavRegistry,
  resolveBottomNavVariant,
} from './BottomNavRegistry';
import { BottomNavFloatingShell } from './BottomNavFloatingShell';

interface BottomNavVariantsProps {
  isHidden: boolean;
}

export function BottomNavVariants({ isHidden }: BottomNavVariantsProps) {
  const location = useLocation();
  const storeVariant = useUISettingsStore((s) => s.bottomNavVariant);
  const actionAnimation =
    useUISettingsStore((s) => s.bottomNavActionAnimation) || 'pulse';

  const variant = resolveBottomNavVariant(storeVariant);

  if (isContextualBottomNavPage(location.pathname)) {
    return null;
  }

  if (variant === 'E') {
    const VariantE = BottomNavRegistry.E;
    return <VariantE isHidden={isHidden} actionAnimation={actionAnimation} />;
  }

  const ClassicContent = BottomNavClassicRegistry[variant];

  return (
    <BottomNavFloatingShell isHidden={isHidden} variant={variant}>
      <ClassicContent actionAnimation={actionAnimation} />
    </BottomNavFloatingShell>
  );
}
