'use client';

import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';
import React, { type ReactNode } from 'react';

type To = string | { pathname?: string; search?: string; hash?: string };

function resolveTo(to: To): string {
  if (typeof to === 'string') return to;
  const pathname = to.pathname ?? '/';
  return `${pathname}${to.search ?? ''}${to.hash ?? ''}`;
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

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  return {} as T;
}

export function useSearchParams(): [URLSearchParams, (next: Record<string, string>) => void] {
  const params = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname() ?? '/';

  const setSearchParams = (next: Record<string, string>) => {
    const q = new URLSearchParams(next);
    const qs = q.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return [params ?? new URLSearchParams(), setSearchParams];
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
