# Strapi MCP — настройка для Cursor (Wave 1)

Strapi 5.47+ включает **встроенный MCP-сервер**: агент в Cursor может читать схему, создавать/редактировать/публиковать контент без ручного кликанья в админке.

Два разных MCP — **не путать**:

| Имя | Адрес | Зачем |
|-----|-------|-------|
| **Strapi Content MCP** | `http://localhost:1337/mcp` | Работа с **вашими** Content Types и данными |
| **Strapi Docs MCP** | `https://strapi-docs.mcp.kapa.ai` | Документация Strapi 5 (populate, hooks, components) |

Оба нужны одновременно при разработке Wave 1.

---

## 1. Включить MCP в Strapi (уже в репозитории)

В `apps/cms/config/server.ts`:

```ts
mcp: {
  enabled: env.bool('STRAPI_MCP_ENABLED', true),
}
```

Переменная в `apps/cms/.env`:

```env
STRAPI_MCP_ENABLED=true
```

На production, если Strapi доступен из интернета и MCP снаружи не нужен:

```env
STRAPI_MCP_ENABLED=false
```

---

## 2. Запустить Strapi локально

### Вариант A — Postgres (целевой путь)

```bash
cd apps/cms
docker compose up -d
cp .env.example .env   # если ещё нет
cd ../..
npm run develop -w @med-site/cms
```

### Вариант B — SQLite (без Docker, только smoke)

```powershell
cd C:\git\med_site
$env:DATABASE_CLIENT='sqlite'
$env:DATABASE_FILENAME='.tmp/data.db'
npm run develop -w @med-site/cms
```

Админка: http://localhost:1337/admin

При первом запуске создайте учётную запись администратора.

---

## 3. Создать Admin Token в Strapi

1. Откройте http://localhost:1337/admin
2. **Settings** → **Global settings** → **API Tokens** (или **Administration panel** → **API Tokens**)
3. **Create new API Token**
4. Параметры для разработки с агентом:
   - **Name:** `cursor-mcp-dev`
   - **Token type:** **Full access** (или Custom с нужными правами на будущие Page/виджеты)
   - **Token duration:** Unlimited (или по вашей политике)
5. **Save** и **скопируйте токен** — он показывается один раз.

> Токен — это пароль. Не коммитьте в git. Храните в `.cursor/mcp.json` (локально) или в менеджере паролей.

---

## 4. Подключить MCP в Cursor

### Шаг 4.1 — открыть конфиг MCP

**Cursor → Settings → MCP → Edit Config**

Или вручную отредактируйте файл:

- **Глобально (все проекты):** `%USERPROFILE%\.cursor\mcp.json`
- **Только этот репозиторий:** `C:\git\med_site\.cursor\mcp.json`

Рекомендация: для Strapi использовать **проектный** `.cursor/mcp.json`, чтобы токен не светился во всех чатах.

### Шаг 4.2 — добавить два сервера

Скопируйте из шаблона `.cursor/mcp.json.example` и подставьте свой токен:

```json
{
  "mcpServers": {
    "strapi-mcp": {
      "type": "streamable-http",
      "url": "http://localhost:1337/mcp",
      "headers": {
        "Authorization": "Bearer ВАШ_ADMIN_TOKEN"
      }
    },
    "strapi-docs": {
      "url": "https://strapi-docs.mcp.kapa.ai"
    }
  }
}
```

Если у вас уже есть другие MCP в том же файле — **добавьте** блоки `strapi-mcp` и `strapi-docs` внутрь существующего `"mcpServers"`, не затирая остальное.

### Шаг 4.3 — перезагрузить MCP в Cursor

1. **Settings → MCP**
2. Нажмите **Refresh** / перезапустите Cursor
3. У `strapi-mcp` статус должен быть **Connected** (зелёный), пока Strapi запущен на `:1337`

---

## 5. Проверка вручную (без Cursor)

### 5.1 MCP endpoint жив

Пока Strapi запущен:

```powershell
# GET на /mcp должен вернуть 405 — это нормально (только POST)
Invoke-WebRequest -Uri "http://localhost:1337/mcp" -Method GET -UseBasicParsing
```

Ожидание: статус **405 Method Not Allowed**.

### 5.2 С токеном (опционально)

Полноценный MCP-диалог — JSON-RPC POST. Проще проверить через Cursor (шаг 6).

---

## 6. Проверка с агентом в Cursor

1. Убедитесь, что Strapi работает (`npm run develop -w @med-site/cms`)
2. MCP подключён (шаг 4)
3. В **новом чате** напишите агенту:

```
Проверь Strapi MCP: перечисли доступные content types и подтверди, что strapi-mcp подключён.
```

Агент должен увидеть инструменты MCP (list/get/create для collection types после их создания в Wave 1).

Пока Content Types пустые (Wave 0), достаточно подтверждения, что **сервер отвечает** и инструменты MCP доступны.

---

## 7. Ограничения MCP (важно для Wave 1)

По [официальной документации Strapi](https://docs.strapi.io/cms/features/strapi-mcp-server):

- **Dynamic Zones** передаются как нетипизированные массивы — структуру компонентов агент видит из **файлов схем** в git, не только из MCP
- **Загрузка медиа** через MCP недоступна — файлы сначала в Media Library
- Права токена = права агента (создайте отдельный dev-токен)

Кастомные MCP-tools для Page Builder — **не Wave 1**, отдельная волна.

---

## 8. Troubleshooting

| Симптом | Решение |
|---------|---------|
| MCP disconnected в Cursor | Strapi не запущен или порт не 1337 |
| 401 / unauthorized | Неверный или просроченный Admin Token |
| Strapi не стартует (Postgres) | `docker compose up -d` в `apps/cms` или временно SQLite (раздел 2B) |
| `STRAPI_MCP_ENABLED=false` | Включите в `apps/cms/.env` |
| После правки `server.ts` | Перезапустите Strapi |

---

## Связанные документы

- [DEV_MONOREPO.md](./DEV_MONOREPO.md) — запуск monorepo
- [strapi.md](./strapi.md) — заметки про agent workflow
- [plan/v2/strapi-nextjs-architecture.md](./plan/v2/strapi-nextjs-architecture.md) — BlockRenderer и Dynamic Zones
