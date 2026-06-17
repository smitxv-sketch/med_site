import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  bgWhite?: boolean;
  align?: 'left' | 'center';
}

export function PageHero({ title, description, bgWhite = false, align = 'center' }: PageHeroProps) {
  return (
    <section className={`relative -mt-[80px] sm:-mt-[96px] pt-[112px] sm:pt-[144px] pb-12 md:pb-20 overflow-hidden ${bgWhite ? 'bg-white' : 'bg-brand/5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} space-y-8`}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
