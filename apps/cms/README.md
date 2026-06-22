# Strapi CMS (Wave 0)

Headless CMS with Postgres (production path). i18n is built into Strapi 5 — configure city locales in **Settings → Internationalization** after first admin signup.

## Prerequisites

- Node.js 20+
- **Docker Desktop** (for Postgres via compose)

## Local run (Postgres — target path)

```bash
cd apps/cms
docker compose up -d
cp .env.example .env   # fill APP_KEYS + secrets (see below)
cd ../..
npm run develop -w @med-site/cms
```

Admin: http://localhost:1337/admin

**MCP для Cursor:** см. [docs/DEV_STRAPI_MCP.md](../../docs/DEV_STRAPI_MCP.md) — включён в `config/server.ts`, эндпоинт `/mcp`.

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Use four comma-separated values for `APP_KEYS`.

## Smoke test without Docker (SQLite only)

For machines without Docker — verifies Strapi scaffold only, **not** the production DB path:

```powershell
$env:DATABASE_CLIENT='sqlite'
$env:DATABASE_FILENAME='.tmp/data.db'
npm run develop -w @med-site/cms
```

## i18n / city tenants

- Env: `STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE` (see `.env.example`)
- Tenant locale codes (`ru-chel`, `ru-spb`) are SSOT in `packages/contracts` — add matching locales in Strapi admin in Wave 1

## Monorepo notes

Root `package.json` includes `overrides.ajv` — required for Strapi migrations in npm workspaces.  
`apps/cms` uses `installConfig.hoistingLimits: workspaces` to reduce dependency conflicts with the legacy Vite app.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run db:up` | `docker compose up -d` |
| `npm run db:down` | `docker compose down` |
| `npm run develop -w @med-site/cms` | Strapi dev server |
