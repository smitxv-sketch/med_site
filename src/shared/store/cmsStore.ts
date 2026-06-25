import { create } from 'zustand';
import { WidgetType, useUISettingsStore } from './uiSettingsStore';
import { PageBlock } from '../types/block';

// -----------------------------------------------------
// 1. Strapi Mock Models
// -----------------------------------------------------

// Сущность "Услуга" (Как бы коллекция в Strapi)
export interface ServiceEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  featuresTitle?: string;
  faqTitle?: string;
  // Опциональный локальный шаблон. Если он есть — он перекрывает глобальный шаблон.
  customLayout?: PageBlock[]; 
}

// Сущность "Новость"
export interface NewsEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export const DEFAULT_PAGE_BLOCKS: PageBlock[] = [
  { id: 'hero-1', type: 'HeroWidget' },
  { id: 'promotions-1', type: 'PromotionsWidget' },
  { id: 'offers-1', type: 'SpecialOffersWidget' },
  { id: 'directions-1', type: 'DirectionsWidget' },
  { id: 'doctors-1', type: 'DoctorsWidget' },
  { id: 'reviews-1', type: 'ReviewsWidget', content: { limit: 3 } },
];

const MOCK_GLOBAL_SERVICE_LAYOUT: PageBlock[] = [
  // Глобальный шаблон услуги говорит: "Сначала покажи Hero (с подстановкой данных), потом Преимущества, потом Врачей, потом FAQ".
  { 
    id: 'g-hero', 
    type: 'HeroWidget', 
    design: { variantOverride: 'B' }, 
    content: {},
    bind: { 'title': 'title', 'subtitle': 'subtitle' },
    variants: [
      {
        id: 'var-a',
        weight: 0.5,
        design: { variantOverride: 'A', backgroundColor: 'brand' } // Stage 5: A/B Theme Test
      },
      {
        id: 'var-b',
        weight: 0.5,
        design: { variantOverride: 'B', backgroundColor: 'dark' }
      }
    ]
  }, 
  { 
    id: 'g-features', 
    type: 'FeaturesWidget', 
    design: { variantOverride: 'C' }, 
    content: { subtitle: 'Передовые методики и забота о вас' },
    bind: { 'title': 'featuresTitle' }
  },
  { 
    id: 'g-faq', 
    type: 'FaqWidget', 
    design: { variantOverride: 'B' }, 
    content: {},
    bind: { 'title': 'faqTitle' }
  },
];

const MOCK_SERVICES: ServiceEntry[] = [
  {
    id: 'srv-1',
    slug: 'lechenie-kariesa',
    title: 'Лечение кариеса под микроскопом',
    subtitle: 'Безболезненное удаление поражённых тканей и постановка фотополимерной пломбы.',
    price: 4500,
    featuresTitle: 'Почему выбирают нас для лечения кариеса',
    faqTitle: 'Частые вопросы о лечении кариеса под микроскопом'
    // customLayout не задан. Будет использоваться ГЛОБАЛЬНЫЙ шаблон!
  },
  {
    id: 'srv-2',
    slug: 'implantaciya-zubov',
    title: 'Премиум имплантация зубов',
    subtitle: 'Установка импланта Straumann "под ключ" с гарантией приживаемости 99%.',
    price: 65000,
    featuresTitle: 'Почему выбирают нас для имплантации зубов',
    faqTitle: 'Частые вопросы об имплантации',
    // А вот уникальная услуга-лендинг, ради которой маркетолог попросил сгенерировать ЛОКАЛЬНЫЙ шаблон
    customLayout: [
      { id: 'loc-hero', type: 'HeroWidget', design: { variantOverride: 'A' }, bind: { 'title': 'title', 'subtitle': 'subtitle' } },
      { id: 'loc-timeline', type: 'TimelineWidget', design: { variantOverride: 'A' } }, // Дополнительный виджет "Этапы"
      { id: 'loc-features', type: 'FeaturesWidget', design: { variantOverride: 'A' }, bind: { 'title': 'featuresTitle' } },
      { id: 'ref-footer', type: 'ReferenceWidget', config: { refId: 'global-footer-block', visibilityRule: "context.price > 10000" } } // Stage 6 demo
    ]
  },
  {
    id: 'srv-3',
    slug: 'antikor',
    title: 'Антикоррозийная обработка',
    subtitle: 'Надежная защита кузова от соли и реагентов',
    price: 15000,
    featuresTitle: 'Преимущества антикоррозийной обработки',
    faqTitle: 'Частые вопросы об антикоре',
    customLayout: [
      { id: 'auto-1', type: 'CalculatorWidget', design: { intent: 'direct-response', layoutPattern: 'split' } },
      { id: 'auto-2', type: 'PortfolioWidget', design: { intent: 'immersive', layoutPattern: 'stack' } },
      { id: 'auto-3', type: 'FaqWidget', design: { variantOverride: 'C' }, content: { title: 'Частые вопросы об антикоре' } }
    ]
  }
];

interface CmsState {
  pageBlocks: PageBlock[];
  pageSeo: { title: string; description: string };
  brandVoice: string;
  setPageBlocks: (blocks: PageBlock[]) => void;
  setPageSeo: (seo: { title: string; description: string }) => void;
  setBrandVoice: (voice: string) => void;
  
  // Глобальные шаблоны (аналог Single Types в Strapi)
  globalServiceLayout: PageBlock[];
  
  // Коллекции (аналог Collection Types в Strapi)
  services: ServiceEntry[];
  news: NewsEntry[];

  // Stage 6: Reference Blocks
  references: Record<string, PageBlock>;

  // Actions
  setGlobalServiceLayout: (layout: PageBlock[]) => void;
  addService: (service: ServiceEntry) => void;
  updateServiceCustomLayout: (id: string, layout: PageBlock[]) => void;
  addNews: (newsEntry: NewsEntry) => void;
  setReferences: (references: Record<string, PageBlock>) => void;
}

export const useCmsStore = create<CmsState>((set) => ({
  pageBlocks: DEFAULT_PAGE_BLOCKS,
  pageSeo: { title: '', description: '' },
  brandVoice: 'Профессиональный, экспертный, вызывающий доверие. Избегать клише и маркетинговой "воды". Писать лаконично и по делу.',
  setPageBlocks: (blocks) => { 
    set({ pageBlocks: blocks }); 
    useUISettingsStore.getState().setKey('hasUnsavedChanges', true); 
  },
  setPageSeo: (seo) => {
    set({ pageSeo: seo });
    useUISettingsStore.getState().setKey('hasUnsavedChanges', true);
  },
  setBrandVoice: (voice) => {
    set({ brandVoice: voice });
    useUISettingsStore.getState().setKey('hasUnsavedChanges', true);
  },
  
  globalServiceLayout: MOCK_GLOBAL_SERVICE_LAYOUT,
  services: MOCK_SERVICES,
  news: [],

  references: {
    'global-footer-block': {
      id: 'ref-global-footer',
      type: 'footer',
      design: { variantOverride: 'A' },
      content: { text: 'Глобальный подвал для всего сайта' }
    }
  },

  setGlobalServiceLayout: (layout) => set({ globalServiceLayout: layout }),
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  updateServiceCustomLayout: (id, layout) => set((state) => ({
    services: state.services.map(s => s.id === id ? { ...s, customLayout: layout } : s)
  })),
  addNews: (newsEntry) => set((state) => ({ news: [...state.news, newsEntry] })),
  setReferences: (references) => set({ references }),
}));

