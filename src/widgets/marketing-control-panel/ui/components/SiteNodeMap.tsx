import React from 'react';
import { LayoutTemplate, Code2, Layers, ExternalLink, ArrowRight, GitBranch, Database, FileText, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PRIMITIVE } from '@/shared/config/designTokens';

interface NodeProps {
  title: string;
  type: 'cms' | 'custom' | 'module';
  path: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

const NodeLabel = ({ title, type, path, isActive }: Omit<NodeProps, 'children'>) => {
  const isCms = type === 'cms';
  const isCustom = type === 'custom';
  const isModule = type === 'module';

  const colors = {
    cms: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    custom: 'bg-blue-50 border-blue-200 text-blue-800',
    module: 'bg-purple-50 border-purple-200 text-purple-800'
  };

  const icons = {
    cms: <LayoutTemplate className="w-4 h-4 text-emerald-500" />,
    custom: <Code2 className="w-4 h-4 text-blue-500" />,
    module: <Layers className="w-4 h-4 text-purple-500" />
  };

  return (
    <Link 
      to={path.replace('/:id', '/1').replace('/:serviceId', '/1')}
      className={`relative z-10 flex flex-col min-w-[200px] p-3 rounded-xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg bg-white
        ${isActive ? 'border-brand shadow-md shadow-brand/20 ring-4 ring-brand/10 scale-105' : colors[type]}
      `}
    >
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-black/5">
        {icons[type]}
        <span className="text-xs font-bold uppercase tracking-wider opacity-80">
          {isCms ? 'CMS Template' : isCustom ? 'FSD Custom' : 'SPA Module'}
        </span>
        {isActive && <span className="ml-auto flex w-2 h-2 rounded-full bg-brand animate-pulse" />}
      </div>
      <span className="font-bold text-sm text-gray-900 leading-tight mb-1">{title}</span>
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="font-mono text-[10px] text-gray-500 bg-black/5 px-1.5 py-0.5 rounded">{path}</span>
        <ExternalLink className="w-3 h-3 text-gray-400" />
      </div>
    </Link>
  );
};

export const SiteNodeMap = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActiveRoute = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path.replace('/:id', '').replace('/:serviceId', ''));
  };

  return (
    <div className="w-full relative overflow-x-auto overflow-y-hidden pb-12 pt-8 px-4 flex justify-center custom-scrollbar">
      
      {/* SVG Background Lines for linking (Visual only, simple vertical/horizontal routing) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minWidth: 800 }}>
        {/* Main Trunk -> Home */}
        <path d="M 50% 40 L 50% 120" stroke={PRIMITIVE.marketing.nodeStroke} strokeWidth="2" strokeDasharray="4 4" fill="none" />
        
        {/* Horizontal branch from Home to others */}
        <path d="M 15% 220 L 85% 220" stroke={PRIMITIVE.marketing.nodeStroke} strokeWidth="2" fill="none" />
        
        {/* Vertical drops to 3 main categories */}
        <path d="M 15% 220 L 15% 260" stroke={PRIMITIVE.marketing.nodeStroke} strokeWidth="2" fill="none" />
        <path d="M 50% 220 L 50% 260" stroke={PRIMITIVE.marketing.nodeStroke} strokeWidth="2" fill="none" />
        <path d="M 85% 220 L 85% 260" stroke={PRIMITIVE.marketing.nodeStroke} strokeWidth="2" fill="none" />
        
        <path d="M 50% 160 L 50% 220" stroke={PRIMITIVE.marketing.nodeStroke} strokeWidth="2" fill="none" />
      </svg>

      <div className="flex flex-col items-center w-full min-w-[800px] relative z-10">
        
        {/* Root Node */}
        <div className="mb-20">
          <NodeLabel title="Главная Страница" type="cms" path="/" isActive={isActiveRoute('/')} />
        </div>

        {/* Level 1 branches */}
        <div className="flex justify-between w-[85%]">
          
          {/* Branch 1: CMS Services */}
          <div className="flex flex-col items-center">
            <div className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-200 mb-6 flex items-center gap-1">
              <Database className="w-3 h-3" /> УСЛУГИ (CMS-Driven)
            </div>
            
            <div className="flex flex-col gap-8 relative items-center">
              <NodeLabel title="Каталог услуг" type="custom" path="/services" isActive={isActiveRoute('/services')} />
              {/* Vertical line connecting them */}
              <div className="absolute top-[80px] bottom-[80px] w-0.5 bg-gray-200 -z-10" />
              <NodeLabel title="Лендинг Услуги" type="cms" path="/services/adult/:id" isActive={isActiveRoute('/services/adult')} />
            </div>
          </div>

          {/* Branch 2: Standard Custom Pages */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-200 mb-6 flex items-center gap-1">
              <LayoutTemplate className="w-3 h-3" /> ОСНОВНЫЕ (FSD Custom)
            </div>
            
            <div className="flex gap-4 relative">
               <div className="flex flex-col gap-6">
                 <NodeLabel title="Наши Врачи" type="custom" path="/doctors" isActive={isActiveRoute('/doctors')} />
                 <NodeLabel title="Профиль Врача" type="custom" path="/doctors/:id" />
                 <NodeLabel title="Каталог Акций" type="custom" path="/promotions" isActive={isActiveRoute('/promotions')} />
               </div>
               <div className="flex flex-col gap-6">
                 <NodeLabel title="Прайс-лист" type="custom" path="/prices" isActive={isActiveRoute('/prices')} />
                 <NodeLabel title="О клинике" type="custom" path="/about" isActive={isActiveRoute('/about')} />
                 <NodeLabel title="Контакты" type="custom" path="/contacts" isActive={isActiveRoute('/contacts')} />
               </div>
            </div>
          </div>

          {/* Branch 3: Applications & Modules */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 text-purple-800 text-[10px] font-bold px-3 py-1 rounded-full border border-purple-200 mb-6 flex items-center gap-1">
              <Layers className="w-3 h-3" /> МИКРОРАППЛИКАЦИИ
            </div>
            
            <div className="flex flex-col gap-8">
               <NodeLabel title="Рекордер / Букинг" type="module" path="/booking" isActive={isActiveRoute('/booking')} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

