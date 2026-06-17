# Синхронизация песочницы Gemini Studio ↔ GitHub ↔ Coolify

> **Для кого:** агент в Google AI Studio (песочница) и разработчик перед экспортом.  
> **Цель:** песочница содержит все правки до экспорта → меньше работы при деплое в Coolify.  
> **Прод:** https://istochnik.smitx.ru | Coolify app `istochnik` | GitHub `smitxv-sketch/med_site`

---

## ЧАСТЬ 1. Полный список изменений (что уже сделано)

### A. Уже в GitHub (`main`) — 3 коммита деплоя

| Коммит | Файлы | Суть |
|--------|-------|------|
| `42e4c1d` | `.npmrc`, `server/index.ts` | `legacy-peer-deps=true`; `PORT` из `process.env` |
| `01b82db` | `nixpacks.toml`, `docs/DEPLOY_JOURNAL.md` | Конфиг сборки Coolify/Nixpacks |
| `c693329` | `package.json`, `server/index.ts`, `nixpacks.toml` | Старт `node dist/index.js`; статика из `dist/` |

#### Детали по файлам (уже закоммичено)

**1. `.npmrc` (новый)**
```
legacy-peer-deps=true
```
Причина: конфликт `date-fns@4` и `react-day-picker@8` ломает `npm install` на Coolify.

**2. `server/index.ts`**
```ts
// Было:
const PORT = 3000;

// Стало:
const PORT = Number(process.env.PORT) || 3000;
```

```ts
// Статика в production (было path.join(__dirname, '..') или dist/server — неверно):
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  const clientDist = path.join(__dirname, '.');
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}
```
Причина: `tsc` компилирует сервер в `dist/index.js`, а не `dist/server/index.js`.

**3. `package.json`**
```json
"start": "node dist/index.js"
```
Было: `node dist/server/index.js` → контейнер падал в crash loop.

**4. `nixpacks.toml` (новый)**
```toml
[phases.setup]
nixPkgs = ["nodejs_20"]

[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "node dist/index.js"

[variables]
NODE_ENV = "production"
```

**5. `.gitignore`** (если ещё нет в песочнице)
```
node_modules/
dist/
.env
.env.local
.env.*.local
```

---

### B. Ещё НЕ закоммичено (локально, нужно перенести в песочницу)

**Замена битой картинки конференции**

Проблема: `/IMG_5850.JPG` лежал в **корне репо**, не в `public/`. Vite не копирует его в `dist` → на проде отдавался `index.html` вместо фото.

Новый URL (рабочий, `200 image/jpeg`):
```
https://thumb.cloud.mail.ru/weblink/thumb/xw1/4R8k/YCiDxfxbt?mt=1779340982000
```

Заменить `image: '/IMG_5850.JPG'` → этот URL в **4 файлах**:

| Файл | Назначение |
|------|------------|
| `src/shared/api/contentApi.ts` | Hero-слайд на главной |
| `src/pages/events/ui/EventsPage.tsx` | Карточка в списке мероприятий |
| `src/pages/news/ui/NewsPage.tsx` | Новость о конференции |
| `src/pages/events/ui/eventData.ts` | Страница `/events/conference-7` |

---

### C. Настройки Coolify (НЕ в коде — только на сервере)

Эти правки делает Cursor/админ при деплое. Gemini в песочнице **не трогает**.

| Параметр | Значение |
|----------|----------|
| FQDN / Domains | `https://istochnik.smitx.ru` (обязательно с `https://`) |
| Install | `npm install --legacy-peer-deps` |
| Build | `npm run build` |
| Start | `npm start` |
| Publish Directory | пусто |
| Env | `NODE_ENV=production`, `PORT=3000` |
| DNS (Beget) | A `istochnik.smitx.ru` → `37.79.254.120` |

**Почему важен `https://` в FQDN:** без него Traefik ломает Host-правило → SSL self-signed → Kaspersky ругается.

---

### D. Диагностика (что выяснили, менять не обязательно)

| Вопрос | Ответ |
|--------|-------|
| Сайт узкий по бокам — баг? | **Нет.** `Container` = `max-w-7xl` (~1280px), так задумано |
| Kaspersky ругается | SSL Let's Encrypt на сервере OK; часто ложное срабатывание AV или кэш старого сертификата |
| Сайт открывается | HTTP 200, контейнер `running` |

---

## ЧАСТЬ 2. ТЗ для Gemini Studio (сделать ДО экспорта)

### Цель
Привести песочницу к состоянию «готово к деплою»: `npm run build` + `npm start` работают локально, нет битых картинок, нет дублирования URL.

