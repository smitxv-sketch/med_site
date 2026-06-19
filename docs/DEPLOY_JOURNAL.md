# Журнал деплоя med_site → Coolify

## Изменения для песочницы (повторить перед экспортом)

### 1. `.npmrc` (новый файл)
```
legacy-peer-deps=true
```

### 2. `server/index.ts`
Заменить:
```ts
const PORT = 3000;
```
На:
```ts
const PORT = Number(process.env.PORT) || 3000;
```

### 3. `nixpacks.toml` (новый файл)
```toml
[phases.setup]
nixPkgs = ["nodejs_20"]

[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"

[variables]
NODE_ENV = "production"
```

### 4. `package.json`
```json
"start": "node dist/index.js"
```

### 5. `server/index.ts` — статика
```ts
const clientDist = path.join(__dirname, '.');
app.use(express.static(clientDist));
```

### 6. Картинка конференции (локально, не в main)
Заменить `/IMG_5850.JPG` на:
```
https://thumb.cloud.mail.ru/weblink/thumb/xw1/4R8k/YCiDxfxbt?mt=1779340982000
```
Файлы: `contentApi.ts`, `EventsPage.tsx`, `NewsPage.tsx`, `eventData.ts`.

### 7. Coolify UI
- Domains: `https://istochnik.smitx.ru`
- Env: `NODE_ENV=production`, `PORT=3000`
- Build: Install `npm install --legacy-peer-deps`, Build `npm run build`, Start `npm start`
- Publish Directory: пусто

> Полный чеклист и ТЗ для Gemini Studio: **`docs/GEMINI_SANDBOX_SYNC.md`**

---

## Лог деплоев

| # | Дата | Действие | Результат |
|---|------|----------|-----------|
| 1 | 2026-06-17 | Добавлены .npmrc, nixpacks.toml, dynamic PORT | pushed `42e4c1d`, `01b82db` |
| 2 | 2026-06-17 | Fix start path dist/index.js + static dir | pushed `c693329` |
| 3 | 2026-06-17 | Coolify Traefik fqdn https://, redeploy | site 200 OK |
| 4 | 2026-06-17 | Замена картинки конференции (mail.ru URL) | локально, не pushed |
| 5 | 2026-06-17 | Локальная картинка `public/img/conference.jpg` | pushed `ff75c44`, deployed |
| 6 | 2026-06-18 | Gemini export: esbuild build, текстовые правки, images.ts | pushed `e564bd8` |
| 7 | 2026-06-18 | **FAIL:** сломан `nixpacks.toml` (`providers` map) | деплой `bh6bt6dx` failed |
| 8 | 2026-06-18 | **FIX:** восстановлен `nixpacks.toml`, `/img/conference.jpg` в images.ts | `ae8eea7` deployed OK |
| 9 | 2026-06-18 | Матовое стекло в шапке (desktop) + mega menu | `cd1e56f` deployed OK |
| 10 | 2026-06-19 | Hero C (default) + Hero D fullscreen по ТЗ | `4c3f5dd` deployed OK (blank page bug) |
| 11 | 2026-06-19 | **FIX:** HeroDesktopVariantC registry import | `2153e9b` deployed OK |
| 12 | 2026-06-19 | Restore immersive D + Hero C slider polish (overlay, badge, VRT CTA) | push → deploy |
