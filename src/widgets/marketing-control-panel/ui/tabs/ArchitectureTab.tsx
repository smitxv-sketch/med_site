import React from 'react';
import { LayoutTemplate, Code2, Layers, ExternalLink, ArrowRight, GitBranch, Database, Presentation, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SiteNodeMap } from '../components/SiteNodeMap';

export const ArchitectureTab = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 bg-background rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30 sticky top-0 z-10 shrink-0">
        <h3 className="text-xl font-bold flex items-center gap-3 text-foreground mb-2">
          <GitBranch className="w-6 h-6 text-brand" />
          Интерактивная карта архитектуры сайта
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          Наблюдаемость системной архитектуры. Здесь вы видите полное дерево платформы: как устроены разделы сайта, какие из них собираются динамически (CMS), а какие разрабатываются как уникальные FSD / SPA-модули.
        </p>
        
        <div className="mt-4 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-[11px] font-bold">
          <MapPin className="w-3.5 h-3.5" />
          Вы находитесь здесь: {currentPath}
        </div>
      </div>

      <div className="bg-background pb-8 relative">
          <SiteNodeMap />
          
          <div className="px-8 mt-2 max-w-5xl mx-auto">
            <div className="bg-zinc-950 text-gray-300 p-6 rounded-2xl text-xs space-y-3 relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <LayoutTemplate className="w-32 h-32" />
               </div>
               <h4 className="text-white font-bold text-sm flex items-center gap-2">
                 <Code2 className="w-4 h-4 text-brand" /> Итог подхода (Архитектурная чистота)
               </h4>
               <p className="max-w-2xl leading-relaxed">
                 Использование <b>Гибридной архитектуры</b> позволяет администраторам безопасно собирать типовые экраны посадок как Lego, не отвлекая разработчиков. В то же время сложные бизнес-модули (например, запись онлайн или фильтр врачей) остаются строго типизированными SPA-микрофронтендами. Это обеспечивает максимальный Performance и стабильность (Zero-Maintenance).
               </p>
            </div>
          </div>
      </div>
    </div>
  );
};

