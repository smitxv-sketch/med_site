# Архитектура Visual Page Builder: Strapi + Next.js

> Комплексный технический документ по проектированию мультиплатформенной CMS-системы с визуальным редактором, AI-конструктором страниц и современным CI/CD-пайплайном.

---

## 1. Контекст и цели

Цель — построить headless CMS платформу с визуальным редактором страниц (аналог Tilda), где:

- **Контент-менеджер** собирает страницы из виджетов через drag-and-drop UI
- **Виджеты** имеют матрицу дизайн-вариантов (A/B/C/D × mobile/desktop)
- **AI-агент** генерирует страницы автоматически по промпту
- **Публичный сайт** работает как статика с мгновенными обновлениями через ISR
- **Developer experience** обеспечивает мгновенную обратную связь без ожидания деплоя

Готовые решения — Builder.io, Storyblok, Elementor — не подходят из-за vendor lock-in, высокой цены, или (в случае Elementor/WPBakery) критических проблем с производительностью[cite:36][cite:37]. Собственная реализация поверх Strapi + Next.js даёт полный контроль, нулевой runtime-overhead и уникальный AI-слой.

---

## 2. Фундаментальная архитектура

### 2.1 Разделение ответственности

```
┌─────────────────────────────────────────────────────────────┐
│                        Слои системы                          │
├──────────────────────┬──────────────────────────────────────┤
│  PUBLIC SITE         │  Next.js 16 (App Router)             │
│  (статика + ISR)     │  Нулевой CMS overhead в продакшне    │
├──────────────────────┼──────────────────────────────────────┤
│  PAGE BUILDER UI     │  Strapi Plugin (React в Admin Panel) │
│  (визуальный ред.)   │  Живёт только в /admin               │
├──────────────────────┼──────────────────────────────────────┤
│  CONTENT API         │  Strapi 5 (self-hosted, Coolify)     │
│  (данные, медиа)     │  Dynamic Zones + Collection Types    │
├──────────────────────┼──────────────────────────────────────┤
│  AI LAYER            │  Node.js сервис / Strapi хук         │
│  (генерация страниц) │  → JSON структура Dynamic Zone       │
└──────────────────────┴──────────────────────────────────────┘
```

### 2.2 Типы контента в Strapi

| Тип | Strapi тип | Next.js роутинг | Пример |
|-----|-----------|-----------------|--------|
| Одиночные страницы | Single Type | `app/about/page.tsx` | Главная, Контакты |
| Шаблонные сущности | Collection Type | `app/doctors/[slug]/page.tsx` | Врачи, Услуги |
| Маркетинговые страницы | Collection Type + Dynamic Zone | `app/[slug]/page.tsx` | Акции, Лендинги |
| Глобальный контент | Single Type | Layout-компонент | Меню, Футер |

Для тысяч карточек (врачи, услуги) создаётся один файл-роут, Next.js генерирует все страницы через `generateStaticParams()`[cite:5]. Dynamic Zone используется только для редактируемых маркетинговых страниц[cite:1][cite:7].

---

## 3. Strapi: Content Modelling

### 3.1 Page Collection Type + Dynamic Zone

```typescript
// Структура типа "Page" в Strapi
{
  title: "string",
  slug: "uid",      // уникальный идентификатор
  seo: "component", // title, description, og:image
  content: "dynamiczone" // → массив виджетов
}
```

Dynamic Zone содержит компоненты-виджеты:

```
content (Dynamic Zone)
  ├── widget.hero           { variant, heading, subheading, cta, bgImage }
  ├── widget.doctors-list   { variant, title, count, filters, layout }
  ├── widget.reviews        { variant, title, count, showRating }
  ├── widget.services-grid  { variant, title, columns, showPrices }
  ├── widget.promo-banner   { variant, text, cta, bgColor, expiryDate }
  └── widget.faq            { variant, title, items }
```

Каждый компонент содержит поле `variant` (enum: A | B | C | D) и `mobileVariant` для матрицы дизайнов.

### 3.2 Populate в Strapi 5

