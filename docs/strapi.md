<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# слушай а как всё-таки разработка под strappy и dynamic zones так чтобы у агента был доступ какие-то mcp или что-то вот есть такое понимаешь Я хочу вообще всё делать руками агента при этом делать сложные вещи

Это очень своевременный вопрос — Strapi только месяц назад выпустил именно то, что тебе нужно.

## Strapi MCP Server — встроен с v5.47.0 (май 2026)

В Strapi 5.47 появился **нативный MCP сервер** — агент получает прямой доступ к твоим Content Types, может создавать/читать/редактировать/публиковать контент на естественном языке [^1][^2]. Это ровно то, что ты описывал: «агент знает структуру сайта и работает с данными».

Включается за 5 минут:

```ts
// config/server.ts
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: { keys: env.array('APP_KEYS') },
  mcp: { enabled: true },   // ← вот и всё
});
```

Эндпоинт появляется на `http://localhost:1337/mcp` [^1]. Дальше создаёшь Admin Token в Strapi Admin → Settings → API Tokens, и подключаешь к любому MCP-клиенту.

***

## Два разных MCP сервера Strapi — важно не путать

У Strapi их сейчас два, и они для разных задач [^3]:


| MCP сервер | Адрес | Для чего |
| :-- | :-- | :-- |
| **Strapi Content MCP** | `http://localhost:1337/mcp` | Работа с данными: CRUD контент, публикация, Dynamic Zones |
| **Strapi Docs MCP** | `https://strapi-docs.mcp.kapa.ai` | Документация Strapi в IDE: агент знает API, хуки, паттерны |

Для разработки тебе нужны **оба одновременно** — один знает твои данные, второй знает как правильно писать Strapi-код.

***

## Полный стек агентной разработки

Оптимальная схема для твоего сценария (сложные задачи руками агента):

### IDE: Cursor 3 + два MCP

```jsonc
// .cursor/mcp.json
{
  "mcpServers": {
    "strapi-content": {
      "type": "http",
      "url": "http://localhost:1337/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_ADMIN_TOKEN"
      }
    },
    "strapi-docs": {
      "type": "http",
      "url": "https://strapi-docs.mcp.kapa.ai"
    }
  }
}
```

Теперь агент в Cursor **одновременно**:

- знает, как пишется Strapi-код (Docs MCP) [^3]
- видит твои реальные Content Types, компоненты, Dynamic Zones (Content MCP) [^1]
- может создать новый виджет → зарегистрировать его как компонент в Strapi → написать React-компонент в Next.js → всё за один промпт [^4]


### CLI: Claude Code для сложных задач

Cursor — для интерактивной разработки. **Claude Code** — для задач, которые пересекают границы файлов: миграции схем, рефакторинг, добавление нового типа данных со всеми зависимостями [^5][^6]:

```bash
# Claude Code с подключённым MCP в .claude/mcp.json
claude "добавь новый виджет PromoStrip в Dynamic Zone страниц: 
компонент Strapi, TypeScript типы, React компонент, Storybook story, 
зарегистрируй в BlockRenderer"
```

Claude Code в 2026 поддерживает **Managed Agents** — задача выполняется с чекпоинтами, если что-то упало — возобновляется с нужного места [^7].

***

## Кастомные MCP-инструменты в Strapi — для Page Builder

Встроенный MCP даёт стандартный CRUD. Для твоего Page Builder нужны кастомные инструменты. Регистрируются через Strapi Plugin с Zod-схемами [^8]:

```ts
// src/plugins/page-builder/server/register.ts
import { Core } from '@strapi/strapi';
import { z } from 'zod';

export default ({ strapi }: { strapi: Core.Strapi }) => {
  // Кастомный MCP инструмент: собрать страницу из виджетов
  strapi.mcp.registerTool({
    name: 'build_page_from_prompt',
    description: 'Создаёт страницу из виджетов по описанию',
    inputSchema: z.object({
      title: z.string(),
      slug: z.string(),
      intent: z.string().describe('Описание страницы: цель, аудитория, тон'),
      widgets: z.array(z.string()).optional()
        .describe('Список желаемых типов виджетов'),
    }),
    handler: async ({ title, slug, intent, widgets }) => {
      // Логика: выбрать виджеты, заполнить данные, создать Page
      const page = await strapi.entityService.create('api::page.page', {
        data: { title, slug, content: buildDynamicZone(intent, widgets) }
      });
      return { pageId: page.id, url: `/${slug}` };
    }
  });

  // Кастомный инструмент: превью всех вариантов виджета
  strapi.mcp.registerTool({
    name: 'list_widget_variants',
    description: 'Возвращает все A/B/C/D варианты виджета с описанием',
    inputSchema: z.object({ widgetType: z.string() }),
    handler: async ({ widgetType }) => {
      return getWidgetVariants(widgetType); // из твоей widget registry
    }
  });
};
```

