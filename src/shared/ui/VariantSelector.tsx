import React, { useState } from 'react';
import { Settings2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUISettingsStore } from '../store/uiSettingsStore';

interface Variant {
  id: string;
  label: string;
}

interface VariantSelectorProps {
  variants: Variant[];
  currentVariant: string;
  onVariantChange: (id: string) => void;
}

export function VariantSelector({ variants, currentVariant, onVariantChange }: VariantSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDevMode = useUISettingsStore(state => state.isDevMode);

  if (!isDevMode) return null;

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="flex bg-white/90 backdrop-blur-md p-1 rounded-full shadow-sm border border-gray-200/50"
          >
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => onVariantChange(v.id)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full transition-all ${
                  currentVariant === v.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title={v.label}
              >
                {v.id}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-white/50 hover:bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 flex items-center justify-center text-gray-400 hover:text-teal-600 transition-all"
        title="Настройки отображения"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