В Strapi 5 нет shared population strategy — Dynamic Zones требуют явного `on`-фрагмента[cite:4]:

```typescript
// lib/strapi.ts
export async function getPage(slug: string) {
  return fetchAPI('/pages', {
    filters: { slug: { $eq: slug } },
    populate: {
      content: {
        on: {
          'widget.doctors-list': {
            populate: { doctors: { populate: { photo: true } } }
          },
          'widget.reviews': {
            populate: { items: { populate: { avatar: true } } }
          },
          'widget.hero': {
            populate: { bgImage: true, cta: true }
          }
        }
      },
      seo: { populate: { ogImage: true } }
    }
  });
}
```

---

## 4. Next.js: Block Renderer Pattern

### 4.1 Универсальный рендерер виджетов

```tsx
// components/BlockRenderer.tsx
import { DoctorsList } from './widgets/DoctorsList';
import { Reviews } from './widgets/Reviews';
import { Hero } from './widgets/Hero';

const WIDGET_MAP: Record<string, React.ComponentType<any>> = {
  'widget.hero':          Hero,
  'widget.doctors-list':  DoctorsList,
  'widget.reviews':       Reviews,
  'widget.services-grid': ServicesGrid,
  'widget.faq':           FAQ,
};

export function BlockRenderer({ blocks }: { blocks: DynamicBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = WIDGET_MAP[block.__component];
        if (!Component) {
          console.warn(`Unknown widget: ${block.__component}`);
          return null;
        }
        return <Component key={block.id ?? index} {...block} />;
      })}
    </>
  );
}
```

### 4.2 Страница с Dynamic Zone

```tsx
// app/[slug]/page.tsx
import { BlockRenderer } from '@/components/BlockRenderer';
import { getPage } from '@/lib/strapi';

export async function generateStaticParams() {
  const pages = await getPages(); // все записи из Collection
  return pages.map(p => ({ slug: p.slug }));
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  return <BlockRenderer blocks={page.content} />;
}
```

### 4.3 Матрица вариантов виджета

```tsx
// components/widgets/DoctorsList/index.tsx
import { DoctorsListA } from './variants/DoctorsListA';
import { DoctorsListB } from './variants/DoctorsListB';

const VARIANT_MAP = { A: DoctorsListA, B: DoctorsListB, C: DoctorsListC, D: DoctorsListD };

export function DoctorsList({ variant = 'A', mobileVariant, ...props }) {
  const DesktopComponent = VARIANT_MAP[variant];
  const MobileComponent  = VARIANT_MAP[mobileVariant ?? variant];
  return (
    <>
      <div className="hidden md:block"><DesktopComponent {...props} /></div>
      <div className="block md:hidden"><MobileComponent {...props} /></div>
    </>
  );
}
```

---

## 5. Визуальный редактор как Strapi Plugin

### 5.1 Архитектура плагина

Вместо внешнего Builder.io визуальный редактор встраивается как **Strapi плагин**[cite:46][cite:52]. Это даёт:

- Редактор живёт в `/admin` — нулевой impact на публичный сайт
- Аутентификация Strapi из коробки
- Полный доступ к Content API без дополнительных сервисов

```
strapi-plugin-page-builder/
  ├── admin/
  │   └── src/
  │       ├── index.tsx          # регистрация плагина
  │       ├── pages/
  │       │   └── PageBuilder/   # основной UI
  │       └── components/
  │           ├── WidgetPalette/ # каталог виджетов
  │           ├── Canvas/        # превью страницы
  │           └── Inspector/     # настройки виджета
  └── server/
      └── routes/                # API для сохранения страниц
```

### 5.2 Регистрация плагина в Strapi Admin[cite:46][cite:55]

```tsx
// admin/src/index.tsx
import { PageBuilderPage } from './pages/PageBuilder';

export default {
  register(app: any) {
    app.addMenuLink({
      to: '/plugins/page-builder',
      icon: LayoutIcon,
      intlLabel: { id: 'page-builder.plugin.name', defaultMessage: 'Page Builder' },
      Component: PageBuilderPage,
    });
  },
};
```

