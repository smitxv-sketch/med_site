import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface VariantsProps {
  items: FaqItem[];
}

// --- Variant A: Grid of Cards ---
export function FaqVariantA({ items }: VariantsProps) {
  const { layoutDensity, shadowStyle } = useUISettingsStore();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={cn(
            "p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col gap-3",
            "hover:bg-white transition-colors duration-300",
            shadowStyle === 'soft' ? "hover:shadow-xl" : "hover:shadow-sm"
          )}
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{item.question}</h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.answer}</p>
        </motion.div>
      ))}
    </div>
  );
}

// --- Variant B: Accordion Centered ---
export function FaqVariantB({ items }: VariantsProps) {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <Accordion className="w-full space-y-4">
        {items.map((item, i) => (
          <AccordionItem 
            key={item.id} 
            value={item.id}
            className="border border-gray-200 bg-white rounded-2xl px-6 py-2 overflow-hidden not-last:border-b transition-all data-open:shadow-md data-open:border-transparent"
          >
            <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-gray-900 py-4 hover:no-underline hover:text-brand transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// --- Variant C: Split Screen (Left Content, Right Accordion) ---
// Note: Handled partly by the main wrapper if used, but we only return the right side here really,
// wait, the variant might need to render the layout differently. 
// For variant C, we assume the title is passed into the parent, so we just render the accordion visually slightly different.
export function FaqVariantC({ items }: VariantsProps) {
  return (
    <div className="w-full">
      <Accordion className="w-full flex w-full flex-col divide-y divide-gray-100 border-t border-b border-gray-100">
        {items.map((item, i) => (
          <AccordionItem 
            key={item.id} 
            value={item.id}
            className="not-last:border-none py-2"
          >
            <AccordionTrigger className="text-left text-lg md:text-xl font-medium text-gray-900 py-4 hover:no-underline hover:text-brand transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl pb-6">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
