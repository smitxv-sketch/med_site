# Monorepo dev guide (Wave 0)

Platform layout for the Next.js + Strapi + BFF target architecture. The **legacy Vite prototype** at repo root remains runnable.

## Structure

```
apps/
  web/     — Next.js App Router (port 3002)
  bff/     — Express BFF (port 3001)
  cms/     — Strapi 5 + Postgres (port 1337)
packages/
  contracts/       — SSOT types, tenant config, API contracts
  page-engine/     — PageRenderer stub (Wave 1)
  booking-widget/  — Packaging boundary for /src/widget (black box)
src/, server/      — Legacy prototype (unchanged)
```

## Prerequisites

- Node.js 20+ (tested: v24.16.0)
- npm 10+ (tested: 11.13.0)
- Docker Desktop (for Strapi Postgres)

## Install

From repo root:

```bash
npm install
npm run build:packages   # optional: build @med-site/contracts
```

## Run commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Legacy prototype (Vite + Express on :3000) |
| `npm run dev:web` | Next.js on http://localhost:3002 |
| `npm run dev:bff` | BFF on http://localhost:3001 |
| `npm run dev:cms` | Strapi admin on http://localhost:1337 |
| `npm run build` | Legacy prototype production build |

## Health checks

```bash
curl http://localhost:3001/health
curl http://localhost:3002/health
curl http://localhost:3002/api/health
```

## Strapi + Postgres

```bash
cd apps/cms
docker compose up -d
cp .env.example .env   # first time — fill APP_KEYS and secrets
cd ../..
npm run develop -w @med-site/cms
```

Open http://localhost:1337/admin

**Strapi MCP (для агента в Cursor):** [docs/DEV_STRAPI_MCP.md](./DEV_STRAPI_MCP.md)

## Environment files

Секреты: **4 файла** в `infra/env/` — по одному на приложение Coolify (см. `infra/env/*.env.example`).

| Файл | Coolify app |
|------|-------------|
| `legacy-bridge-istochnik.env` | legacy-bridge-istochnik |
| `site-ci.env` | site-ci |
| `studio-istochnik.env` | studio-istochnik |
| `strapi-istochnik.env.example` | strapi-istochnik (справка; локально Strapi не запускаем) |

Never commit `infra/env/*.env` or root `.env`.

## Tenants SSOT

City tenants (Strapi locales) live in `packages/contracts/src/tenants.ts`.  
Resolver: `packages/contracts/src/resolveTenant.ts` — see `packages/contracts/README.md`.
