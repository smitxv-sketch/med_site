import { fetchQmsPriceItems } from '../qms/syncQmsPrices.js';
import { LegacyMysqlGateway } from '../../legacy/LegacyMysqlGateway.js';

export type LegacyOnlyRow = {
  article: string;
  title: string;
  modxPrice: string;
  legacyOnly: true;
  categories: string[];
  /** Лучший кандидат в QMS под другим артикулом */
  qmsAnalog: {
    article: string;
    title: string;
    price: string;
    score: number;
  } | null;
};

export type LegacyOnlyQueue = {
  generatedAt: string;
  count: number;
  rows: LegacyOnlyRow[];
};

function normTitle(s: string): string {
  return String(s ?? '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Простой fuzzy-score: доля общих токенов */
function titleScore(a: string, b: string): number {
  const ta = new Set(normTitle(a).split(' ').filter((w) => w.length > 2));
  const tb = new Set(normTitle(b).split(' ').filter((w) => w.length > 2));
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const w of ta) if (tb.has(w)) inter += 1;
  return inter / Math.max(ta.size, tb.size);
}

function findBestQmsAnalog(
  title: string,
  qmsItems: Array<{ article: string; title: string; price: string }>,
): LegacyOnlyRow['qmsAnalog'] {
  let best: LegacyOnlyRow['qmsAnalog'] = null;
  for (const q of qmsItems) {
    const score = titleScore(title, q.title);
    if (score < 0.45) continue;
    if (!best || score > best.score) {
      best = {
        article: q.article,
        title: q.title,
        price: q.price,
        score: Math.round(score * 100) / 100,
      };
    }
  }
  return best;
}

/** Очередь legacy-only артикулов для Studio (MODX без QMS) */
export async function buildSpbLegacyOnlyQueue(): Promise<LegacyOnlyQueue> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();

  const [lrows] = await gw.query(
    `SELECT TRIM(doc_id) AS article, MAX(name) AS title, MAX(price) AS price,
            GROUP_CONCAT(DISTINCT TRIM(category) ORDER BY category SEPARATOR ' | ') AS categories
     FROM ${prefix}pricelist_items2
     WHERE (deleted IS NULL OR deleted = 0) AND published = 1 AND TRIM(doc_id) != ''
     GROUP BY TRIM(doc_id)`,
  );

  const { items: qmsItems } = await fetchQmsPriceItems('spb');
  const qmsArticles = new Set(qmsItems.map((i) => i.article));
  const qmsList = qmsItems.map((i) => ({
    article: i.article,
    title: i.title,
    price: i.price,
  }));

  const rows: LegacyOnlyRow[] = [];
  for (const r of lrows as Array<{
    article: string;
    title: string;
    price: string;
    categories: string;
  }>) {
    const article = String(r.article).trim();
    if (!article || qmsArticles.has(article)) continue;
    rows.push({
      article,
      title: String(r.title ?? '').trim(),
      modxPrice: String(r.price ?? '').trim(),
      legacyOnly: true,
      categories: String(r.categories ?? '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean),
      qmsAnalog: findBestQmsAnalog(String(r.title ?? ''), qmsList),
    });
  }

  rows.sort((a, b) => a.article.localeCompare(b.article, 'ru'));

  return {
    generatedAt: new Date().toISOString(),
    count: rows.length,
    rows,
  };
}
