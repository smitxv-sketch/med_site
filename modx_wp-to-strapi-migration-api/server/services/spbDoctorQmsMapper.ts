import type { Doctor } from '../../src/types.js';
import type { QmsDoctorRow } from './spbQmsDoctorCatalog.js';

export type SpbDoctorQmsMapRow = {
  legacyId: string;
  fullName: string;
  slug: string;
  /** Все qqc через запятую — для Strapi misId и booking */
  misId: string;
  misIds: string[];
  confidence: 'high' | 'medium' | 'low' | 'none';
  matchSource: 'fio' | 'none';
  allowBooking: boolean;
};

export type SpbDoctorQmsMapFile = {
  generatedAt: string;
  stats: {
    modxTotal: number;
    qmsTotal: number;
    matched: number;
    unmatchedModx: number;
    unmatchedQms: number;
  };
  doctors: SpbDoctorQmsMapRow[];
  needsReview: Array<{ legacyId: string; fullName: string; reason: string }>;
  unmatchedQms: Array<{ misId: string; fullName: string }>;
};

/** Нормализация ФИО для сравнения */
export function normalizeDoctorName(name: string): string {
  return String(name || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Скор совпадения по словам ФИО (0..1) */
export function scoreDoctorNames(modxName: string, qmsName: string): number {
  const a = normalizeDoctorName(modxName).split(' ').filter(Boolean);
  const b = normalizeDoctorName(qmsName).split(' ').filter(Boolean);
  if (!a.length || !b.length) return 0;
  let matches = 0;
  for (const w of a) {
    if (b.includes(w)) matches++;
  }
  return matches / Math.max(a.length, b.length);
}

function confidenceFromScore(score: number): SpbDoctorQmsMapRow['confidence'] {
  if (score >= 0.85) return 'high';
  if (score >= 0.65) return 'medium';
  if (score >= 0.5) return 'low';
  return 'none';
}

/**
 * Собирает маппинг MODX → QMS по ФИО.
 * Один врач MODX может получить несколько qqc (разные филиалы/специальности в МИС).
 */
export function buildSpbDoctorQmsMap(
  modxDoctors: Array<Pick<Doctor, 'id' | 'pagetitle' | 'alias'>>,
  qmsDoctors: QmsDoctorRow[],
): SpbDoctorQmsMapFile {
  const qmsByNormName = new Map<string, QmsDoctorRow[]>();
  for (const q of qmsDoctors) {
    const key = normalizeDoctorName(q.fullName);
    if (!key) continue;
    const list = qmsByNormName.get(key) ?? [];
    list.push(q);
    qmsByNormName.set(key, list);
  }

  const usedMisIds = new Set<string>();
  const rows: SpbDoctorQmsMapRow[] = [];
  const needsReview: SpbDoctorQmsMapFile['needsReview'] = [];

  for (const doc of modxDoctors) {
    const legacyId = String(doc.id);
    const fullName = doc.pagetitle || 'Без имени';
    const slug = String(doc.alias || '').replace(/^doctor-/, '');

    let bestScore = 0;
    let bestQmsRows: QmsDoctorRow[] = [];

    const exact = qmsByNormName.get(normalizeDoctorName(fullName));
    if (exact?.length) {
      bestScore = 1;
      bestQmsRows = exact;
    } else {
      for (const q of qmsDoctors) {
        const score = scoreDoctorNames(fullName, q.fullName);
        if (score > bestScore) {
          bestScore = score;
          bestQmsRows = [q];
        } else if (score > 0 && score === bestScore && bestQmsRows[0]) {
          // несколько кандидатов с одинаковым скором — соберём все qqc того же ФИО
          if (normalizeDoctorName(q.fullName) === normalizeDoctorName(bestQmsRows[0].fullName)) {
            bestQmsRows.push(q);
          }
        }
      }
    }

    // Собираем все qqc того же нормализованного ФИО (филиалы)
    const matchedNorm = bestQmsRows[0]
      ? normalizeDoctorName(bestQmsRows[0].fullName)
      : '';
    const allMisIds = matchedNorm
      ? [
          ...new Set(
            qmsDoctors
              .filter((q) => normalizeDoctorName(q.fullName) === matchedNorm)
              .map((q) => q.misId),
          ),
        ]
      : [];

    const confidence = confidenceFromScore(bestScore);
    const hasMatch = allMisIds.length > 0 && bestScore >= 0.5;

    if (hasMatch) {
      for (const id of allMisIds) usedMisIds.add(id);
    }

    if (bestScore > 0 && bestScore < 0.85 && hasMatch) {
      needsReview.push({
        legacyId,
        fullName,
        reason: `fuzzy match score=${bestScore.toFixed(2)} → ${bestQmsRows[0]?.fullName}`,
      });
    }

    if (!hasMatch) {
      needsReview.push({
        legacyId,
        fullName,
        reason: bestScore > 0 ? `low score ${bestScore.toFixed(2)}` : 'no QMS match',
      });
    }

    rows.push({
      legacyId,
      fullName,
      slug,
      misIds: hasMatch ? allMisIds : [],
      misId: hasMatch ? allMisIds.join(',') : `spb-legacy-${legacyId}`,
      confidence: hasMatch ? confidence : 'none',
      matchSource: hasMatch ? 'fio' : 'none',
      allowBooking: hasMatch,
    });
  }

  const unmatchedQms = qmsDoctors
    .filter((q) => !usedMisIds.has(q.misId))
    .map((q) => ({ misId: q.misId, fullName: q.fullName }));

  return {
    generatedAt: new Date().toISOString(),
    stats: {
      modxTotal: modxDoctors.length,
      qmsTotal: qmsDoctors.length,
      matched: rows.filter((r) => r.misIds.length > 0).length,
      unmatchedModx: rows.filter((r) => !r.misIds.length).length,
      unmatchedQms: unmatchedQms.length,
    },
    doctors: rows,
    needsReview,
    unmatchedQms,
  };
}
