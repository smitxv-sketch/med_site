/** Нормализует телефон для href="tel:..." */
export function formatTelHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, '')}`;
}
