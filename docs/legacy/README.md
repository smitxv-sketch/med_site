# Legacy · устаревшие артефакты

Папка для **суперседнутых** документов и конфигов. Не использовать как SSOT для новой разработки.

| Путь | Было | Актуальная замена |
|------|------|-------------------|
| [`04-ui-ux-design-system.md`](./04-ui-ux-design-system.md) | Дизайн-система v1 (HEX, emerald/orange матрица) | [`DESIGN_SYSTEM.md`](../../DESIGN_SYSTEM.md) + [`designTokens.ts`](../../src/shared/config/designTokens.ts) |
| [`audits/design_audit.md`](./audits/design_audit.md) | Снимок HEX-аудита (генерируется) | `npm run lint:design` + перегенерация скриптами |
| [`../server/config/legacy/theme.json`](../../server/config/legacy/theme.json) | Тема BFF/booking | `designTokens.ts` для сайта; booking читает legacy через `configService` |

## Отличие от `docs/archive/`

- **`docs/legacy/`** — заменённые SSOT и конфиги, на которые ещё могут ссылаться старые процессы.
- **`docs/archive/`** — исторические планы, черновики и снимки кодовой базы v1.

## Пакет для агентов

См. [`docs/SSOT_FOR_AGENTS.md`](../SSOT_FOR_AGENTS.md) — что отдавать внешнему агенту и что **не** отдавать.
