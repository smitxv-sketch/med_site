/** true в apps/studio (NEXT_PUBLIC_APP_TARGET=studio) */
export function isStudioApp(): boolean {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_APP_TARGET === 'studio') {
    return true;
  }
  if (typeof window !== 'undefined') {
    return window.location.hostname.startsWith('studio.');
  }
  return false;
}
