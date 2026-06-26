import type { Request, Response } from 'express';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

type StrapiDoctorRow = {
  documentId?: string;
  id?: number;
  fullName?: string;
  specialty?: string | null;
  photoUrl?: string | null;
  experienceYears?: number | null;
  degree?: string | null;
  category?: string | null;
  misId?: string | null;
  legacyId?: string | null;
  slug?: string;
  photo?: { url?: string };
};

/** Врачи из Strapi CMS для страницы /doctors */
export async function getStrapiDoctorsHandler(req: Request, res: Response) {
  const tenant = (req.query.tenant as string) || 'chel';
  const locale = tenant === 'spb' ? 'ru-spb' : 'ru-chel';
  const token = getStrapiToken();

  if (!token) {
    return res.status(503).json({ error: 'STRAPI_API_TOKEN not configured' });
  }

  try {
    const base = getStrapiUrl().replace(/\/$/, '');
    const qs = new URLSearchParams({
      locale,
      'filters[legacySource][$eq]': tenant,
      'pagination[pageSize]': '200',
      publicationState: 'live',
    });
    const url = `${base}/api/doctors?${qs}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Strapi ${response.status}`);
    }

    const json = (await response.json()) as { data?: StrapiDoctorRow[] };
    let items = json.data ?? [];

    // Миграционный fallback: записи без locale=ru-chel (например ru-RU после первого синка)
    if (items.length === 0) {
      const fallbackQs = new URLSearchParams({
        'filters[legacySource][$eq]': tenant,
        'pagination[pageSize]': '200',
        publicationState: 'live',
      });
      const fallbackRes = await fetch(`${base}/api/doctors?${fallbackQs}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        cache: 'no-store',
      });
      if (fallbackRes.ok) {
        const fallbackJson = (await fallbackRes.json()) as { data?: StrapiDoctorRow[] };
        items = fallbackJson.data ?? [];
      }
    }

    const doctors = items.map((row) => {
      const a = row;
      const photoUrl = a.photoUrl
        || (a.photo?.url
          ? (a.photo.url.startsWith('http') ? a.photo.url : `${base}${a.photo.url}`)
          : undefined);

      const misRaw = a.misId ? String(a.misId) : '';
      const qmsIds = misRaw.split(',').map((s) => s.trim()).filter(Boolean);

      return {
        id: String(a.legacyId || a.documentId || a.id),
        name: a.fullName || '',
        specialty: a.specialty || '',
        image: photoUrl,
        experienceYears: a.experienceYears ?? undefined,
        degree: a.degree ?? undefined,
        category: a.category ?? undefined,
        qmsIds,
        misId: misRaw || null,
        slug: a.slug,
      };
    });

    res.json(doctors);
  } catch (error) {
    console.error('Strapi doctors fetch failed:', error);
    res.status(500).json({ error: 'Failed to fetch doctors from Strapi' });
  }
}
