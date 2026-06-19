/** Страницы с собственным contextual action bar — глобальный bottom nav скрыт */
export function isContextualBottomNavPage(pathname: string): boolean {
  return (
    /^\/services\/[^/]+\/[^/]+$/.test(pathname) ||
    /^\/doctors\/[^/]+$/.test(pathname)
  );
}
