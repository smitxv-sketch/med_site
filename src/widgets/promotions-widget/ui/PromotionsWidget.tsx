import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usePromotionsRepository } from '@/shared/di/DIContext';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { VariantSwitcher } from '@/shared/ui/VariantSwitcher';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { PromotionsVariantRegistry } from './PromotionsWidgetVariants';
import { Container } from '@/shared/ui/Container';
import { AnimatePresence, motion } from 'framer-motion';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive' | 'trust-building';
export type WidgetLayout = 'grid' | 'masonry' | 'bento' | 'carousel' | 'split' | 'accordion' | 'list' | 'compact';

export interface PromotionsWidgetProps {
  directionId?: string;
  limit?: number;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: string; // legacy
  variant?: string; // legacy
  layoutPattern?: string; // legacy
  title?: string;
  subtitle?: string;
  intent?: WidgetIntent;
}

export function PromotionsWidget({ directionId, limit, variantOverride, variant, desktopVariant, mobileVariant, title, subtitle, intent, layoutPattern }: PromotionsWidgetProps) {
  const promotionsRepository = usePromotionsRepository();
  const { data: allPromotions = [], isLoading } = useQuery({
    queryKey: ['promotions'],
    queryFn: () => promotionsRepository.getPromotions(),
  });
  
  const { promotionsSectionVariant } = useUISettingsStore();
  
  // Resolve legacy/new mappings to existing internal layout types ('A', 'B', 'C', 'D', 'E')
  const mapVariant = (v: string | undefined, defaultVal: string) => {
    if (!v) return defaultVal;
    if (v === 'grid') return 'D';
    if (v === 'carousel') return 'B';
    if (v === 'compact') return 'E';
    if (v === 'classic') return 'A';
    if (['A', 'B', 'C', 'D', 'E'].includes(v)) return v; // directly passed legacy variant
    return defaultVal;
  };

  const resolvedDesktopVariant = mapVariant(desktopVariant || layoutPattern || variant || variantOverride || promotionsSectionVariant, 'D');
  const resolvedMobileVariant = mapVariant(mobileVariant || layoutPattern || variant || variantOverride || promotionsSectionVariant, 'B');

  const promotions = React.useMemo(() => {
    let proms = allPromotions;
    if (directionId) {
      proms = proms.filter(p => !p.directionId || p.directionId === directionId);
    }
    if (limit) {
      proms = proms.slice(0, limit);
    }
    return proms;
  }, [allPromotions, directionId, limit]);

  if (isLoading) {
    return (
    <Container>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Акции</h2>
        </div>
        <div className="bg-gray-100 rounded-3xl h-64 animate-pulse" />
      </section>
    </Container>
    );
  }

  const DesktopComponent = PromotionsVariantRegistry[resolvedDesktopVariant] || PromotionsVariantRegistry.D;
  const MobileComponent = PromotionsVariantRegistry[resolvedMobileVariant] || PromotionsVariantRegistry.B;

  return (
    <Container>
      <section data-marketing-block="true" className="relative">
        <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title || 'Акции'}</h2>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        <Button as={Link} to="/promotions" variant="secondary" size="sm" className="shrink-0">
          <span className="hidden sm:inline">Все акции</span>
          <span className="inline sm:hidden">Все</span>
          <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
        </Button>
      </div>
      
      <div className="relative">
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`desktop-${resolvedDesktopVariant}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <DesktopComponent promotions={promotions} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${resolvedMobileVariant}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <MobileComponent promotions={promotions} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
    </Container>
  );
}
