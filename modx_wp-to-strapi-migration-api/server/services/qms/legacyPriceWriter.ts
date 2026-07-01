import { dbChel } from '../../dbChel.js';
import { pool, getPrefix } from '../../db.js';
import type { QmsPriceAction } from './compareQmsPrices.js';

/** Применение изменений в legacy БД (только если demo=false) */
export async function applyLegacyPriceActions(actions: QmsPriceAction[]): Promise<{ applied: number; errors: string[] }> {
  let applied = 0;
  const errors: string[] = [];

  for (const action of actions) {
    try {
      if (action.city === 'chel') {
        await applyChelAction(action);
      } else {
        await applySpbAction(action);
      }
      applied++;
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  return { applied, errors };
}

async function applyChelAction(action: QmsPriceAction): Promise<void> {
  const id = action.legacyId;
  switch (action.type) {
    case 'update_price':
      await dbChel.query(
        `UPDATE wp_postmeta SET meta_value = ? WHERE meta_key = 'price' AND post_id = ?`,
        [action.price, id],
      );
      break;
    case 'update_title':
      await dbChel.query(`UPDATE wp_posts SET post_title = ? WHERE ID = ?`, [action.title, id]);
      break;
    case 'publish':
      await dbChel.query(`UPDATE wp_posts SET post_status = 'publish' WHERE ID = ?`, [id]);
      break;
    case 'unpublish':
      await dbChel.query(`UPDATE wp_posts SET post_status = 'private' WHERE ID = ?`, [id]);
      break;
    default:
      break;
  }
}

async function applySpbAction(action: QmsPriceAction): Promise<void> {
  const prefix = getPrefix();
  const id = action.legacyId;
  switch (action.type) {
    case 'update_price':
      await pool.query(
        `UPDATE ${prefix}pricelist_items2 SET price = ? WHERE id = ?`,
        [action.price, id],
      );
      break;
    case 'update_title':
      await pool.query(
        `UPDATE ${prefix}pricelist_items2 SET name = ? WHERE id = ?`,
        [action.title, id],
      );
      break;
    case 'publish':
      await pool.query(
        `UPDATE ${prefix}pricelist_items2 SET published = 1 WHERE id = ?`,
        [id],
      );
      break;
    case 'unpublish':
      await pool.query(
        `UPDATE ${prefix}pricelist_items2 SET published = 0 WHERE id = ?`,
        [id],
      );
      break;
    default:
      break;
  }
}
