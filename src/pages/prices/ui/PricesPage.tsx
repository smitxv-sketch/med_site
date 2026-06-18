import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Search, ArrowLeft, Calendar } from 'lucide-react';
import { pricesDb, PRICING_TABS, PriceCategory } from '../../../shared/api/mocks/pricesDb';
import { Button } from '@/shared/ui/Button';

export function PricesPage() {
  const navigate = useNavigate();
  const [activeTabId, setActiveTabId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PriceCategory | null>(null);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  // Filter Categories logic
  const filteredCategories = useMemo(() => {
    let cats = pricesDb;

    // Filter by tab
    if (activeTabId !== 'all') {
      cats = cats.filter(c => c.tabId === activeTabId);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const lowerQ = searchQuery.toLowerCase();
      cats = cats.filter(c => 
        c.name.toLowerCase().includes(lowerQ) || 
        c.items.some(item => item.name.toLowerCase().includes(lowerQ))
      );
    }

    return cats;
  }, [activeTabId, searchQuery]);

  // Group Alphabetically
  const groupedCategories = useMemo(() => {
    const groups: Record<string, PriceCategory[]> = {};
    
    // Sort array first
    const sorted = [...filteredCategories].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    sorted.forEach(cat => {
      const letter = cat.name.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(cat);
    });

    return groups;
  }, [filteredCategories]);

  return (
    <div className="w-full pb-16 pt-2 md:pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
        <Link to="/" className="hover:text-gray-900 transition-colors">Главная</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-gray-900 font-medium">Услуги и цены</span>
      </nav>

      {/* Header & Search */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6 md:mb-8">
          Услуги и цены
        </h1>

        {/* Bento Grid - Quick Navigation (Horizontal scroll on Mobile, Grid on Desktop) */}
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
          <button onClick={() => { setActiveTabId('consultation'); setSelectedCategory(null); }} className="snap-start shrink-0 min-w-[200px] md:min-w-0 w-[60vw] md:w-auto relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl md:rounded-3xl p-4 md:p-5 text-left hover:shadow-md transition-all group border border-blue-100/50 min-h-[80px] flex items-center">
            <div className="relative z-10 w-full flex flex-row items-center justify-between gap-2">
              <span className="font-bold text-blue-900 leading-tight text-sm md:text-base">Взрослая<br className="hidden md:block lg:hidden xl:block"/> поликлиника</span>
              <div className="w-8 h-8 rounded-full bg-white/60 flex shrink-0 items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-20 h-20 bg-[url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-multiply rounded-tl-full group-hover:scale-105 transition-transform duration-500"></div>
          </button>
          
          <button onClick={() => { setActiveTabId('treatment'); setSelectedCategory(null); }} className="snap-start shrink-0 min-w-[200px] md:min-w-0 w-[60vw] md:w-auto relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl md:rounded-3xl p-4 md:p-5 text-left hover:shadow-md transition-all group border border-pink-100/50 min-h-[80px] flex items-center">
            <div className="relative z-10 w-full flex flex-row items-center justify-between gap-2">
              <span className="font-bold text-pink-900 leading-tight text-sm md:text-base">Детская<br className="hidden md:block lg:hidden xl:block"/> клиника</span>
              <div className="w-8 h-8 rounded-full bg-white/60 flex shrink-0 items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-20 h-20 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-multiply rounded-tl-full group-hover:scale-105 transition-transform duration-500"></div>
          </button>

          <button onClick={() => { setActiveTabId('diagnostics'); setSelectedCategory(null); }} className="snap-start shrink-0 min-w-[200px] md:min-w-0 w-[60vw] md:w-auto relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-100 rounded-2xl md:rounded-3xl p-4 md:p-5 text-left hover:shadow-md transition-all group border border-emerald-100/50 min-h-[80px] flex items-center">
            <div className="relative z-10 w-full flex flex-row items-center justify-between gap-2">
              <span className="font-bold text-emerald-900 leading-tight text-sm md:text-base">Косметология</span>
              <div className="w-8 h-8 rounded-full bg-white/60 flex shrink-0 items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-20 h-20 bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-multiply rounded-tl-full group-hover:scale-105 transition-transform duration-500"></div>
          </button>

          <button onClick={() => { setActiveTabId('programs'); setSelectedCategory(null); }} className="snap-start shrink-0 min-w-[200px] md:min-w-0 w-[60vw] md:w-auto relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl md:rounded-3xl p-4 md:p-5 text-left hover:shadow-md transition-all group border border-orange-100/50 min-h-[80px] flex items-center">
            <div className="relative z-10 w-full flex flex-row items-center justify-between gap-2">
              <span className="font-bold text-orange-900 leading-tight text-sm md:text-base">Скорая<br className="hidden md:block lg:hidden xl:block"/> помощь</span>
              <div className="w-8 h-8 rounded-full bg-white/60 flex shrink-0 items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-20 h-20 bg-[url('https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-multiply rounded-tl-full group-hover:scale-105 transition-transform duration-500"></div>
          </button>
          
          <button onClick={() => { setActiveTabId('all'); setSelectedCategory(null); }} className="snap-start shrink-0 min-w-[200px] md:min-w-0 w-[60vw] md:w-auto relative overflow-hidden bg-gradient-to-br from-purple-50 to-fuchsia-100 rounded-2xl md:rounded-3xl p-4 md:p-5 text-left hover:shadow-md transition-all group border border-fuchsia-100/50 min-h-[80px] flex items-center md:col-span-2 lg:col-span-1">
            <div className="relative z-10 w-full flex flex-row items-center justify-between gap-2">
              <span className="font-bold text-fuchsia-900 leading-tight text-sm md:text-base">Клиника<br className="hidden md:block lg:hidden xl:block"/> ВРТ</span>
              <div className="w-8 h-8 rounded-full bg-white/60 flex shrink-0 items-center justify-center text-fuchsia-600 group-hover:scale-110 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-20 h-20 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-multiply rounded-tl-full group-hover:scale-105 transition-transform duration-500"></div>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative max-w-full md:max-w-3xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-200 shadow-sm rounded-2xl md:rounded-full text-gray-900 placeholder-gray-500 focus:bg-white focus:border-brand/30 focus:ring-4 focus:ring-brand/5 transition-all outline-none text-base"
            placeholder="Найти услугу или специалиста..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedCategory ? (
          // --- DETAILED VIEW ---
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              onClick={() => setSelectedCategory(null)}
              className="group flex items-center gap-2 text-brand font-bold text-lg md:text-xl mb-8 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {selectedCategory.name}
            </button>

            <div className="space-y-3">
              {selectedCategory.items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl md:rounded-3xl p-5 md:p-6 transition-all duration-theme hover:shadow-xl hover:shadow-brand/5 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group"
                >
                  <h3 className="text-lg md:text-lg text-gray-900 font-medium leading-snug flex-1">
                    {item.name}
                  </h3>
                  
                  <div className="flex flex-row md:flex-row items-center justify-between md:justify-end gap-3 md:gap-6 w-full md:w-auto shrink-0 mt-2 md:mt-0 pt-3 md:pt-0 border-t border-gray-200 md:border-0">
                    <span className="text-xl md:text-2xl font-bold text-brand whitespace-nowrap">
                      {item.price}
                    </span>
                    
                    <Button 
                      variant="primary" 
                      size="sm"
                      className="rounded-xl w-auto"
                      onClick={() => navigate(`/booking?service_id=${item.id}`)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Записаться
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          // --- MASTER GRID VIEW ---
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs - Hidden on Mobile */}
            <div className="relative mb-10 -mx-4 sm:mx-0 hidden md:block">
              {/* Fade out masks for mobile scrolling indication */}
              <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
              <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-0 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
              
              <div className="flex overflow-x-auto scrollbar-hide px-4 sm:px-0 py-2">
                <div className="flex gap-2 md:gap-3 min-w-max pb-2">
                {PRICING_TABS.map((tab) => {
                  const isActive = activeTabId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTabId(tab.id);
                        setSelectedCategory(null);
                      }}
                      className={`relative flex items-center justify-center px-5 py-2.5 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-colors duration-theme border ${
                        isActive 
                          ? 'text-white border-transparent' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-brand/30 hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeTabPill"
                          className="absolute inset-0 bg-brand rounded-full shadow-md shadow-brand/20" 
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            </div>

            {/* Content Columns */}
            {Object.keys(groupedCategories).length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                По вашему запросу ничего не найдено.
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 md:gap-12 [column-fill:_balance]">
                {Object.entries(groupedCategories).map(([letter, categories]) => (
                  <div key={letter} className="break-inside-avoid mb-10">
                    <div className="flex items-baseline gap-4 mb-5 border-b border-gray-100 pb-2">
                      <h2 className="text-3xl font-bold text-gray-900 w-8">{letter}</h2>
                    </div>
                    <ul className="space-y-4">
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => {
                              if (cat.id === 'gynecology') navigate('/service/gynecology');
                              else if (cat.id === 'gastroenterology') navigate('/service/gastro');
                              else setSelectedCategory(cat);
                            }}
                            className="text-left w-full group relative flex flex-col items-start focus:outline-none"
                          >
                            <span className="text-gray-700 group-hover:text-brand font-medium text-base leading-snug transition-colors pr-8 block underline decoration-dashed decoration-gray-300 group-hover:decoration-brand underline-offset-4">
                              {cat.name}
                            </span>
                            {/* Hover Indicator */}
                            <ChevronRight className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 group-hover:text-brand group-hover:translate-x-1 transition-all duration-theme" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
