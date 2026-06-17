import React from 'react';
import { ProgramData } from '../ProgramWidgetVariants';
import { Clock, Users, Globe, CheckCircle2, XCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageRenderer } from '@/shared/ui/PageRenderer';

export const ProgramVariantClassic = ({ program }: { program: ProgramData }) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img 
            src={program.gallery[0]?.url || 'https://images.unsplash.com/photo-1542314831-c6a4d142104d'} 
            className="w-full h-full object-cover" 
            alt={program.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-md text-balance text-gray-900 dark:text-white">
              {program.title}
            </h1>
            {program.subtitle && (
              <p className="text-xl md:text-2xl text-white/90 drop-shadow-sm font-light">
                {program.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface border-b pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap gap-x-8 gap-y-4 -mt-6 relative z-10">
           <div className="bg-white rounded-2xl shadow-lg border p-6 flex flex-wrap gap-8 items-center flex-1 justify-between">
              <div className="flex gap-8 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Длительность</div>
                    <div className="font-bold text-gray-900">{program.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Размер группы</div>
                    <div className="font-bold text-gray-900">{program.capacity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Язык</div>
                    <div className="font-bold text-gray-900">{program.language}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider text-right mb-1">Стоимость</div>
                  <div className="text-3xl font-bold text-gray-900">{program.pricing}</div>
                </div>
                <Button className="bg-brand text-white hover:bg-brand/90 rounded-xl px-8 py-6 shadow-md text-base">
                  Присоединиться
                </Button>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 flex flex-col gap-16">
          <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">О программе</h3>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-lg mb-8">
              <p>{program.description}</p>
            </div>

            {program.highlights && program.highlights.length > 0 && (
              <>
                <h4 className="text-xl font-bold mb-4 text-gray-900">Ключевые моменты</h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {program.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 bg-gray-50 p-4 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section>
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Полное расписание</h3>
            <div className="relative border-l-2 border-gray-100 ml-4 space-y-12">
              {program.schedule.map((step, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-4 border-brand text-brand flex items-center justify-center font-bold text-xs">
                    {step.stepNumber || (i + 1)}
                  </div>
                  <div className="bg-surface rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    {step.tags && step.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag, pIdx) => (
                          <span key={pIdx} className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium flex items-center gap-1">
                             {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* РЕНДЕРИМ ВЛОЖЕННЫЕ БЛОКИ (COMPOSITION/DYNAMIC ZONES) */}
                    {step.nestedBlocks && step.nestedBlocks.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                         <PageRenderer blocks={step.nestedBlocks} isNested={true} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="bg-surface-muted rounded-3xl p-8 border border-black/5">
             <h4 className="text-xl font-bold mb-6 text-gray-900">Что включено</h4>
             <ul className="space-y-4">
               {program.features.map((item, i) => (
                 <li key={i} className="flex items-start gap-3">
                   {item.isIncluded ? (
                     <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                   ) : (
                     <XCircle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                   )}
                   <span className={item.isIncluded ? "text-gray-800" : "text-gray-500"}>{item.text}</span>
                 </li>
               ))}
             </ul>
           </div>

           {program.author && (
             <div className="bg-brand text-white rounded-3xl p-8 flex flex-col items-center text-center shadow-lg">
               <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mb-4 bg-white/10 flex items-center justify-center">
                 {program.author.photoUrl ? (
                    <img src={program.author.photoUrl} alt={program.author.name} className="w-full h-full object-cover" />
                 ) : (
                    <User className="w-12 h-12 text-white/50" />
                 )}
               </div>
               <div className="text-sm uppercase tracking-widest font-bold text-white/70 mb-1">{program.author.role || "Организатор"}</div>
               <h4 className="text-2xl font-bold mb-3">{program.author.name}</h4>
               <p className="text-white/80 text-sm leading-relaxed mb-6">{program.author.description}</p>
               <Button className="w-full bg-white text-brand hover:bg-gray-50 rounded-xl">Связаться</Button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
