import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDoctorsRepository } from '@/shared/di/DIContext';
import { Doctor } from '@/widget/types';
import { formatSpecialty } from '@/widget/utils/formatters';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { DoctorsVariantRegistry } from './DoctorsWidgetVariants';
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

  const mapVariant = (v: string | undefined, defaultVal: string) => {
    if (!v) return defaultVal;
    if (v === 'grid') return 'A'; // or C
    if (v === 'carousel') return 'A'; 
    if (v === 'compact') return 'B';
    if (v === 'stack') return 'C';
    if (v === 'tabs') return 'D';
    
    // Support direct legacy mapping
    if (v === 'split') return 'A';
    if (['A', 'B', 'C', 'D'].includes(v)) return v; 

    return defaultVal;
  };

  const resolvedDesktopVariant = mapVariant(desktopVariant || layoutPattern || variant || variantOverride || globalVariant, 'A');
  const resolvedMobileVariant = mapVariant(mobileVariant || layoutPattern || variant || variantOverride || globalVariant, 'A');

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
