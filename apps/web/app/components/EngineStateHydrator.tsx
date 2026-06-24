'use client';

import type { EngineState } from '@med-site/contracts';
import { useLayoutEffect } from 'react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';

interface EngineStateHydratorProps {
  engineState: EngineState;
}

/**
 * Гидратация темы с сервера (Strapi → BFF → SSR).
 * Command Center на проде отключён — только read-only тема.
 */
export function EngineStateHydrator({ engineState }: EngineStateHydratorProps) {
  useLayoutEffect(() => {
    useUISettingsStore.setState({
      ...engineState,
      isDevMode: false,
      isCommandCenterUnlocked: false,
      isCommandCenterOpen: false,
      hasUnsavedChanges: false,
    });
  }, [engineState]);

  return null;
}
