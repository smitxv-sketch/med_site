import { z } from 'zod';

export const bookingSchema = z.object({
  databaseId: z.string().optional(),
  service_id: z.string().min(1),
  doctor_id: z.string().min(1),
  slot: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  patient: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short")
  }),
  recaptcha_token: z.string().optional()
});

export type BookingRequest = z.infer<typeof bookingSchema>;
