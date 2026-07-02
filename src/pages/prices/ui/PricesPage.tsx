import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Search, ArrowLeft, Calendar, Loader2 } from 'lucide-react';
import type { PriceCatalogCategoryDto } from '@med-site/contracts';
import { Button } from '@/shared/ui/Button';
import { CmsHtml } from '@/shared/ui/CmsHtml';
import { useTenant } from '@/shared/tenant/TenantContext';
import { usePricesCatalog } from '../hooks/usePricesCatalog';
import { PRICE_QUICK_NAV_TONES, QUICK_NAV_TONE_ORDER } from '../config/pricesUi';
import { cn } from '@/lib/utils';

export function PricesPage() {
  const navigate = useNavigate();
  const { tenantId, tenant } = useTenant();
  const { data: catalog, isLoading, error } = usePricesCatalog(tenantId);

  const [activeTabId, setActiveTabId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PriceCatalogCategoryDto | null>(null);

  const tabs = catalog?.tabs ?? [];
  const categories = catalog?.categories ?? [];
  const quickNav = catalog?.quickNav ?? [];
  const isLiveSpb = tenantId === 'spb' && Boolean(catalog?.placementCount);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  const filteredCategories = useMemo(() => {
    let cats = categories;
    if (activeTabId !== 'all') {
      cats = cats.filter((c) => c.tabId === activeTabId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      cats = cats.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.items.some((item) => item.name.toLowerCase().includes(q)),
      );
    }
    return cats;
  }, [categories, activeTabId, searchQuery]);

  const groupedCategories = useMemo(() => {
    const groups: Record<string, PriceCatalogCategoryDto[]> = {};
    const sorted = [...filteredCategories].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    for (const cat of sorted) {
      const letter = cat.name.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(cat);
    }
    return groups;
  }, [filteredCategories]);

  const openService = (item: PriceCatalogCategoryDto['items'][number]) => {
    if (item.isProgram || item.slug) {
      navigate(`/service/${item.slug || item.article}`);
      return;
    }
    navigate(`/booking?service_id=${encodeURIComponent(item.article)}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-gray-500 gap-3">
        <Loader2 className="w-5 h-5 animate-spin" />
        Загрузка прайса…
      </div>
    );
  }

  if (error || !catalog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 mb-4">Не удалось загрузить прайс для {tenant.displayName}.</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Повторить
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full pb-16 pt-2 md:pt-4 pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-gray-900 font-medium">Услуги и цены</span>
        </nav>

        {tenantId === 'chel' ? (
          <p className="mb-6 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
            Показан демо-прайс Челябинска. Полный каталог из МИС подключается отдельным этапом синка.
          </p>
        ) : null}

        {isLiveSpb ? (
          <p className="mb-6 text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
            Актуальный прайс {tenant.displayName}: {catalog.placementCount} позиций в{' '}
            {catalog.categoryCount} рубриках.
          </p>
        ) : null}

        <div className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6 md:mb-8">
            Услуги и цены
          </h1>

          {quickNav.length > 0 ? (
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
              {quickNav.map((shortcut, idx) => {
                const toneKey = shortcut.tone ?? QUICK_NAV_TONE_ORDER[idx % QUICK_NAV_TONE_ORDER.length];
                const tone = PRICE_QUICK_NAV_TONES[toneKey] ?? PRICE_QUICK_NAV_TONES.blue;
                return (
                  <button
                    key={`${shortcut.label}-${idx}`}
                    type="button"
                    onClick={() => {
                      setActiveTabId(shortcut.tabId);
                      setSelectedCategory(null);
                      if (shortcut.categorySlug) {
                        const cat = categories.find((c) => c.id === shortcut.categorySlug);
                        if (cat) setSelectedCategory(cat);
                      }
                    }}
                    className={cn(
                      'snap-start shrink-0 min-w-[200px] md:min-w-0 w-[60vw] md:w-auto relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-5 text-left hover:shadow-md transition-all group border min-h-[80px] flex items-center bg-gradient-to-br',
                      tone.gradient,
                      tone.border,
                    )}
                  >
                    <div className="relative z-10 w-full flex flex-row items-center justify-between gap-2">
                      <span className={cn('font-bold leading-tight text-sm md:text-base', tone.text)}>
                        {shortcut.label}
                      </span>
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full bg-white/60 flex shrink-0 items-center justify-center group-hover:scale-110 transition-transform',
                          tone.icon,
                        )}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="relative max-w-full md:max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-200 shadow-sm rounded-2xl md:rounded-full text-gray-900 placeholder-gray-500 focus:bg-white focus:border-brand/30 focus:ring-4 focus:ring-brand/5 transition-all outline-none text-base"
              placeholder="Найти услугу или направление…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedCategory ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="group flex items-center gap-2 text-brand font-bold text-lg md:text-xl mb-6 hover:opacity-80 transition-opacity"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {selectedCategory.name}
              </button>

              {selectedCategory.expertIntro ? (
                <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
                  <CmsHtml html={selectedCategory.expertIntro} />
                </div>
              ) : null}

              <div className="space-y-3">
                {selectedCategory.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl md:rounded-3xl p-5 md:p-6 transition-all duration-theme hover:shadow-xl hover:shadow-brand/5 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg text-gray-900 font-medium leading-snug">{item.name}</h3>
                      {item.summary ? (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.summary}</p>
                      ) : null}
                      {item.isProgram ? (
                        <button
                          type="button"
                          onClick={() => openService(item)}
                          className="text-sm text-brand font-medium mt-2 hover:underline"
                        >
                          Состав программы →
                        </button>
                      ) : null}
                    </div>

                    <div className="flex flex-row items-center justify-between md:justify-end gap-3 md:gap-6 w-full md:w-auto shrink-0 mt-2 md:mt-0 pt-3 md:pt-0 border-t border-gray-200 md:border-0">
                      <span className="text-xl md:text-2xl font-bold text-brand whitespace-nowrap">
                        {item.price}
                      </span>
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-xl w-auto"
                        onClick={() => openService(item)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {item.isProgram ? 'Подробнее' : 'Записаться'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative mb-10 -mx-4 sm:mx-0 hidden md:block">
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
                <div className="flex overflow-x-auto scrollbar-hide px-4 sm:px-0 py-2">
                  <div className="flex gap-2 md:gap-3 min-w-max pb-2">
                    {tabs.map((tab) => {
                      const isActive = activeTabId === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setActiveTabId(tab.id);
                            setSelectedCategory(null);
                          }}
                          className={cn(
                            'relative flex items-center justify-center px-5 py-2.5 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-colors duration-theme border',
                            isActive
                              ? 'text-white border-transparent'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-brand/30 hover:bg-gray-50 shadow-sm',
                          )}
                        >
                          {isActive ? (
                            <motion.div
                              layoutId="activeTabPill"
                              className="absolute inset-0 bg-brand rounded-full shadow-md shadow-brand/20"
                              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />
                          ) : null}
                          <span className="relative z-10">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {Object.keys(groupedCategories).length === 0 ? (
                <div className="py-12 text-center text-gray-500">По вашему запросу ничего не найдено.</div>
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 md:gap-12 [column-fill:_balance]">
                  {Object.entries(groupedCategories).map(([letter, cats]) => (
                    <div key={letter} className="break-inside-avoid mb-10">
                      <div className="flex items-baseline gap-4 mb-5 border-b border-gray-100 pb-2">
                        <h2 className="text-3xl font-bold text-gray-900 w-8">{letter}</h2>
                      </div>
                      <ul className="space-y-4">
                        {cats.map((cat) => (
                          <li key={cat.id}>
                            <button
                              type="button"
                              onClick={() => setSelectedCategory(cat)}
                              className="text-left w-full group relative flex flex-col items-start focus:outline-none"
                            >
                              <span className="text-gray-700 group-hover:text-brand font-medium text-base leading-snug transition-colors pr-8 block underline decoration-dashed decoration-gray-300 group-hover:decoration-brand underline-offset-4">
                                {cat.name}
                              </span>
                              <span className="text-xs text-gray-400 mt-1">
                                {cat.items.length}{' '}
                                {cat.items.length === 1 ? 'услуга' : 'услуг'}
                              </span>
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
