import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MOBILE_HERO_CONFIG,
  MobileHeroTabKey,
} from '../../config/mobileHeroConfig';

interface HeroMobileZoneNavProps {
  onTabChange: (tab: MobileHeroTabKey) => void;
}

export function HeroMobileZoneNav({ onTabChange }: HeroMobileZoneNavProps) {
  const [activeTab, setActiveTab] = useState<MobileHeroTabKey>('clinic');
  const cfg = MOBILE_HERO_CONFIG.navZone;
  const tabData = MOBILE_HERO_CONFIG.tabs[activeTab];
  const vrtStyle = MOBILE_HERO_CONFIG.vrtChipStyle;

  const handleTab = (tab: MobileHeroTabKey) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div
      style={{
        marginTop: cfg.marginTop,
        marginLeft: cfg.marginX,
        marginRight: cfg.marginX,
        borderRadius: cfg.borderRadius,
        padding: cfg.padding,
        backgroundColor: cfg.bg,
      }}
    >
      <div
        className="flex p-[3px] rounded-[30px] bg-white border border-gray-200 mb-3"
      >
        {(Object.keys(MOBILE_HERO_CONFIG.tabs) as MobileHeroTabKey[]).map(
          (key) => {
            const tab = MOBILE_HERO_CONFIG.tabs[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleTab(key)}
                className={cn(
                  'flex-1 py-1.5 rounded-[28px] text-[13px] transition-opacity',
                  isActive
                    ? 'bg-brand text-white font-semibold'
                    : 'bg-transparent text-gray-500'
                )}
                style={{ transitionDuration: `${cfg.chipFadeMs}ms` }}
              >
                {tab.label}
              </button>
            );
          }
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: cfg.chipFadeMs / 1000, ease: 'ease' }}
          className="flex flex-wrap gap-2 mb-3"
        >
          {tabData.chips.map((chip) => (
            <Link
              key={chip.label}
              to={chip.path}
              className={cn(
                'text-[13px] px-3.5 py-1.5 rounded-[20px] border-[0.5px]',
                activeTab === 'vrt'
                  ? ''
                  : 'bg-white border-gray-200 text-gray-900'
              )}
              style={
                activeTab === 'vrt'
                  ? {
                      backgroundColor: vrtStyle.bg,
                      borderColor: vrtStyle.border,
                      color: vrtStyle.color,
                    }
                  : undefined
              }
            >
              {chip.label}
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      <Link
        to={tabData.allDirectionsPath}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand no-underline"
      >
        <LayoutGrid className="w-4 h-4" strokeWidth={2} />
        Все направления · {tabData.totalCount}
      </Link>
    </div>
  );
}
