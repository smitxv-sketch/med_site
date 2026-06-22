# Wave 0 Report — Platform Foundations

Date: 2026-06-22  
Agent: Cursor AI  
Scope: Wave 0 only (no Wave 1+ work)

---

## 1) Summary

Wave 0 monorepo skeleton is in place alongside the legacy Vite/Express prototype:

- **npm workspaces** at repo root: `apps/*`, `packages/*`
- **apps/web** — Next.js 15 App Router, health at `/health` and `/api/health` (port 3002)
- **apps/bff** — Express skeleton with `/health` (port 3001)
- **apps/cms** — Strapi 5.48.1 scaffold, Postgres via `docker-compose.yml`, i18n locales `ru-chel` / `ru-spb`
- **packages/contracts** — tenant SSOT + `resolveTenant()` utility
- **packages/page-engine** — stub for Wave 1 migration
- **packages/booking-widget** — packaging boundary pointing at `/src/widget` (no logic changes)
- **Secrets hygiene** — removed tracked secret files; env-based configuration documented
- **Docs** — `docs/DEV_MONOREPO.md`, this report

**Blocker (Postgres):** Docker is not installed on this host — `docker compose` unavailable, Postgres on `:5433` not reachable.

**Partial verification (SQLite smoke test):** After fixing monorepo `ajv` hoisting (`package.json` overrides + root `ajv@8`), Strapi 5.48.1 starts successfully:

```
Strapi started successfully
GET http://localhost:1337/admin → 200
```

Production path remains **Postgres via `docker compose`** — install Docker Desktop and run `npm run db:up` in `apps/cms`.

---

## 2) Changed files

### Modified
- `.env.example`
- `.gitignore`
- `package.json`
- `package-lock.json`
- `server/config/infrastructure.json`
- `src/admin/DiagnosticTools.tsx`

### Deleted (secrets removed from git)
- `firebase-applet-config.json`
- `php_backend/config_access.php`

### Added
- `apps/web/**` — Next.js app
- `apps/bff/**` — Express BFF
- `apps/cms/**` — Strapi 5 + `docker-compose.yml`
- `packages/contracts/**`
- `packages/page-engine/**`
- `packages/booking-widget/**`
- `docs/DEV_MONOREPO.md`
- `docs/agent-reports/wave-0-report.md`
- `firebase-applet-config.example.json`
- `php_backend/config_access.example.php`

### Untouched (black box)
- `src/widget/**` — no changes
- PHP/QMS booking backend — no changes

---

## 3) Commands run + results

### Environment
```
node -v  → v24.16.0
npm -v   → 11.13.0
```

### Git
```
git status     → see section 2
git diff --stat → 8 tracked files changed (+29962/-5332 in lockfile)
```

### Install
```
npm install    → OK (2161 packages audited, workspaces linked)
npm run build -w @med-site/contracts → OK
```

### Legacy prototype
```
npm run build  → OK (vite build + esbuild server bundle)
```

### apps/bff
```
npm run dev -w @med-site/bff
Invoke-RestMethod http://localhost:3001/health
→ {"status":"ok","service":"bff","dataMode":"mock"}
```

### apps/web
```
npm run dev -w @med-site/web
Invoke-RestMethod http://localhost:3002/api/health
→ {"status":"ok","service":"web","dataMode":"mock"}
Invoke-WebRequest http://localhost:3002/health
→ 200, body: ok
```

### apps/cms (continued session)
```
# After ajv override + root ajv@8 dependency:
$env:DATABASE_CLIENT='sqlite'; $env:DATABASE_FILENAME='.tmp/data.db'
npm run develop -w @med-site/cms
→ "Strapi started successfully"
Invoke-WebRequest http://localhost:1337/admin → 200

# Postgres path (still blocked):
docker compose up -d → FAIL (docker not in PATH)
npm run develop -w @med-site/cms (postgres .env) → ECONNREFUSED 127.0.0.1:5433
```

### Typecheck
```
npm run typecheck -w @med-site/bff       → OK
npm run typecheck -w @med-site/contracts   → OK
```

---

## 4) DoD checklist

| Criterion | Status |
|-----------|--------|
| Legacy prototype still runs/builds | **PASS** (`npm run build` OK; `npm run dev` unchanged) |
| apps/web starts + health | **PASS** |
| apps/bff starts + health | **PASS** |
| apps/cms starts with Postgres + admin | **PARTIAL** — Strapi admin verified via SQLite smoke test; Postgres path blocked (no Docker) |
| No secrets in tracked files | **PASS** (see audit; archive docs contain historical placeholders only) |
| SSOT tenants + resolver | **PASS** (`packages/contracts`) |
| Report + dev docs | **PASS** |

---

## 5) Secrets audit

| Location | Before | After |
|----------|--------|-------|
| `server/config/infrastructure.json` | `api_keys` with `sk-...`, recaptcha values | `env` map with env var **names** only |
| `php_backend/config_access.php` | Tracked with placeholder passwords/tokens | **Deleted**; use `config_access.example.php` → copy locally |
| `firebase-applet-config.json` | Tracked with real Firebase `apiKey` | **Deleted**; use `firebase-applet-config.example.json` |
| `src/admin/DiagnosticTools.tsx` | Default API key preview `vpcM...` | Empty string default |
| Root `.env.example` | Partial | Extended: QMS, AI, reCAPTCHA, OpenAI, Redis |
| `apps/*/.env.example` | — | Added per-app examples |
| `.gitignore` | Basic | Added secret paths, Strapi/Next build dirs |

**How to set secrets now:**
- Local: copy relevant `.env.example` → `.env`
- PHP: copy `php_backend/config_access.example.php` → `php_backend/config_access.php`
- Production: Coolify secret store (same variable names)

---

## 6) Risks / Notes

- **Monorepo ajv hoisting** — fixed via `overrides.ajv` + root `ajv@8` dependency (required for Strapi umzug migrations).
- **date-fns version clash** — root `date-fns@4` vs Strapi admin `date-fns-tz`; mitigated with `installConfig.hoistingLimits` on cms workspace. Admin Vite may still warn until full reinstall.
- **Docker required for Postgres DoD** — without it Strapi cannot use production DB path.
- **Large lockfile diff** — Strapi 5 adds ~1400 packages.
- **Next.js 15.1.0** — pinned version has CVE advisory; upgrade in Wave 1.
- **apps/cms/.env** — generated locally, gitignored.

---

## 7) Follow-ups (Wave 1+ only)

- Next.js SEO pages, Page Engine extraction, Strapi models, ISR, tenant middleware
- Migrate `server/` → `apps/bff`
- Embed booking widget in Next
- CI checks across workspaces

**Git commit:** not performed (per instructions).

---

## 8) Confirmations

- **Booking widget black-box:** `/src/widget` not modified.
- **Zero Hardcode:** tenant topology in `packages/contracts`; env-based secrets.

---

## CMS unblock

1. Install Docker Desktop, then:
   ```bash
   cd apps/cms && docker compose up -d
   npm run develop -w @med-site/cms
   ```
2. Or run local Postgres on port 5433 (user/db/password: `strapi`).