### Ограничения (КРИТИЧНО)
- **ЗАПРЕЩЕНО** менять `/src/widget/` и PHP-бэкенд записи (read-only для данных записи).
- **ЗАПРЕЩЕНО** хардкодить тексты/URL картинок в 4+ местах — выносить в конфиг (SSOT).
- Файлы не больше ~400 строк; при росте — декомпозиция.

---

### Задача 1. Применить все деплой-фиксы (если ещё нет)

Проверить и добавить/исправить:
- [ ] `.npmrc` → `legacy-peer-deps=true`
- [ ] `nixpacks.toml` → как в Части 1A
- [ ] `server/index.ts` → dynamic PORT + static из `path.join(__dirname, '.')`
- [ ] `package.json` → `"start": "node dist/index.js"`
- [ ] `.gitignore` → `node_modules/`, `dist/`, `.env*`

---

### Задача 2. Картинка конференции (SSOT)

**Сейчас (плохо):** один URL продублирован в 4 файлах.

**Сделать (хорошо):**

1. Создать конфиг, например `server/config/media.json` или `src/shared/config/media.ts`:
```json
{
  "conferenceHero": "https://thumb.cloud.mail.ru/weblink/thumb/xw1/4R8k/YCiDxfxbt?mt=1779340982000"
}
```

2. Импортировать оттуда в:
   - `contentApi.ts` (hero slides)
   - `EventsPage.tsx`
   - `NewsPage.tsx`
   - `eventData.ts`

3. Удалить из репо корневой `IMG_5850.JPG` (если есть) — он не попадает в билд.

4. **Правило на будущее:** локальные картинки только в `public/` (путь `/имя.jpg`). Внешние — только `https://`.

---

### Задача 3. Аудит битых локальных путей

Выполнить поиск по проекту:
```
image: '/...'
src="/..."
href="/....jpg"
```
Убедиться, что каждый путь либо в `public/`, либо внешний HTTPS URL.

---

### Задача 4. Локальная проверка перед экспортом

```bash
npm install --legacy-peer-deps
npm run build
NODE_ENV=production PORT=3000 node dist/index.js
```

Проверить в браузере:
- [ ] Главная: hero «Конференция» — фото видно (не иконка битой картинки)
- [ ] `/events` — карточка конференции с фото
- [ ] `/events/conference-7` — баннер мероприятия
- [ ] `/booking` — виджет записи **не сломан** (только smoke-test)

---

### Задача 5. Что НЕ делать в песочнице

| Не трогать | Почему |
|------------|--------|
| Coolify / Traefik / DNS | Инфраструктура, не код |
| SSH / PostgreSQL Coolify | Настраивает Cursor при деплое |
| Ширину `Container` (`max-w-7xl`) | Дизайн-решение, менять только по запросу заказчика |

---

### Задача 6. После экспорта (делает Cursor / GitHub)

1. Push в `main` на `github.com/smitxv-sketch/med_site`
2. Redeploy в Coolify (app `istochnik`)
3. Проверка: `curl -I https://istochnik.smitx.ru` → 200
4. Обновить `docs/DEPLOY_JOURNAL.md` новой строкой в логе

---

## ЧАСТЬ 3. Промпт для вставки в Gemini Studio

Скопируй целиком:

```
Ты работаешь с проектом med_site (клиника «Источник»). Перед экспортом в GitHub выполни ТЗ из файла docs/GEMINI_SANDBOX_SYNC.md.

Кратко:
1. Убедись что есть .npmrc, nixpacks.toml, правки server/index.ts и package.json для production (см. Часть 1A).
2. Картинку конференции вынеси в один конфиг (SSOT), URL: https://thumb.cloud.mail.ru/weblink/thumb/xw1/4R8k/YCiDxfxbt?mt=1779340982000
3. Удали дубли URL из 4 файлов, подключи конфиг.
4. Не трогай /src/widget/ и php_backend.
5. Прогони npm install --legacy-peer-deps && npm run build && NODE_ENV=production node dist/index.js
6. Проверь hero на главной — фото конференции не битое.

Не меняй ширину Container (max-w-7xl). Не настраивай Coolify — это сделает другой агент после push.
```

---

## ЧАСТЬ 4. Чеклист синхронизации (для тебя)

| # | Действие | Статус |
|---|----------|--------|
| 1 | Деплой-фиксы в GitHub (`42e4c1d`…`c693329`) | ✅ в main |
| 2 | Замена картинки конференции (4 файла) | ⏳ не закоммичено |
| 3 | SSOT для URL картинки (опционально, Gemini) | ⏳ ТЗ |
| 4 | Экспорт из Gemini → GitHub | ⏳ |
| 5 | Redeploy Coolify | ⏳ после push |
| 6 | Проверка https://istochnik.smitx.ru | ✅ работает (до push картинки) |

---

*Обновлено: 2026-06-17*
