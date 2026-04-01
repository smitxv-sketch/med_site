import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDirections } from '../../../../shared/api/contentApi';
import { ChevronDown, ArrowRight, Heart, Users, Baby, Sparkles, Activity, ClipboardList } from 'lucide-react';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';
import { VariantSwitcher } from '../../../../shared/ui/VariantSwitcher';
import { formatTypography } from '../../../../widget/utils/formatters';

export function DirectionsSection() {
  const { data: directions = [], isLoading } = useQuery({
    queryKey: ['directions'],
    queryFn: fetchDirections,
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllServicesFor, setShowAllServicesFor] = useState<string | null>(null);

  const iconVariant = useUISettingsStore(state => state.directionsIconVariant);
  const setIconVariant = useUISettingsStore(state => state.setDirectionsIconVariant);

  const getIcon = (id: string, className: string) => {
    switch(id) {
      case 'vrt': return <Heart className={className} />;
      case 'adult': return <Users className={className} />;
      case 'kids': return <Baby className={className} />;
      case 'cosmetology': return <Sparkles className={className} />;
      case 'ambulance': return <Activity className={className} />;
      case 'programs': return <ClipboardList className={className} />;
      default: return <Heart className={className} />;
    }
  };

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Направления</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Направления</h2>
          <VariantSwitcher
            variants={['A', 'B', 'C'] as const}
            currentVariant={iconVariant}
            onChange={setIconVariant}
            mode="cycle"
            className="md:hidden w-8 h-8 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 uppercase"
          />
        </div>
        <Link to="/services" className="text-brand-green font-medium hover:underline">
          Все услуги
        </Link>
      </div>
      
      {/* Mobile Accordion View (hidden on md and up) */}
      <div className="md:hidden flex flex-col gap-3">
        {directions.map((dir, index) => {
          const isExpanded = expandedId === dir.id;
          
          if (dir.isVip) {
            return (
              <motion.div
                key={dir.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={dir.path}
                  className={`group flex flex-col overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-violet-100 ${dir.accentBg} p-6 gap-6`}
                >
                  <div className="flex flex-col">
                    <h3 className={`text-2xl font-extrabold mb-2 transition-colors leading-tight ${dir.textColor}`}>
                      {formatTypography(dir.title)}
                    </h3>
                    <p className="text-violet-800/80 text-sm leading-relaxed mb-4">
                      {formatTypography(dir.description)}
                    </p>
                    <span className="inline-flex items-center font-bold text-violet-700 text-sm">
                      Подробнее о центре <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>

                  <div className="w-full h-[180px] shrink-0">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm">
                      <img 
                        src={dir.image} 
                        alt={dir.title}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={dir.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-3xl border ${isExpanded ? 'border-brand-green/30 shadow-md' : 'border-gray-100 shadow-sm'} overflow-hidden bg-white transition-all duration-300`}
            >
              <button 
                onClick={() => {
                  if (isExpanded) {
                    setExpandedId(null);
                    setShowAllServicesFor(null);
                  } else {
                    setExpandedId(dir.id);
                    setShowAllServicesFor(null);
                  }
                }} 
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  {iconVariant === 'A' && (
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${dir.iconBgLight}`}>
                      {getIcon(dir.id, `w-6 h-6 ${dir.iconColor}`)}
                    </div>
                  )}
                  {iconVariant === 'B' && (
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50">
                      <img src={dir.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  {iconVariant === 'C' && (
                    <div className="w-12 h-12 flex items-center justify-center shrink-0">
                      {getIcon(dir.id, `w-8 h-8 ${dir.iconColor}`)}
                    </div>
                  )}
                  <h3 className={`text-lg font-bold ${dir.textColor} leading-tight`}>{formatTypography(dir.title)}</h3>
                </div>
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="shrink-0 ml-2"
                >
                  <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-brand-green' : 'text-gray-400'}`} />
                </motion.div>
              </button>
              
              <div 
                className="transition-all duration-300 ease-in-out opacity-0"
                style={{ 
                  display: 'grid', 
                  gridTemplateRows: isExpanded ? '1fr' : '0fr',
                  opacity: isExpanded ? 1 : 0
                }}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="p-5 pt-0 flex flex-col gap-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{formatTypography(dir.description)}</p>
                    
                    {dir.items && dir.items.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(showAllServicesFor === dir.id ? dir.items : dir.items.slice(0, 5)).map((item, i) => (
                          <span key={i} className="inline-flex items-center px-3 py-2 bg-gray-50 text-gray-700 text-sm rounded-xl border border-gray-100">
                            {item}
                          </span>
                        ))}
                        {showAllServicesFor !== dir.id && dir.items.length > 5 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowAllServicesFor(dir.id);
                            }}
                            className="inline-flex items-center px-3 py-2 bg-brand-green/10 text-brand-green text-sm font-medium rounded-xl border border-brand-green/20 hover:bg-brand-green/20 transition-colors"
                          >
                            Показать ещё {dir.items.length - 5}
                          </button>
                        )}
                      </div>
                    )}
                    
                    {showAllServicesFor === dir.id && (
                      <Link 
                        to={dir.path} 
                        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-brand-green text-white font-semibold rounded-xl mt-4 shadow-sm hover:bg-brand-green/90 transition-colors text-center"
                      >
                        <span>{dir.title}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop Grid View (hidden on mobile) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {directions.map((dir, index) => {
          if (dir.isVip) {
            return (
              <motion.div
                key={dir.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="md:col-span-2 lg:col-span-3"
              >
                <Link 
                  to={dir.path}
                  className={`group flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 border border-violet-100 ${dir.accentBg} p-6 sm:p-8 md:p-10 gap-8`}
                >
                  <div className="flex flex-col flex-1 justify-center order-2 md:order-1">
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 transition-colors leading-tight ${dir.textColor}`}>
                      {formatTypography(dir.title)}
                    </h3>
                    <p className="text-violet-800/80 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                      {formatTypography(dir.description)}
                    </p>
                    <span className="inline-flex items-center font-bold text-violet-700 group-hover:text-violet-900 transition-colors">
                      Подробнее о центре &rarr;
                    </span>
                  </div>

                  <div className="w-full md:w-1/2 lg:w-5/12 h-[200px] md:h-[280px] shrink-0 order-1 md:order-2">
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
                      <img 
                        src={dir.image} 
                        alt={dir.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={dir.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={dir.path}
                className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
              >
                {/* Top: Image Bleed */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-50 shrink-0">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 ${dir.accentBg}`} />
                  <img 
                    src={dir.image} 
                    alt={dir.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Bottom: Content */}
                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 transition-colors leading-tight ${dir.textColor}`}>
                    {formatTypography(dir.title)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {formatTypography(dir.description)}
                  </p>
                  
                  {/* Tags - limited and horizontal */}
                  {dir.items && dir.items.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {dir.items.slice(0, 5).map((item, i) => (
                        <span key={i} className="inline-block px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-xl border border-gray-100">
                          {item}
                        </span>
                      ))}
                      {dir.items.length > 5 && (
                        <span className="inline-block px-3 py-1.5 bg-brand-green/5 text-brand-green text-xs font-medium rounded-xl border border-brand-green/10">
                          Ещё {dir.items.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
