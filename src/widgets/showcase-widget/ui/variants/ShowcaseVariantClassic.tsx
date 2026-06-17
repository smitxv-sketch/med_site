import React from 'react';
import { ShowcaseData } from '../ShowcaseWidgetVariants';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ShowcaseVariantClassic = ({ showcase }: { showcase: ShowcaseData }) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img 
            src={showcase.gallery[0]?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80'} 
            className="w-full h-full object-cover" 
            alt={showcase.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl text-white">
            <div className="flex flex-wrap gap-2 mb-4">
               {(showcase.tags || []).map((cat, i) => (
                 <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                   {cat}
                 </span>
               ))}
             </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-md text-balance text-gray-900 dark:text-white">
              {showcase.title}
            </h1>
            {showcase.location?.address && (
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-lg">{showcase.location.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 flex flex-col gap-12">
          {showcase.description && (
            <section>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Особенности</h3>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-lg">
                <p>{showcase.description}</p>
              </div>
            </section>
          )}

          {showcase.featuresText && (
            <section>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Подробнее</h3>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-lg">
                <p>{showcase.featuresText}</p>
              </div>
            </section>
          )}

          {showcase.gallery.length > 1 && (
            <section>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Галерея</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {showcase.gallery.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                    <img src={img.url} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-surface-muted rounded-3xl p-8 border border-black/5">
            <h4 className="text-xl font-bold mb-6 text-gray-900">Детали</h4>
            <div className="flex flex-col gap-6">
              {(showcase.facts || []).length > 0 ? showcase.facts?.map((fact, idx) => (
                <div key={idx}>
                  <div className="text-sm text-gray-500 font-medium mb-1 flex items-center gap-2">
                    {fact.icon && <fact.icon className="w-4 h-4" />}
                    {fact.label}
                  </div>
                  <div className="text-gray-900 font-semibold text-lg">{fact.value}</div>
                </div>
              )) : (
                <>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">Сезонность</div>
                    <div className="text-gray-900 font-semibold text-lg">{showcase.season || "Круглый год"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">Продолжительность</div>
                    <div className="text-gray-900 font-semibold text-lg">{showcase.duration || "Не указано"}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
