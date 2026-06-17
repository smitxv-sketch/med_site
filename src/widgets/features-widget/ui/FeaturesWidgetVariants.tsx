import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award, Heart, Users, Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'ShieldCheck' | 'Clock' | 'Award' | 'Heart' | 'Users' | 'Sparkles';
}

interface VariantsProps {
  features: FeatureItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Clock,
  Award,
  Heart,
  Users,
  Sparkles,
};

// --- Variant A: Grid of Cards ---
export function FeaturesVariantA({ features }: VariantsProps) {
  const { layoutDensity, shadowStyle } = useUISettingsStore();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {features.map((feature, i) => {
        const Icon = ICON_MAP[feature.iconName] || ShieldCheck;
        return (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={cn(
              "p-6 md:p-8 rounded-3xl flex flex-col items-start gap-4 transition-all h-full bg-white border border-gray-100",
              shadowStyle === 'soft' ? 'hover:shadow-xl shadow-sm' : 'hover:shadow-md'
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-2",
              `bg-green-50 text-green-600`
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

// --- Variant B: List with large icons (Left Aligned) ---
export function FeaturesVariantB({ features }: VariantsProps) {
  const { layoutDensity } = useUISettingsStore();

  return (
    <div className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto">
      {features.map((feature, i) => {
        const Icon = ICON_MAP[feature.iconName] || ShieldCheck;
        return (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 group"
          >
            <div className={cn(
               "w-16 h-16 md:w-20 md:h-20 rounded-[28px] flex items-center justify-center shrink-0 transition-all duration-300",
               `bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white`
            )}>
              <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed md:text-lg">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// --- Variant C: Bento Grid ---
export function FeaturesVariantC({ features }: VariantsProps) {
  const { layoutDensity } = useUISettingsStore();
  const bentoFeatures = features.slice(0, 5); // Ideal for bento is 5 or 6 items
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
      {bentoFeatures.map((feature, i) => {
        const Icon = ICON_MAP[feature.iconName] || ShieldCheck;
        const isLarge = i === 0 || i === 3; // Make 1st and 4th large
        
        return (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn(
              "rounded-[32px] p-8 flex flex-col justify-between overflow-hidden relative group",
              isLarge ? "md:col-span-2 bg-gray-50 border border-gray-100" : `bg-green-600 col-span-1 text-white`,
            )}
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className={cn(
                 "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                 isLarge ? "bg-white text-gray-900 shadow-sm" : "bg-white/20 text-white"
              )}>
                <Icon className="w-7 h-7" />
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className={cn("text-2xl font-bold font-sans", isLarge ? "text-gray-900" : "text-white")}>
                  {feature.title}
                </h3>
                <p className={cn("leading-relaxed", isLarge ? "text-gray-600" : "text-white/80")}>
                  {feature.description}
                </p>
              </div>
            </div>
            
            {/* Decorative background shape */}
            <div className={cn(
               "absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 transition-all duration-700 group-hover:scale-150",
               isLarge ? `bg-green-400` : "bg-white"
            )} />
          </motion.div>
        );
      })}
    </div>
  );
}
