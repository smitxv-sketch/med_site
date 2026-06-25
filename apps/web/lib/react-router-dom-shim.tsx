'use client';

/**
 * Адаптер react-router-dom → Next.js App Router.
 * Виджеты прототипа импортируют Link/useNavigate из react-router-dom;
 * в Next нет BrowserRouter, без shim падает SectionErrorBoundary.
 */
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';
import React, { type ReactNode } from 'react';

type To = string | { pathname?: string; search?: string; hash?: string };

function resolveTo(to: To): string {
  if (typeof to === 'string') return to;
  const pathname = to.pathname ?? '/';
  const search = to.search ?? '';
  const hash = to.hash ?? '';
  return `${pathname}${search}${hash}`;
}

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> & {
  to?: To;
  href?: string;
};

export function Link({ to, href, children, replace, ...rest }: LinkProps) {
  const target = href ?? (to != null ? resolveTo(to) : '/');
  return (
    <NextLink href={target} replace={replace} {...rest}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, className, children, ...rest }: LinkProps & { className?: string | ((p: { isActive: boolean }) => string) }) {
  const pathname = usePathname();
  const href = to != null ? resolveTo(to) : '/';
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <NextLink href={href} className={resolvedClassName} {...rest}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to: To, options?: { replace?: boolean }) => {
    const href = resolveTo(to);
    if (options?.replace) router.replace(href);
    else router.push(href);
  };
}

export function useLocation() {
  const pathname = usePathname() ?? '/';
  return { pathname, search: '', hash: '', state: null, key: 'default' };
}

/** Совместимость с react-router v6 для Studio (?tenant=) */
export function useSearchParams(): [
  URLSearchParams,
  (next: Record<string, string> | URLSearchParams) => void,
] {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const nextParams = useNextSearchParams();
  const params = new URLSearchParams(nextParams?.toString() ?? '');

  const setSearchParams = (next: Record<string, string> | URLSearchParams) => {
    const merged =
      next instanceof URLSearchParams
        ? next
        : new URLSearchParams({ ...Object.fromEntries(params), ...next });
    const qs = merged.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return [params, setSearchParams];
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  // Для Wave 1A достаточно пустого объекта — детальные страницы ещё на Vite
  return {} as T;
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Route() {
  return null;
}

export function Outlet() {
  return null;
}
