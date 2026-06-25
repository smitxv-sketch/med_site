'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useMemo } from 'react';
import {
  DEFAULT_TENANT_ID,
  getTenantById,
  resolveTenant,
  TENANTS,
  type TenantConfig,
} from '@med-site/contracts';

export interface TenantContextValue {
  tenantId: string;
  tenant: TenantConfig;
}

const TenantContext = createContext<TenantContextValue | null>(null);

function fallbackTenant(): TenantConfig {
  return (
    getTenantById(DEFAULT_TENANT_ID) ??
    TENANTS.find((t) => t.id === DEFAULT_TENANT_ID) ??
    TENANTS[0]
  );
}

function resolveTenantIdFromWindow(): string {
  if (typeof window === 'undefined') return DEFAULT_TENANT_ID;
  try {
    return resolveTenant({
      host: window.location.host,
      pathname: window.location.pathname,
    }).tenant.id;
  } catch {
    return DEFAULT_TENANT_ID;
  }
}

export function TenantProvider({
  tenantId,
  children,
}: {
  tenantId?: string;
  children: ReactNode;
}) {
  const value = useMemo<TenantContextValue>(() => {
    const id = tenantId ?? resolveTenantIdFromWindow();
    const tenant = getTenantById(id) ?? fallbackTenant();
    return { tenantId: tenant.id, tenant };
  }, [tenantId]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant(): TenantContextValue {
  const ctx = useContext(TenantContext);
  if (ctx) return ctx;
  const tenant = fallbackTenant();
  return { tenantId: tenant.id, tenant };
}

