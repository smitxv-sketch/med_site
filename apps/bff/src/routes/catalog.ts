import type { Request, Response } from 'express';
import { buildPriceCatalog, resolveTenantLocale } from '../services/catalogPricesService.js';
import { fetchCatalogServiceDetail } from '../services/catalogServiceDetail.js';

export async function getCatalogPricesHandler(req: Request, res: Response) {
  const tenant =
    (req.query.tenant as string) ||
    (req.headers['x-tenant-id'] as string) ||
    'spb';

  const mapped = resolveTenantLocale(tenant);
  if (!mapped) {
    return res.status(400).json({
      error: `Каталог прайса для tenant=${tenant} ещё не подключён`,
    });
  }

  const categorySlug =
    typeof req.query.category === 'string' ? req.query.category.trim() : '';
  const tabQms = typeof req.query.tab === 'string' ? req.query.tab.trim() : '';

  try {
    const catalog = await buildPriceCatalog({
      tenant,
      locale: mapped.locale,
      categorySlug: categorySlug || undefined,
      tabQms: tabQms || undefined,
    });
    res.json(catalog);
  } catch (error) {
    console.error('catalog/prices failed:', error);
    res.status(500).json({ error: 'Failed to fetch prices catalog' });
  }
}

/** GET /api/catalog/services/:article — программа с составом */
export async function getCatalogServiceHandler(req: Request, res: Response) {
  const tenant =
    (req.query.tenant as string) ||
    (req.headers['x-tenant-id'] as string) ||
    'spb';
  const article = String(req.params.article ?? '').trim();
  if (!article) return res.status(400).json({ error: 'article required' });

  const mapped = resolveTenantLocale(tenant);
  if (!mapped) {
    return res.status(400).json({ error: `tenant=${tenant} not supported` });
  }

  try {
    const detail = await fetchCatalogServiceDetail(article, mapped.locale);
    if (!detail) return res.status(404).json({ error: 'Service not found' });
    res.json(detail);
  } catch (error) {
    console.error('catalog/service failed:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
}
