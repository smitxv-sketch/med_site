import { postQmsBooking } from './qms/qmsBookingApi.js';

export type QmsDoctorRow = {
  misId: string;
  fullName: string;
  specialties: string[];
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Каталог врачей СПб из QMS: spec_list → getslotsbyspec по каждой специальности.
 * qqc в ответе = doctor_id для booking (/api/slots?doctor_id=…).
 */
export async function fetchSpbQmsDoctorCatalog(): Promise<{
  doctors: QmsDoctorRow[];
  specsCount: number;
  transport: string;
}> {
  const specRes = await postQmsBooking('spb', 'spec_list', { chatid: '999', qqc244: '' });
  const specPayload = specRes.data as { spec?: string[] };
  const specs = specPayload.spec ?? [];
  const byMisId = new Map<string, QmsDoctorRow>();

  for (const spec of specs) {
    try {
      const slotRes = await postQmsBooking('spb', 'getslotsbyspec', {
        chatid: '999',
        spec,
      });
      const payload = slotRes.data as {
        slots?: Array<{ qqc?: string; doctor?: string; fio?: string; spec?: string }>;
      };
      for (const block of payload.slots ?? []) {
        const misId = block.qqc?.trim();
        if (!misId) continue;
        const fullName = (block.doctor || block.fio || '').trim();
        const existing = byMisId.get(misId);
        if (existing) {
          if (spec && !existing.specialties.includes(spec)) {
            existing.specialties.push(spec);
          }
          if (!existing.fullName && fullName) existing.fullName = fullName;
        } else {
          byMisId.set(misId, {
            misId,
            fullName,
            specialties: spec ? [spec] : [],
          });
        }
      }
      await sleep(250);
    } catch (e) {
      console.warn('[spbQmsDoctorCatalog] spec failed:', spec, e);
    }
  }

  return {
    doctors: [...byMisId.values()].sort((a, b) => a.fullName.localeCompare(b.fullName, 'ru')),
    specsCount: specs.length,
    transport: specRes.transport,
  };
}
