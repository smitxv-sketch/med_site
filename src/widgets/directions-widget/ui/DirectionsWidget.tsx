import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDirectionsRepository } from '@/shared/di/DIContext';
import { ArrowRight } from 'lucide-react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { VariantSwitcher } from '@/shared/ui/VariantSwitcher';
import { Button } from '@/shared/ui/Button';
import { DirectionsRegistry } from './DirectionsWidgetVariants';
import { resolveWidgetVariants } from '@/shared/lib/widgets/resolveWidgetVariant';
import {
  DIRECTIONS_VARIANT_ALIASES,
  DIRECTIONS_VALID_VARIANTS,
} from '@/shared/lib/widgets/variantAliases';

import { Container } from '@/shared/ui/Container';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive' | 'trust-building';
export type WidgetLayout = 'grid' | 'masonry' | 'bento' | 'carousel' | 'split' | 'accordion' | 'list' | 'compact';

export interface DirectionsWidgetProps {
  limit?: number;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: string; // legacy
  variant?: string; // legacy
  iconVariantOverride?: string;
  layoutPattern?: string; // legacy
  title?: string;
  subtitle?: string;
  intent?: WidgetIntent;
}

export function DirectionsWidget({ limit, variantOverride, variant, desktopVariant, mobileVariant, iconVariantOverride, title, subtitle, intent, layoutPattern }: DirectionsWidgetProps) {
  const directionsRepository = useDirectionsRepository();
  const { data: allDirections = [], isLoading } = useQuery({
    queryKey: ['directions'],
    queryFn: () => directionsRepository.getDirections(),
  });

  const directions = limit ? allDirections.slice(0, limit) : allDirections;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllServicesFor, setShowAllServicesFor] = useState<string | null>(null);

  const { directionsSectionVariant, directionsIconVariant } = useUISettingsStore();
  
  const { desktop: resolvedDesktopVariant, mobile: resolvedMobileVariant } =
    resolveWidgetVariants(
      {
        desktopVariant,
        mobileVariant,
        layoutPattern,
        variant,
        variantOverride,
        globalFallback: directionsSectionVariant,
      },
      {
        defaultValue: 'A',
        aliasMap: DIRECTIONS_VARIANT_ALIASES,
        validValues: DIRECTIONS_VALID_VARIANTS,
      },
      {
        defaultValue: 'A',
        aliasMap: DIRECTIONS_VARIANT_ALIASES,
        validValues: DIRECTIONS_VALID_VARIANTS,
      }
    );

  const iconVariant = (iconVariantOverride || directionsIconVariant) as 'A' | 'B' | 'C';

  if (isLoading) {
    return (
    <Container>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Направления</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      </section>
    </Container>
    );
  }

  const DesktopComponent = DirectionsRegistry[resolvedDesktopVariant as keyof typeof DirectionsRegistry] || DirectionsRegistry.A;
  const MobileComponent = DirectionsRegistry[resolvedMobileVariant as keyof typeof DirectionsRegistry] || DirectionsRegistry.A;

  return (
    <Container>
    <section data-marketing-block="true">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-wrap items-center gap-[var(--spacing-app,16px)]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title || 'Направления'}</h2>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        <Button as={Link} to="/services" variant="secondary" size="sm" className="shrink-0">
          <span className="hidden sm:inline">Все услуги</span>
          <span className="inline sm:hidden">Все</span>
          <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
        </Button>
      </div>

      <div className="relative">
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`desktop-${resolvedDesktopVariant}-${iconVariant}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DesktopComponent 
                directions={directions} 
                iconVariant={iconVariant} 
                expandedId={expandedId} 
                setExpandedId={setExpandedId} 
                showAllServicesFor={showAllServicesFor} 
                setShowAllServicesFor={setShowAllServicesFor} 
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${resolvedMobileVariant}-${iconVariant}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MobileComponent 
                directions={directions} 
                iconVariant={iconVariant} 
                expandedId={expandedId} 
                setExpandedId={setExpandedId} 
                showAllServicesFor={showAllServicesFor} 
                setShowAllServicesFor={setShowAllServicesFor} 
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
    </Container>
  );
}
