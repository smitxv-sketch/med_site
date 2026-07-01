/** Каноническая позиция прайса из QMS getPr */
export type QmsPriceItem = {
  article: string;
  title: string;
  price: string;
  sectionVal: string;
  orgId: string;
  sourceKey: string;
};

/** Позиция в legacy-каталоге (WP / MODX) */
export type LegacyPriceItem = {
  legacyId: string;
  article: string;
  title: string;
  price: string;
  published: boolean;
  editUrl?: string;
};

export type QmsPriceSyncOptions = {
  /** Обновлять цену при расхождении */
  updatePrice: boolean;
  /** Обновлять название (по умолчанию выкл — как в PHP) */
  updateTitle: boolean;
  /** Снимать с публикации, если нет в QMS */
  unpublishMissing: boolean;
  /** Публиковать скрытые, если есть в QMS */
  publishExisting: boolean;
  /** true = только отчёт, без записи */
  demo: boolean;
  /** Куда писать: пока legacy или только отчёт */
  target: 'report' | 'legacy' | 'strapi';
};

export type QmsPriceDiffCounters = {
  matched: number;
  priceUpdated: number;
  titleUpdated: number;
  published: number;
  unpublishedMissing: number;
  unpublishedDashPrice: number;
  noArticle: number;
  cyrillicArticle: number;
  alreadyHidden: number;
  inQmsNotOnSite: number;
  discrepanciesIgnored: number;
};

export type QmsPriceSyncReport = {
  city: 'chel' | 'spb';
  demo: boolean;
  target: string;
  transport: string[];
  qmsTotal: number;
  legacyTotal: number;
  counters: QmsPriceDiffCounters;
  /** Артикулы в QMS, но не на сайте */
  inQmsNotOnSite: string[];
  samples: {
    priceChanges: Array<{ article: string; title: string; from: string; to: string }>;
    unpublished: Array<{ article: string; title: string; reason: string }>;
  };
};

export const DEFAULT_QMS_PRICE_SYNC_OPTIONS: QmsPriceSyncOptions = {
  updatePrice: true,
  updateTitle: false,
  unpublishMissing: true,
  publishExisting: false,
  demo: true,
  target: 'report',
};
