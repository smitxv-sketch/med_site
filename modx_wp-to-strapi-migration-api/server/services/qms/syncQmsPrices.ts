import type {
  QmsPriceItem,
  QmsPriceSyncOptions,
  QmsPriceSyncReport,
} from '../../types/qmsPrice.js';
import { DEFAULT_QMS_PRICE_SYNC_OPTIONS } from '../../types/qmsPrice.js';
import type { QmsCity } from '../qmsPricelistService.js';
import { compareQmsToLegacy } from './compareQmsPrices.js';
import { flattenQmsSections } from './qmsPriceNormalizer.js';
import { fetchQmsSections, orgConfigsForCity } from './qmsTransport.js';
import { loadLegacyPrices } from './legacyPriceCatalog.js';
import { applyLegacyPriceActions } from './legacyPriceWriter.js';

export type RunQmsPriceSyncInput = {
  city: QmsCity;
  options?: Partial<QmsPriceSyncOptions>;
};

/** Загрузка и merge прайса из всех org города */
export async function fetchQmsPriceItems(city: QmsCity): Promise<{
  items: QmsPriceItem[];
  transport: string[];
  errors: string[];
}> {
  const orgs = orgConfigsForCity(city);
  if (!orgs.length) {
    throw new Error(`QMS env не настроен для city=${city}`);
  }

  const map = new Map<string, QmsPriceItem>();
  const transport: string[] = [];
  const errors: string[] = [];

  for (const org of orgs) {
    try {
      const result = await fetchQmsSections(org);
      transport.push(`${org.sourceKey}:${result.transport}`);
      const flat = flattenQmsSections(result.sections, org.qqc244, org.sourceKey);
      for (const item of flat) {
        map.set(item.article, item);
      }
    } catch (e) {
      errors.push(`${org.sourceKey}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (!map.size) {
    throw new Error(errors.join('; ') || 'Нет данных QMS');
  }

  return { items: [...map.values()], transport, errors };
}

/** Универсальный синк цен: fetch QMS → diff legacy → (опционально) запись */
export async function runQmsPriceSync(input: RunQmsPriceSyncInput): Promise<QmsPriceSyncReport & {
  writeResult?: { applied: number; errors: string[] };
  fetchErrors?: string[];
}> {
  const options: QmsPriceSyncOptions = {
    ...DEFAULT_QMS_PRICE_SYNC_OPTIONS,
    ...input.options,
  };

  const { items, transport, errors: fetchErrors } = await fetchQmsPriceItems(input.city);
  const legacyItems = await loadLegacyPrices(input.city);
  const { report, actions } = compareQmsToLegacy(input.city, items, legacyItems, options);

  report.transport = transport;

  if (!options.demo && options.target === 'legacy' && actions.length) {
    const writeResult = await applyLegacyPriceActions(actions);
    return { ...report, writeResult, fetchErrors: fetchErrors.length ? fetchErrors : undefined };
  }

  return {
    ...report,
    fetchErrors: fetchErrors.length ? fetchErrors : undefined,
    writeResult: options.demo
      ? { applied: 0, errors: [] }
      : undefined,
  };
}