### 5.3 Альтернатива: отдельное Admin SPA

Если плагин слишком ограничен — отдельный React-апп (Vite + React) деплоится рядом со Strapi, использует Strapi Content API. Это даёт полную свободу UI без ограничений Strapi Admin[cite:49].

---

## 6. ISR + Webhook: мгновенные обновления без ребилда

Принципиальный момент: контент-менеджер нажимает «Опубликовать» → страница обновляется **за секунды**, без полного деплоя[cite:16][cite:22].

### 6.1 Webhook в Strapi

В Strapi Admin → Settings → Webhooks:
```
URL: https://your-site.com/api/revalidate
Events: entry.publish, entry.update, entry.delete
Headers: { "x-revalidate-token": "SECRET_TOKEN" }
```

### 6.2 API Route в Next.js

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const MODEL_TAG_MAP: Record<string, string[]> = {
  'page':    ['pages'],
  'doctor':  ['doctors', 'pages'], // врачи могут быть на нескольких страницах
  'review':  ['reviews'],
  'service': ['services'],
};

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token');
  if (token !== process.env.REVALIDATE_TOKEN)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const tags = MODEL_TAG_MAP[body.model] ?? ['pages'];
  
  tags.forEach(tag => revalidateTag(tag));
  
  return NextResponse.json({ revalidated: true, tags });
}
```

### 6.3 Тегирование fetch-запросов

```typescript
// lib/strapi.ts
export async function getDoctors() {
  return fetch(`${STRAPI_URL}/api/doctors?populate=*`, {
    next: { tags: ['doctors'] }  // ← тег для точечного инвалидирования
  }).then(r => r.json());
}
```

Итог: Strapi Webhook → Next.js API → `revalidateTag('doctors')` → только затронутые страницы пересобираются. Полный ребилд нужен только при деплое нового кода[cite:25].

---

## 7. Dev Workflow: мгновенная обратная связь без ожидания деплоя

### 7.1 Проблема

Цикл «написал код → задеплоил → подождал → увидел результат» — 5-10 минут. Неприемлемо для агентской разработки.

### 7.2 Решение: трёхрежимная система данных

```typescript
// lib/strapi.ts — единая точка входа данных
const DATA_MODE = process.env.DATA_MODE ?? 'live'; // 'mock' | 'live' | 'hybrid'

export async function getDoctors() {
  if (DATA_MODE === 'mock') {
    return import('@/mocks/doctors.json').then(m => m.default);
  }
  return fetch(`${STRAPI_URL}/api/doctors?populate=*`, {
    next: { tags: ['doctors'] }
  }).then(r => r.json());
}
```

В `.env.local`:
```bash
DATA_MODE=mock           # локальная разработка без Strapi
# DATA_MODE=hybrid       # моки для новых фич, live для остального
# DATA_MODE=live         # продакшн
```

### 7.3 Turbopack — скорость разработки

Next.js 16 с Turbopack даёт[cite:51][cite:60]:
- **400-900% быстрее** компиляция при изменениях
- **До 10× быстрее** Fast Refresh (включая Server Components в 16.2)[cite:54]
- **2-5× быстрее** production builds

```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbo",
    "dev:mock": "DATA_MODE=mock next dev --turbo",
    "build": "next build",
    "storybook": "storybook dev -p 6006"
  }
}
```

### 7.4 MSW (Mock Service Worker) для клиентских запросов

Для компонентов с клиентскими запросами к Strapi API используется MSW[cite:53][cite:56]:

```typescript
// mocks/handlers/doctors.ts
import { http, HttpResponse } from 'msw';
import doctorsData from '../fixtures/doctors.json';

