import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BottomNavVariant } from '@/shared/domain/bottom-nav/types';

interface BottomNavFloatingShellProps {
  isHidden: boolean;
  variant: BottomNavVariant;
  children: React.ReactNode;
}

export function BottomNavFloatingShell({
  isHidden,
  variant,
  children,
}: BottomNavFloatingShellProps) {
  return (
    <>
      <motion.div
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: '100%' },
        }}
        initial="visible"
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed bottom-0 left-0 right-0 h-28 z-30 pointer-events-none backdrop-blur-md [mask-image:linear-gradient(to_top,black_60%,transparent_100%)] md:hidden bg-white/20"
      />

      <div className="fixed bottom-4 left-0 right-0 z-40 pointer-events-none flex justify-center md:hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.nav
            data-marketing-block="true"
            data-variant={variant}
            variants={{
              visible: { y: 0 },
              hidden: { y: '150%' },
            }}
            initial="visible"
            animate={isHidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className={`pointer-events-auto bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl pb-safe relative overflow-hidden transform-gpu ${
              variant === 'C'
                ? 'border-t-2 border-brand/10'
                : 'border border-white/20'
            }`}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={variant}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.nav>
        </div>
      </div>
    </>
  );
}
