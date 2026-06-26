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
    locale: string,
  ): Promise<{ documentId: string; contentLocked?: boolean } | null> {
    const qs = new URLSearchParams({
      'filters[legacyId][$eq]': legacyId,
      locale,
      'pagination[pageSize]': '1',
    });
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
    };
  }
}
