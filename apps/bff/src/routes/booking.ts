import type { Request, Response } from 'express';
import { z } from 'zod';
// Импорт из legacy /server — в Docker копируется в образ platform (см. apps/platform/Dockerfile)
import { loadConfig } from '../legacy/configService.js';
import { qmsDriver } from '../legacy/drivers/QmsDriver.js';
import { getWpDoctors, clearWpCache } from '../legacy/wpService.js';
import { hydrateDoctors } from '../legacy/hydratorService.js';
import { bookingSchema } from '../legacy/schemas/booking.js';

/** Врачи для виджета записи: QMS + обогащение из WP (по specialty) */
export async function getBookingDoctorsHandler(req: Request, res: Response) {
  const city = (req.query.city as string) || 'chel';
  const specialty = req.query.specialty as string | undefined;
  const rawDoctors = await qmsDriver.getDoctors(city, specialty);
  const doctors = await hydrateDoctors(rawDoctors, city);
  res.json(doctors);
}

export async function getWpDoctorsHandler(_req: Request, res: Response) {
  try {
    const doctors = await getWpDoctors();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching WP doctors:', error);
    res.status(500).json({ error: 'Failed to fetch WP doctors' });
  }
}

export async function clearWpDoctorsCacheHandler(_req: Request, res: Response) {
  await clearWpCache();
  res.json({ success: true, message: 'Cache cleared' });
}

export function getBranchesHandler(_req: Request, res: Response) {
  res.json(loadConfig('branches'));
}

export function getThemeHandler(_req: Request, res: Response) {
  res.json(loadConfig('theme'));
}

export function getTextHandler(_req: Request, res: Response) {
  res.json(loadConfig('text'));
}

export function getConfigHandler(_req: Request, res: Response) {
  res.json(loadConfig('logic'));
}

export async function getServicesHandler(req: Request, res: Response) {
  const city = (req.query.city as string) || 'chel';
  const services = await qmsDriver.getServices(city);
  res.json(services);
}

export async function getSlotsHandler(req: Request, res: Response) {
  const { doctor_id, date, specialty } = req.query;
  const city = (req.query.city as string) || 'chel';

  const slots = await qmsDriver.getSlots(
    city,
    doctor_id as string,
    date as string | undefined,
    specialty as string,
  );

  const rawData = await qmsDriver.getRawSlots(
    city,
    doctor_id as string,
    date as string | undefined,
  );

  res.json({ slots, rawData });
}

export async function postBookHandler(req: Request, res: Response) {
  try {
    const validatedData = bookingSchema.parse(req.body);
    const city = validatedData.databaseId ? validatedData.databaseId.split('_')[0] : 'chel';

    const result = await qmsDriver.createAppointment(city, validatedData);

    if (result.success) {
      res.json({ success: true, message: 'Booking confirmed', booking: result.data });
    } else {
      res.status(400).json({ error: result.error || 'Booking failed', details: (result as { details?: unknown }).details });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
