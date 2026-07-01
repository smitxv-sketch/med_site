import type {
  LegacyPriceItem,
  QmsPriceDiffCounters,
  QmsPriceItem,
  QmsPriceSyncOptions,
  QmsPriceSyncReport,
} from '../../types/qmsPrice.js';

const CYRILLIC_ARTICLE = /[а-яё]/iu;

type PriceChangeSample = { article: string; title: string; from: string; to: string };
type UnpublishSample = { article: string; title: string; reason: string };

export type QmsPriceAction =
  | { type: 'update_price'; city: 'chel' | 'spb'; legacyId: string; article: string; price: string }
  | { type: 'update_title'; city: 'chel' | 'spb'; legacyId: string; article: string; title: string }
  | { type: 'publish'; city: 'chel' | 'spb'; legacyId: string; article: string }
  | { type: 'unpublish'; city: 'chel' | 'spb'; legacyId: string; article: string; reason: string };

function emptyCounters(): QmsPriceDiffCounters {
  return {
    matched: 0,
    priceUpdated: 0,
    titleUpdated: 0,
    published: 0,
    unpublishedMissing: 0,
    unpublishedDashPrice: 0,
    noArticle: 0,
    cyrillicArticle: 0,
    alreadyHidden: 0,
    inQmsNotOnSite: 0,
    discrepanciesIgnored: 0,
  };
}

/** Сравнение QMS ↔ legacy — логика как в qms_price update_info PHP */
export function compareQmsToLegacy(
  city: 'chel' | 'spb',
  qmsItems: QmsPriceItem[],
  legacyItems: LegacyPriceItem[],
  options: QmsPriceSyncOptions,
): { report: QmsPriceSyncReport; actions: QmsPriceAction[] } {
  const qmsByArticle = new Map(qmsItems.map((i) => [i.article, i]));
  const counters = emptyCounters();
  const actions: QmsPriceAction[] = [];
  const priceChanges: PriceChangeSample[] = [];
  const unpublished: UnpublishSample[] = [];

  const articlesOnSite = new Set(
    legacyItems.map((i) => i.article).filter(Boolean),
  );

  const inQmsNotOnSite = qmsItems
    .map((i) => i.article)
    .filter((a) => a && !articlesOnSite.has(a));
  counters.inQmsNotOnSite = inQmsNotOnSite.length;

  for (const item of legacyItems) {
    if (!item.article) {
      counters.noArticle++;
      continue;
    }

    const qms = qmsByArticle.get(item.article);

    if (!qms) {
      if (CYRILLIC_ARTICLE.test(item.article)) {
        counters.cyrillicArticle++;
      }
      if (item.published) {
        if (options.unpublishMissing) {
          counters.unpublishedMissing++;
          actions.push({
            type: 'unpublish',
            city,
            legacyId: item.legacyId,
            article: item.article,
            reason: 'missing_in_qms',
          });
          unpublished.push({ article: item.article, title: item.title, reason: 'нет в QMS' });
        } else {
          counters.discrepanciesIgnored++;
        }
      } else {
        counters.alreadyHidden++;
      }
      continue;
    }

    let discrepancy = false;

    // Публикация скрытых (СПб: publishExisting; ЧЛБ: updateStatus в старом PHP)
    if (!item.published && qms.price !== '-') {
      discrepancy = true;
      if (options.publishExisting) {
        counters.published++;
        actions.push({ type: 'publish', city, legacyId: item.legacyId, article: item.article });
      } else {
        counters.discrepanciesIgnored++;
      }
    }

    if (item.price !== qms.price) {
      discrepancy = true;
      if (options.updatePrice) {
        if (qms.price === '-') {
          counters.unpublishedDashPrice++;
          actions.push({
            type: 'unpublish',
            city,
            legacyId: item.legacyId,
            article: item.article,
            reason: 'dash_price',
          });
          unpublished.push({ article: item.article, title: item.title, reason: 'цена «-» в QMS' });
        } else {
          counters.priceUpdated++;
          actions.push({
            type: 'update_price',
            city,
            legacyId: item.legacyId,
            article: item.article,
            price: qms.price,
          });
          if (priceChanges.length < 20) {
            priceChanges.push({
              article: item.article,
              title: item.title,
              from: item.price,
              to: qms.price,
            });
          }
        }
      } else {
        counters.discrepanciesIgnored++;
      }
    }

    if (item.title !== qms.title) {
      discrepancy = true;
      if (options.updateTitle) {
        counters.titleUpdated++;
        actions.push({
          type: 'update_title',
          city,
          legacyId: item.legacyId,
          article: item.article,
          title: qms.title,
        });
      } else {
        counters.discrepanciesIgnored++;
      }
    }

    if (!discrepancy) {
      counters.matched++;
    }
  }

  return {
    report: {
      city,
      demo: options.demo,
      target: options.target,
      transport: [],
      qmsTotal: qmsByArticle.size,
      legacyTotal: legacyItems.length,
      counters,
      inQmsNotOnSite: inQmsNotOnSite.slice(0, 100),
      samples: { priceChanges, unpublished: unpublished.slice(0, 20) },
    },
    actions,
  };
}
