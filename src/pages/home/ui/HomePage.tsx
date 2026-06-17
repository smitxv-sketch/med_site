import React from 'react';
import { motion } from 'framer-motion';
import { useCmsStore } from '../../../shared/store/cmsStore';
import { PageRenderer } from '@/shared/ui/PageRenderer';

export function HomePage() {
  const { pageBlocks, setPageBlocks } = useCmsStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <div className="flex flex-col gap-[var(--spacing-section)]">
        <PageRenderer blocks={pageBlocks} onUpdateBlocks={setPageBlocks} />
      </div>
    </motion.div>
  );
}

