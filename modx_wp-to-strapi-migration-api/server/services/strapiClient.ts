import fetch from 'node-fetch';

export class StrapiClient {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.token = token;
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  private async fetchWithRetry(url: string, options: any, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, options);
        
        // Success or client error (don't retry 400, 401, 403, 404)
        if (res.ok || (res.status >= 400 && res.status < 500 && res.status !== 429)) {
          return res;
        }

        // Rate limit (429) or Server Error (5xx) -> Retry
        if (res.status === 429 || res.status >= 500) {
          const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
          console.warn(`Strapi API overloaded (${res.status}). Retrying in ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
      } catch (error: any) {
        // Network error -> Retry
        if (i === retries - 1) throw error;
        const delay = Math.pow(2, i) * 1000;
        console.warn(`Network error: ${error.message}. Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
  }

  async checkConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // API Token Strapi не работает с /users/me — проверяем content API
      const probe = new URLSearchParams({ 'pagination[pageSize]': '1' });
      const res = await this.fetchWithRetry(`${this.baseUrl}/api/doctors?${probe}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      if (res.ok) {
        return { success: true, message: 'Успешное подключение к Strapi API' };
      }

      if (res.status === 401 || res.status === 403) {
        return { success: false, message: 'Ошибка авторизации: неверный токен' };
      }

      if (res.status === 404) {
        return {
          success: false,
          message:
            'Коллекция doctors не найдена в Strapi — задеплойте apps/cms (content-type Doctor)',
        };
      }

      return { success: false, message: `Ошибка API: ${res.status} ${res.statusText}` };
    } catch (error: any) {
      return { success: false, message: `Ошибка сети: ${error.message}` };
    }
  }

  async createEntry(collection: string, data: Record<string, unknown>): Promise<any> {
    const { locale, ...payload } = data;
    const localeQs =
      typeof locale === 'string' && locale
        ? `?locale=${encodeURIComponent(locale)}`
        : '';
    const res = await this.fetchWithRetry(`${this.baseUrl}/api/${collection}${localeQs}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ data: payload }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(`Failed to create entry in ${collection}: ${res.statusText} - ${JSON.stringify(errorData)}`);
    }

    return res.json();
  }

  async updateEntry(collection: string, id: string | number, data: Record<string, unknown>): Promise<any> {
    const { locale, ...payload } = data;
    const localeQs =
      typeof locale === 'string' && locale
        ? `?locale=${encodeURIComponent(locale)}`
        : '';
    const res = await this.fetchWithRetry(`${this.baseUrl}/api/${collection}/${id}${localeQs}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ data: payload }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(`Failed to update entry ${id} in ${collection}: ${res.statusText} - ${JSON.stringify(errorData)}`);
    }

    return res.json();
  }

  /** Поиск по legacy_id (синк add + safe-update) */
  async findByLegacyId(
    collection: string,
    legacyId: string,
    locale?: string,
  ): Promise<{ documentId: string; contentLocked?: boolean } | null> {
    const row = await this.findRowByLegacyId(collection, legacyId, locale);
    if (row) return row;

    if (locale) {
      return this.findRowByLegacyId(collection, legacyId);
    }
    return null;
  }

  private async findRowByLegacyId(
    collection: string,
    legacyId: string,
    locale?: string,
  ): Promise<{ documentId: string; contentLocked?: boolean; slug?: string; legacyId?: string } | null> {
    const qs = new URLSearchParams({
      'filters[legacyId][$eq]': legacyId,
      'pagination[pageSize]': '1',
    });
    if (locale) qs.set('locale', locale);

    const res = await this.fetchWithRetry(`${this.baseUrl}/api/${collection}?${qs}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const row = json?.data?.[0];
    if (!row) return null;
    const attrs = row.attributes ?? row;
    return {
      documentId: String(row.documentId ?? row.id),
      contentLocked: Boolean(attrs.contentLocked),
      slug: attrs.slug ? String(attrs.slug) : undefined,
      legacyId: attrs.legacyId ? String(attrs.legacyId) : undefined,
    };
  }

  async findBySlug(
    collection: string,
    slug: string,
  ): Promise<{ documentId: string } | null> {
    const qs = new URLSearchParams({
      'filters[slug][$eq]': slug,
      'pagination[pageSize]': '1',
    });
    const res = await this.fetchWithRetry(`${this.baseUrl}/api/${collection}?${qs}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const row = json?.data?.[0];
    if (!row) return null;
    return { documentId: String(row.documentId ?? row.id) };
  }

  /** Список всех записей коллекции (пагинация) */
  async listAll(
    collection: string,
    opts: { pageSize?: number; locale?: string } = {},
  ): Promise<Array<{ documentId: string; slug?: string; legacyId?: string }>> {
    const pageSize = opts.pageSize ?? 100;
    const out: Array<{ documentId: string; slug?: string; legacyId?: string }> = [];
    let page = 1;

    for (;;) {
      const qs = new URLSearchParams({
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
        publicationState: 'preview',
      });
      if (opts.locale) qs.set('locale', opts.locale);

      const res = await this.fetchWithRetry(`${this.baseUrl}/api/${collection}?${qs}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (!res.ok) break;
      const json = await res.json();
      const batch = json?.data ?? [];
      if (!Array.isArray(batch) || batch.length === 0) break;

      for (const row of batch) {
        const attrs = row.attributes ?? row;
        out.push({
          documentId: String(row.documentId ?? row.id),
          slug: attrs.slug ? String(attrs.slug) : undefined,
          legacyId: attrs.legacyId ? String(attrs.legacyId) : undefined,
        });
      }

      const pageCount = json?.meta?.pagination?.pageCount;
      if (!pageCount || page >= pageCount) break;
      page += 1;
    }

    return out;
  }

  /** Strapi v5: set relations */
  async setRelations(
    collection: string,
    documentId: string,
    relations: Record<string, string[]>,
    locale?: string,
  ): Promise<void> {
    const data: Record<string, { set: string[] }> = {};
    for (const [field, ids] of Object.entries(relations)) {
      data[field] = { set: ids };
    }
    await this.updateEntry(collection, documentId, { ...data, locale });
  }
}
