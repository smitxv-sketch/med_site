import type { LegacyPriceItem } from '../../types/qmsPrice.js';
import { dbChel } from '../../dbChel.js';
import { pool, getPrefix } from '../../db.js';

/** Все позиции прайса из WordPress (ЧЛБ) — как в qms_price/chel/update_info.php */
export async function loadChelLegacyPrices(): Promise<LegacyPriceItem[]> {
  const [posts] = await dbChel.query(
    `SELECT ID, post_title, post_status FROM wp_posts WHERE post_type = 'services'`,
  );
  const items = new Map<string, LegacyPriceItem>();

  for (const row of posts as Array<{ ID: number; post_title: string; post_status: string }>) {
    items.set(String(row.ID), {
      legacyId: String(row.ID),
      article: '',
      title: row.post_title,
      price: '',
      published: row.post_status === 'publish',
      editUrl: `https://ci74.ru/wp-admin/post.php?post=${row.ID}&action=edit`,
    });
  }

  if (!items.size) return [];

  const ids = [...items.keys()];
  const [articles] = await dbChel.query(
    `SELECT post_id, meta_value FROM wp_postmeta WHERE meta_key = 'article' AND post_id IN (?)`,
    [ids],
  );
  for (const row of articles as Array<{ post_id: number; meta_value: string }>) {
    const item = items.get(String(row.post_id));
    if (item) item.article = String(row.meta_value ?? '').trim();
  }

  const [prices] = await dbChel.query(
    `SELECT post_id, meta_value FROM wp_postmeta WHERE meta_key = 'price' AND post_id IN (?)`,
    [ids],
  );
  for (const row of prices as Array<{ post_id: number; meta_value: string }>) {
    const item = items.get(String(row.post_id));
    if (item) item.price = String(row.meta_value ?? '').trim();
  }

  return [...items.values()];
}

/** Все позиции из modx_pricelist_items2 (СПб) */
export async function loadSpbLegacyPrices(): Promise<LegacyPriceItem[]> {
  const prefix = getPrefix();
  const [rows] = await pool.query(
    `SELECT id, resource_id, doc_id, name, price, published FROM ${prefix}pricelist_items2`,
  );

  return (rows as Array<{
    id: number;
    resource_id: number;
    doc_id: string;
    name: string;
    price: string;
    published: number;
  }>).map((row) => ({
    legacyId: String(row.id),
    article: String(row.doc_id ?? '').trim(),
    title: row.name ?? '',
    price: String(row.price ?? '').trim(),
    published: Number(row.published) === 1,
    editUrl: `https://cispb.com/manager/?a=resource/update&id=${row.resource_id}`,
  }));
}

export async function loadLegacyPrices(city: 'chel' | 'spb'): Promise<LegacyPriceItem[]> {
  return city === 'chel' ? loadChelLegacyPrices() : loadSpbLegacyPrices();
}