После этого агент может выполнить: *«создай страницу акции на детскую вакцинацию, используй hero-виджет вариант B и doctor-list с педиатрами»* — и сделает это автономно [^8][^9].

***

## Workflow разработки нового виджета — полный цикл

```
1. Промпт агенту (Cursor):
   "Разработай виджет TestimonialCarousel:
    - Component в Strapi: fields text, author, rating, photo
    - Dynamic Zone: добавь в widget.testimonial-carousel
    - React компонент с вариантами A (сетка) и B (слайдер)
    - TypeScript типы из Strapi schema
    - Storybook story с mock данными
    - BlockRenderer: добавь case"

2. Агент видит через Content MCP:
   - существующие компоненты Dynamic Zone
   - текущую структуру Page Content Type
   - уже зарегистрированные виджеты

3. Агент видит через Docs MCP:
   - как правильно создать Strapi Component
   - как зарегистрировать в Dynamic Zone
   - паттерны populate для нового типа

4. Результат за один проход:
   - schema-файл компонента в src/components/widget/
   - миграция (если нужна)
   - React-компонент с вариантами
   - types.ts сгенерированный из схемы
   - story-файл для Storybook
   - обновлённый BlockRenderer
```


***

## Что ещё стоит подключить к агенту

Помимо Strapi MCP, агентный стек для полного контроля над проектом:


| MCP / Tool | Зачем | Как |
| :-- | :-- | :-- |
| **Strapi Content MCP** | CRUD данных, Dynamic Zones | встроен в v5.47 |
| **Strapi Docs MCP** | Знание API Strapi в IDE | `strapi-docs.mcp.kapa.ai` |
| **GitHub MCP** | Создание PR, просмотр diff, управление ветками | `github.com/github/github-mcp-server` |
| **PostgreSQL MCP** | Прямые запросы к БД Strapi, анализ данных | `@modelcontextprotocol/server-postgres` |
| **Filesystem MCP** | Чтение/запись файлов проекта | встроен в Claude Code/Cursor |
| **Playwright MCP** | Тестирование UI агентом в браузере | `@playwright/mcp` |

С PostgreSQL MCP агент может сказать: *«покажи все виджеты Hero, у которых не заполнено поле subtitle»* — и сразу получит данные без Strapi Admin.
<span style="display:none">[^10][^11][^12][^13][^14][^15]</span>

<div align="center">⁂</div>

[^1]: https://strapi.io/blog/the-strapi-mcp-server-is-out-wire-agents-to-your-content

[^2]: https://www.smotly.com/en/blog/strapi-mcp-natif-5-47/

[^3]: https://docs.strapi.io/cms/ai/docs-mcp-server

[^4]: https://www.linkedin.com/pulse/strapi-logbook-v547-mcp-server-here-126-strapi-mcmve

[^5]: https://agentincome.io/blog/agentic-coding-2026/

[^6]: https://www.aimagicx.com/blog/cursor-vs-claude-code-developer-stack-april-2026

[^7]: https://news.creeta.com/en/ai-coding-agents-2026-platforms-benchmarks/

[^8]: https://www.youtube.com/watch?v=8QYsvjqbIy0

[^9]: https://virtuslab.com/expertise/introducing-strapi-mcp/

[^10]: https://dj420-gif.github.io/PromptPulse/Blog/cursor-3-review-2026.html

[^11]: https://agenthotspot.com/connectors/oss/strapi

[^12]: https://mcpmarket.com/server/strapi

[^13]: https://www.marsdevs.com/compare/cursor-vs-windsurf-vs-replit-claude-code

[^14]: https://skywork.ai/skypage/en/unlocking-strapi-ai-deep-dive/1981574426156699648

[^15]: https://docs.strapi.io/tags/mcp

