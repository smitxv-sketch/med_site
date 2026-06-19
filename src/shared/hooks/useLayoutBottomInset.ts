import { useEffect } from 'react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import {
  BOTTOM_NAV_THEME,
} from '@/widgets/bottom-nav/config/bottomNavTheme';

/**
 * Синхронизирует CSS-переменную --layout-bottom-inset с активным вариантом bottom nav.
 * Единая точка для отступа контента под нижнее меню (задел на будущие варианты).
 */
export function useLayoutBottomInset() {
  const bottomNavVariant = useUISettingsStore((s) => s.bottomNavVariant);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--bottom-nav-bar-height',
      `${BOTTOM_NAV_THEME.barHeight}px`
    );
    root.style.setProperty(
      '--bottom-nav-content-gap',
      `${BOTTOM_NAV_THEME.contentGap}px`
    );

    const padding =
      bottomNavVariant === 'E'
        ? BOTTOM_NAV_THEME.contentPaddingExpr
        : BOTTOM_NAV_THEME.legacyContentPaddingExpr;

    root.style.setProperty('--layout-bottom-inset', padding);
  }, [bottomNavVariant]);
}