export const doctorHandlers = [
  http.get('*/api/doctors', () => HttpResponse.json(doctorsData)),
  http.get('*/api/doctors/:id', ({ params }) => {
    const doctor = doctorsData.data.find(d => d.id === params.id);
    return doctor
      ? HttpResponse.json({ data: doctor })
      : HttpResponse.json({ error: 'Not found' }, { status: 404 });
  }),
];
```

### 7.5 Storybook для разработки виджетов

Каждый виджет разрабатывается в Storybook изолированно[cite:29]:

```typescript
// components/widgets/DoctorsList/DoctorsList.stories.tsx
export default {
  title: 'Widgets/DoctorsList',
  component: DoctorsList,
};

export const VariantA = { args: { variant: 'A', doctors: mockDoctors, count: 6 } };
export const VariantB = { args: { variant: 'B', doctors: mockDoctors, count: 3 } };
export const MobileView = {
  args: { variant: 'A', mobileVariant: 'B', doctors: mockDoctors },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
```

Storybook + Strapi официально рекомендованы как связка для построения дизайн-систем[cite:29].

### 7.6 Итоговый dev workflow

```
1. npm run dev:mock        → Next.js запускается с моковыми данными
2. Storybook открыт        → виджеты разрабатываются изолированно
3. Изменения видны         → через Turbopack Fast Refresh (<200ms)
4. Виджет готов            → git push → Coolify autodeploy
5. Strapi видит новый тип  → добавить компонент в Dynamic Zone
6. Контент-менеджер        → использует новый виджет в редакторе
```

---

## 8. CI/CD пайплайн

### 8.1 Разделение на репозитории

```
Рекомендованная структура:
├── repo: site-frontend     (Next.js)   → деплоится на Coolify
└── repo: site-cms          (Strapi)    → деплоится на Coolify
```

Разделение позволяет деплоить фронт без перезапуска Strapi и наоборот.

### 8.2 Coolify Auto Deploy[cite:18]

Coolify поддерживает автодеплой по git push через GitHub Webhooks:

```
GitHub Push → GitHub Webhook → Coolify → Docker build → Rolling deploy
```

Coolify также официально описывает деплой Strapi через Docker Compose[cite:27]:

```yaml
# docker-compose.yml для Strapi на Coolify
services:
  strapi:
    image: node:20-alpine
    build: .
    environment:
      DATABASE_URL: ${DATABASE_URL}
      APP_KEYS: ${APP_KEYS}
    volumes:
      - strapi-uploads:/app/public/uploads

  nextjs:
    build: ../frontend
    environment:
      STRAPI_URL: http://strapi:1337
      REVALIDATE_TOKEN: ${REVALIDATE_TOKEN}
```

### 8.3 Стратегия веток

```
main          → продакшн (автодеплой в Coolify)
develop       → стейджинг (автодеплой в отдельный Coolify env)
feature/*     → только локальная разработка / PR preview
```

### 8.4 Полный поток изменений

```
Тип изменения          │ Действие                    │ Время
───────────────────────┼─────────────────────────────┼───────────
Контент (текст/фото)   │ Strapi Publish → ISR webhook │ ~2-5 сек
Настройка виджета      │ Strapi Publish → ISR webhook │ ~2-5 сек
Новый вариант виджета  │ git push → Coolify build     │ ~3-5 мин
Новый виджет           │ git push → Coolify build     │ ~3-5 мин
Структурные изменения  │ git push + Strapi migration  │ ~5-10 мин
```

---

## 9. AI-конструктор страниц

AI-агент работает поверх той же Dynamic Zone архитектуры:

```typescript
// Агент генерирует JSON-структуру Dynamic Zone
const pageStructure = await aiAgent.generatePage({
  prompt: "Страница акции на скидку 20% для новых пациентов",
  context: {
    doctors: await getDoctors(),
    services: await getServices(),
    brandColors: siteConfig.colors,
  }
});

// pageStructure = [
//   { __component: 'widget.hero', variant: 'B', heading: 'Скидка 20% новым пациентам', ... },
//   { __component: 'widget.services-grid', variant: 'A', title: 'Наши услуги', count: 6, ... },
//   { __component: 'widget.reviews', variant: 'C', count: 3, ... }
// ]

// Публикуем через Strapi Content API
await strapi.create('pages', {
  title: pageStructure.title,
  slug: generateSlug(pageStructure.title),
  content: pageStructure.blocks,
  publishedAt: new Date().toISOString(),
});

// Strapi автоматически стреляет webhook → ISR → страница живёт через 2-5 сек
```

---

## 10. Что уходит из трендов (anti-patterns 2026)

### Устаревшие подходы

| Подход | Статус | Чем заменить |
|--------|--------|-------------|
| `getServerSideProps` (Pages Router) | Устарел | App Router + Server Components[cite:51] |
| `populate: '*'` в Strapi 5 | Удалён[cite:4] | Явные `on`-фрагменты |
| Full rebuild при изменении контента | Устарел | ISR + `revalidateTag`[cite:25] |
| Webpack в Next.js dev | Уступает Turbopack | `next dev --turbo`[cite:48] |
| `revalidate: 60` (time-based ISR) | Неточен | On-demand ISR через webhook[cite:22] |
| Elementor / WPBakery | Критически медленные | Headless CMS + custom builder[cite:37] |
| Builder.io / Storyblok для solo | Vendor lock-in, дорого[cite:36] | Собственный плагин Strapi |
| Отдельные HTML-шаблоны per page | Не масштабируется | Block Renderer + Dynamic Zone[cite:1] |
| Моковые данные в компонентах | Хаос | Централизованные fixtures + MSW[cite:53] |
| Ручной деплой через SSH | Медленно, нет rollback | Coolify автодеплой[cite:18] |

### Что актуально в 2026

- **React Server Components** — рендер данных на сервере, нулевой JS для статики[cite:51]
- **On-demand ISR** через `revalidateTag` — точечное обновление[cite:25][cite:22]
- **Turbopack** — дефолтный бандлер Next.js 16, 400-900% быстрее[cite:60]
- **Strapi 5 + explicit populate** — безопасная, предсказуемая загрузка данных[cite:4]
- **Storybook + MSW** — изолированная разработка компонентов с реалистичными данными[cite:29]
- **Coolify** — self-hosted деплой с Git webhook, Docker Compose, авторолбэк[cite:18][cite:27]
- **Container Queries** вместо media queries — адаптивность на уровне компонента
- **AI-driven content generation** — агент пишет JSON → CMS API → ISR (твой подход)

---

## 11. Рекомендуемый стек

```
Слой                │ Технология
────────────────────┼──────────────────────────────────────
Фронтенд            │ Next.js 16 + App Router + Turbopack
Язык                │ TypeScript 5
Стили               │ Tailwind CSS v4 + CSS Variables
CMS                 │ Strapi 5 (self-hosted)
База данных         │ PostgreSQL (Strapi)
Деплой              │ Coolify + Docker Compose
CI/CD               │ GitHub → Coolify Webhook
ISR обновления      │ Strapi Webhook → Next.js revalidateTag
Dev моки            │ MSW v2 + JSON fixtures
Изолированная разр. │ Storybook 8
Дизайн-система      │ Design Tokens + компоненты в Storybook
Медиа               │ Strapi Media Library (S3-совместимо)
```

---

## 12. Путь к реализации (инкрементальный)

**Фаза 1 — Базовая интеграция**
1. Перенести JSON-файлы в Strapi Collection Types (врачи, услуги, отзывы)
2. Подключить Next.js к Strapi API, удалить хардкод
3. Настроить ISR + Webhook для автообновления

**Фаза 2 — Page Builder**
4. Создать Dynamic Zone для маркетинговых страниц
5. Реализовать Block Renderer
6. Настроить матрицу вариантов виджетов

**Фаза 3 — Visual Editor**
7. Разработать Strapi Plugin с Canvas + WidgetPalette + Inspector
8. Добавить live preview (iframe публичного сайта рядом с редактором)

**Фаза 4 — AI Layer**
9. Интегрировать AI-агента для генерации структуры Dynamic Zone
10. Подключить к Strapi Content API + ISR pipeline

На каждой фазе сайт остаётся рабочим — инкрементальная миграция без Big Bang.
