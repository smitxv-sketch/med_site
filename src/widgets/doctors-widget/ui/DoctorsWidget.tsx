import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDoctorsRepository } from '@/shared/di/DIContext';
import { Doctor } from '@/widget/types';
import { formatSpecialty } from '@/widget/utils/formatters';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { DoctorsVariantRegistry } from './DoctorsWidgetVariants';
import { resolveWidgetVariants } from '@/shared/lib/widgets/resolveWidgetVariant';
import {
  DOCTORS_VARIANT_ALIASES,
  DOCTORS_VALID_VARIANTS,
} from '@/shared/lib/widgets/variantAliases';
import { ProcessedDoctor } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

export interface DoctorsWidgetProps {
  directionId?: string;
  limit?: number;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: string; // legacy
  variant?: string; // legacy
  title?: string;
  subtitle?: string;
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayoutPattern;
}

export function DoctorsWidget({ directionId, limit, variantOverride, variant, desktopVariant, mobileVariant, title, subtitle, intent, layoutPattern }: DoctorsWidgetProps) {
  const globalVariant = useUISettingsStore(state => state.doctorsSectionVariant);
  const doctorsRepository = useDoctorsRepository();

  const { desktop: resolvedDesktopVariant, mobile: resolvedMobileVariant } =
    resolveWidgetVariants(
      {
        desktopVariant,
        mobileVariant,
        layoutPattern,
        variant,
        variantOverride,
        globalFallback: globalVariant,
      },
      {
        defaultValue: 'A',
        aliasMap: DOCTORS_VARIANT_ALIASES,
        validValues: DOCTORS_VALID_VARIANTS,
      },
      {
        defaultValue: 'A',
        aliasMap: DOCTORS_VARIANT_ALIASES,
        validValues: DOCTORS_VALID_VARIANTS,
      }
    );

  const { data: doctors, isLoading } = useQuery<Doctor[]>({
    queryKey: ['doctors', directionId],
    queryFn: async () => {
      const allDocs = await doctorsRepository.getAllDoctors();
      // Mock filtering if needed based on directionId
      // Because we don't have getDoctorsByDirectionId yet.
      if (directionId) {
        // e.g. return allDocs.filter(d => d.specialty === directionId);
        // For now, return all since we don't know the mapping.
        // Actually, we can check if offering branch starts with directionId or something
        // Just return all for mock
        return allDocs;
      }
      return allDocs;
    }
  });

  const processedDoctors = useMemo(() => {
    if (!doctors) return [];
    let docs = doctors.map((d: Doctor): ProcessedDoctor => {
      const cleanedSpec = formatSpecialty(d.specialty || '');
      
      // Имитация акции
      const charCode = d.id.charCodeAt(0) || 0;
      const isPromo = charCode % 4 === 0;

      return {
        ...d,
        displaySpecialty: cleanedSpec || d.specialty || d.position || '',
        isPromo
      };
    });

    if (limit) {
      docs = docs.slice(0, limit);
    }
    return docs;
  }, [doctors, limit]);

  const DesktopComponent = DoctorsVariantRegistry[resolvedDesktopVariant] || DoctorsVariantRegistry.A;
  const MobileComponent = DoctorsVariantRegistry[resolvedMobileVariant] || DoctorsVariantRegistry.A;

  return (
    <Container>
      <div data-marketing-block="true" className="relative">
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
               key={`desktop-${resolvedDesktopVariant}`}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               transition={{ duration: 0.25 }}
            >
              <DesktopComponent doctors={processedDoctors} isLoading={isLoading} title={title} subtitle={subtitle} hideVariantSwitcher={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
               key={`mobile-${resolvedMobileVariant}`}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               transition={{ duration: 0.25 }}
            >
              <MobileComponent doctors={processedDoctors} isLoading={isLoading} title={title} subtitle={subtitle} hideVariantSwitcher={true} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
