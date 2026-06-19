# Аудит дизайн-токенов · med_site

**Дата:** 2026-06-19
**Статус:** Шаг 1 — только факты, без рекомендаций
**Следующий шаг:** вы заполняете `design_delta.md` (REPLACE / KEEP / DEFER)

---

## 1. Сводка

| Зона | HEX-вхождений | Arbitrary color `[#…]` | Arbitrary размеры `[Npx]` | Файлов затронуто |
|------|---------------|------------------------|---------------------------|------------------|
| `widgets` | 0 | 179 | 332 | 67 |
| `pages` | 0 | 95 | 138 | 37 |
| `shared` | 51 | 6 | 15 | 17 |
| `components` | 0 | 2 | 7 | 4 |
| `app` | 9 | 0 | 4 | 3 |
| `admin` | 0 | 1 | 7 | 2 |
| `widget-booking` | 6 | 153 | 46 | 17 |
| `root` | 20 | 6 | 2 | 2 |
| `other` | 0 | 2 | 9 | 2 |

**Уникальных HEX-значений в коде:** 49

### Классификация по приоритету ревизии

| Tier | Описание | HEX | Arbitrary colors |
|------|----------|-----|------------------|
| **foundation** | | 29 | 6 |
| **production-widgets** | | 0 | 77 |
| **production-pages** | | 0 | 24 |
| **shared-ui** | | 51 | 10 |
| **other-pages** | | 0 | 11 |
| **other-widgets** | | 0 | 0 |
| **prototype** | | 0 | 60 |
| **dev-tools** | | 0 | 103 |
| **booking-widget** | | 6 | 153 |

> **booking-widget** (`src/widget/`) — зафиксирован отдельно. По правилам проекта: read-only, не трогать при ревизии сайта.

---

## 2. SSOT — официальные токены (эталон для Дельты)

### `src/index.css` — CSS-переменные

| Переменная | Значение | Назначение |
|------------|----------|------------|
| `--brand-h/s/l` | `155 / 80% / 40%` | Динамический бренд (зелёный) |
| `--brand-fg` | `#ffffff` | Цвет текста на бренде |
| `--accent-h/s/l` | `188 / 70% / 45%` | Акцент (ВРТ / violet) |
| `--app-radius` | `24px` | Скругление карточек |
| `--app-shadow` | `0 10px 40px rgba(0,0,0,0.05)` | Тень карточек |
| `--spacing-section` | `1.5rem` (24px) | Межсекционный отступ |
| `--color-brand-orange` | `#ea580c` | Оранжевый (детская) |
| `--color-brand-blue` | `#2563eb` | Синий (косметология) |
| `--color-brand-turquoise` | `#0d9488` | Бирюза (программы) |

### `tailwind.config.js` — Tailwind-алиасы

| Класс | Реальное значение |
|-------|-------------------|
| `brand` / `brand-green` | `hsl(var(--brand-h) var(--brand-s) var(--brand-l))` |
| `brand-violet` | `hsl(var(--accent-h) var(--accent-s) var(--accent-l))` |
| `brand-orange` | `#f97316` (хардкод в config) |
| `brand-blue` | `#3b82f6` (хардкод в config) |
| `brand-turquoise` | `#14b8a6` (хардкод в config) |
| `green-50…950` | Производные от `--brand-h` |
| `rounded-app` | `var(--app-radius)` |
| `spacing-section` | `var(--spacing-section)` |

### `DESIGN_SYSTEM.md` — заявленные направления

| Направление | Заявленный токен |
|-------------|------------------|
| ВРТ | `violet` / `brand-violet` |
| Поликлиника | `brand-green` |
| Детская | `brand-orange` |
| Косметология | `brand-blue` |
| Скорая | `red` |
| Программы | `brand-turquoise` |

---

## 3. Локальные конфиги с HEX (вне SSOT)

### `src/widgets/hero-widget/config/heroTheme.ts`

| Ключ | HEX / значение | UI-контекст |
|------|----------------|-------------|
| `brandGreen` | `#2b8a3e` | Зелёный бренд hero |
| `brandViolet` | `#7c3aed` | Фиолетовый ВРТ |
| `brandCosmo` | `#b45a8c` | Косметология hero |
| `vrtCardBg` | `#f0ebfa` | Фон ВРТ-карточки |
| `vrtCardBorder` | `#c9b8f0` | Бордер ВРТ-карточки |
| `cardBorder` | `#e0e0e0` | Бордер карточек |
| `discountBadge.bg/color/border` | `#e8f5e9` / `#1b5e20` / `#a5d6a7` | Бейдж скидки |
| `promoProgress.urgent/warning/neutral` | `#ef4444` / `#f97316` / `#7c3aed` | Прогресс-бар срочности |
| `borderRadius` | `16` (px) | Скругление карточек hero |
| `gridGap` | `16` (px) | Gap сетки |
| `gapToPromotionsDesktop` | `24` (px) | Отступ hero → Акции |
| `sliderMinHeightDesktop/Mobile` | `380` / `260` (px) | Мин. высота слайдера |

---

## 4. HEX-инвентарь: Production Widgets

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|


### hero-widget (включая config)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|


---

## 5. HEX-инвентарь: Production Pages

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|


---

## 6. HEX-инвентарь: Foundation (app + index.css)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|
| 1 | `src/app/styles/accessibility.css:32` | `#ffffff` | background-color: #ffffff !important; |
| 2 | `src/app/styles/accessibility.css:33` | `#000000` | color: #000000 !important; |
| 3 | `src/app/styles/accessibility.css:34` | `#000000` | border-color: #000000 !important; |
| 4 | `src/app/styles/accessibility.css:40` | `#000000` | background-color: #000000 !important; |
| 5 | `src/app/styles/accessibility.css:41` | `#ffffff` | color: #ffffff !important; |
| 6 | `src/app/styles/accessibility.css:42` | `#ffffff` | border-color: #ffffff !important; |
| 7 | `src/app/styles/accessibility.css:48` | `#9dd1ff` | background-color: #9dd1ff !important; |
| 8 | `src/app/styles/accessibility.css:49` | `#063462` | color: #063462 !important; |
| 9 | `src/app/styles/accessibility.css:50` | `#063462` | border-color: #063462 !important; |
| 10 | `src/index.css:16` | `#ffffff` | --brand-fg: #ffffff; |
| 11 | `src/index.css:129` | `#FFFFFF` | --color-brand-fg: var(--brand-fg, #FFFFFF); |
| 12 | `src/index.css:166` | `#f97316` | --color-brand-orange: #f97316; |
| 13 | `src/index.css:167` | `#3b82f6` | --color-brand-blue: #3b82f6; |
| 14 | `src/index.css:168` | `#0d9488` | --color-brand-turquoise: #0d9488; |
| 15 | `src/index.css:171` | `#0077FF` | --color-platform-vk: #0077FF; |
| 16 | `src/index.css:172` | `#EE8208` | --color-platform-ok: #EE8208; |
| 17 | `src/index.css:173` | `#0083CA` | --color-platform-prodoctorov: #0083CA; |
| 18 | `src/index.css:174` | `#005bff` | --color-platform-prodoctorov-text: #005bff; |
| 19 | `src/index.css:175` | `#A4C516` | --color-platform-gis2: #A4C516; |
| 20 | `src/index.css:176` | `#FF0000` | --color-platform-yandex: #FF0000; |
| 21 | `src/index.css:177` | `#25D366` | --color-platform-whatsapp: #25D366; |
| 22 | `src/index.css:178` | `#00BFA5` | --color-platform-prodoctors: #00BFA5; |
| 23 | `src/index.css:181` | `#111827` | --color-text-primary: #111827; |
| 24 | `src/index.css:182` | `#ffffff` | --color-surface: #ffffff; |
| 25 | `src/index.css:183` | `#f9fafb` | --color-surface-muted: #f9fafb; |
| 26 | `src/index.css:291` | `#ffffff` | [data-theme="white"] { background-color: #ffffff; } |
| 27 | `src/index.css:292` | `#f9fafb` | [data-theme="gray"] { background-color: #f9fafb; } |
| 28 | `src/index.css:294` | `#111827` | [data-theme="dark"] { background-color: #111827; color: #ffffff; } |
| 29 | `src/index.css:294` | `#ffffff` | [data-theme="dark"] { background-color: #111827; color: #ffffff; } |

---

## 7. HEX-инвентарь: Prototypes (низкий приоритет)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|


---

## 8. HEX-инвентарь: Dev Tools (не продакшн)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|


---

## 9. HEX-инвентарь: Booking Widget (READ-ONLY)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|
| 1 | `src/widget/BookingWidget.tsx:32` | `#ffffff` | '--color-background': '#ffffff', |
| 2 | `src/widget/BookingWidget.tsx:33` | `#f8fafc` | '--color-surface': '#f8fafc', |
| 3 | `src/widget/BookingWidget.tsx:34` | `#f1f5f9` | '--color-surface-hover': '#f1f5f9', |
| 4 | `src/widget/BookingWidget.tsx:35` | `#0f172a` | '--color-text-primary': '#0f172a', |
| 5 | `src/widget/BookingWidget.tsx:36` | `#64748b` | '--color-text-secondary': '#64748b', |
| 6 | `src/widget/BookingWidget.tsx:37` | `#e2e8f0` | '--color-border': 'var(--app-border-color, #e2e8f0)', |

---

## 10. Уникальные HEX — сводная таблица

| HEX | Где встречается (файлы) |
|-----|-------------------------|
| `#000000` | `src/app/styles/accessibility.css`, `src/shared/config/designTokens.ts` |
| `#005bff` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#0077ff` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#0083ca` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#009e73` | `src/shared/config/designTokens.ts` |
| `#00bfa5` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#00d09c` | `src/shared/config/designTokens.ts` |
| `#03a9f4` | `src/shared/config/designTokens.ts` |
| `#063462` | `src/app/styles/accessibility.css`, `src/shared/config/designTokens.ts` |
| `#0d9488` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#0f172a` | `src/shared/config/designTokens.ts`, `src/widget/BookingWidget.tsx` |
| `#0f3d1f` | `src/shared/config/designTokens.ts` |
| `#111827` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#1a1a2e` | `src/shared/config/designTokens.ts` |
| `#1b5e20` | `src/shared/config/designTokens.ts` |
| `#25d366` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#2b8a3e` | `src/shared/config/designTokens.ts` |
| `#3b82f6` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#4caf50` | `src/shared/config/designTokens.ts` |
| `#64748b` | `src/widget/BookingWidget.tsx` |
| `#673ab7` | `src/shared/config/designTokens.ts` |
| `#6b7280` | `src/shared/config/designTokens.ts` |
| `#7c3aed` | `src/shared/config/designTokens.ts` |
| `#888888` | `src/shared/config/designTokens.ts` |
| `#9dd1ff` | `src/app/styles/accessibility.css`, `src/shared/config/designTokens.ts` |
| `#a4c516` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#a5d6a7` | `src/shared/config/designTokens.ts` |
| `#aaaaaa` | `src/shared/config/designTokens.ts` |
| `#c9b8f0` | `src/shared/config/designTokens.ts` |
| `#cbd5e1` | `src/shared/config/designTokens.ts` |
| `#d1d5db` | `src/shared/config/designTokens.ts` |
| `#d4af37` | `src/shared/config/designTokens.ts` |
| `#e0e0e0` | `src/shared/config/designTokens.ts` |
| `#e2e8f0` | `src/widget/BookingWidget.tsx` |
| `#e5e7eb` | `src/shared/config/designTokens.ts` |
| `#e8e8e8` | `src/shared/config/designTokens.ts` |
| `#e8f5e9` | `src/shared/config/designTokens.ts` |
| `#e91e63` | `src/shared/config/designTokens.ts` |
| `#ee8208` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#ef4444` | `src/shared/config/designTokens.ts` |
| `#f0ebfa` | `src/shared/config/designTokens.ts` |
| `#f1f5f9` | `src/widget/BookingWidget.tsx` |
| `#f5f0ff` | `src/shared/config/designTokens.ts` |
| `#f7f7f7` | `src/shared/config/designTokens.ts` |
| `#f8fafc` | `src/widget/BookingWidget.tsx` |
| `#f97316` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#f9fafb` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#ff0000` | `src/index.css`, `src/shared/config/designTokens.ts` |
| `#ffffff` | `src/app/styles/accessibility.css`, `src/index.css`, `src/shared/config/designTokens.ts`, `src/widget/BookingWidget.tsx` |

---

## 11. Arbitrary Tailwind colors (не HEX, но кастом)

Примеры: `text-[#2C2C2C]`, `bg-[var(--color-text-primary,#111827)]`, `shadow-[0_8px_32px_…]`

| Tier | Кол-во |
|------|--------|
| foundation | 6 |
| production-widgets | 77 |
| production-pages | 24 |
| shared-ui | 10 |
| prototype | 60 |
| dev-tools | 103 |
| booking-widget | 153 |

### Production — arbitrary colors (полный список)

| # | Файл:строка | Класс | Контекст |
|---|-------------|-------|----------|
| 1 | `src/App.tsx:114` | `from-[var(--color-primary)]` | <div className="hidden sm:block absolute top-0 left-0 w-full h-96 bg-gradient-to |
| 2 | `src/App.tsx:115` | `bg-[var(--color-primary)]` | <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-[var(--c |
| 3 | `src/App.tsx:118` | `shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]` | <div className="w-full max-w-5xl bg-white sm:rounded-[32px] sm:shadow-[0_8px_40p |
| 4 | `src/App.tsx:126` | `from-[var(--color-primary)]` | <div className="hidden sm:block absolute top-0 left-0 w-full h-96 bg-gradient-to |
| 5 | `src/App.tsx:127` | `bg-[var(--color-primary)]` | <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-[var(--c |
| 6 | `src/App.tsx:130` | `shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]` | <div className="w-full max-w-5xl bg-white sm:rounded-[32px] sm:shadow-[0_8px_40p |
| 7 | `src/pages/doctor/ui/DoctorPage.tsx:248` | `text-[1rem]` | <div className="text-gray-600 text-[1rem] md:text-xl mb-5 leading-relaxed max-w- |
| 8 | `src/pages/doctor/ui/DoctorPage.tsx:338` | `shadow-[0_8px_30px_rgb(0,0,0,0.04)]` | <Card className="p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray |
| 9 | `src/pages/doctor/ui/DoctorPage.tsx:440` | `border-[4px]` | <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-[4px] border |
| 10 | `src/pages/doctor/ui/DoctorPage.tsx:517` | `shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]` | <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl b |
| 11 | `src/pages/doctor/ui/DoctorPage.tsx:521` | `text-[10px]` | <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">П |
| 12 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:92` | `text-[10px]` | <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracki |
| 13 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:111` | `text-[10px]` | <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracki |
| 14 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:170` | `shadow-[0_-10px_40px_rgba(0,0,0,0.1)]` | <Card className="fixed md:absolute z-50 bottom-0 left-0 right-0 md:bottom-auto m |
| 15 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:194` | `text-[15px]` | <span className="truncate pr-4 text-[15px] md:text-base">{spec}</span> |
| 16 | `src/pages/service/ui/ServicePage.tsx:258` | `text-[46px]` | <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-extrabold text-gray-900  |
| 17 | `src/pages/service/ui/ServicePage.tsx:265` | `text-[17px]` | <p className="text-base sm:text-[17px] text-gray-600 leading-[1.6] mb-5"> |
| 18 | `src/pages/service/ui/ServicePage.tsx:268` | `text-[17px]` | <p className="text-base sm:text-[17px] text-gray-600 leading-[1.6] mb-8"> |
| 19 | `src/pages/service/ui/ServicePage.tsx:275` | `text-[13px]` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-brand hover:bri |
| 20 | `src/pages/service/ui/ServicePage.tsx:286` | `text-[44px]` | <div className="text-[44px] leading-none font-bold text-gray-900 mb-1">5.0</div> |
| 21 | `src/pages/service/ui/ServicePage.tsx:287` | `text-[15px]` | <div className="text-[15px] sm:text-[13px] text-gray-900 font-medium leading-[1. |
| 22 | `src/pages/service/ui/ServicePage.tsx:287` | `text-[13px]` | <div className="text-[15px] sm:text-[13px] text-gray-900 font-medium leading-[1. |
| 23 | `src/pages/service/ui/ServicePage.tsx:292` | `text-[44px]` | <div className="text-[44px] leading-none font-bold text-gray-900 mb-1">5.0</div> |
| 24 | `src/pages/service/ui/ServicePage.tsx:293` | `text-[15px]` | <div className="text-[15px] sm:text-[13px] text-gray-900 font-medium leading-[1. |
| 25 | `src/pages/service/ui/ServicePage.tsx:293` | `text-[13px]` | <div className="text-[15px] sm:text-[13px] text-gray-900 font-medium leading-[1. |
| 26 | `src/pages/service/ui/ServicePage.tsx:301` | `text-[13px]` | {renderPlatformBadge("yandex")} <span className="text-[13px] text-gray-700 font- |
| 27 | `src/pages/service/ui/ServicePage.tsx:304` | `text-[13px]` | {renderPlatformBadge("2gis")} <span className="text-[13px] text-gray-700 font-se |
| 28 | `src/pages/service/ui/ServicePage.tsx:307` | `text-[13px]` | <span className="text-platform-prodoctorov-text font-bold text-[13px] ml-1">prod |
| 29 | `src/pages/service/ui/ServicePage.tsx:762` | `shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]` | <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl b |
| 30 | `src/pages/service/ui/ServicePage.tsx:764` | `text-[10px]` | <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold"> |
| 31 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:31` | `bg-[conic-gradient(from_0deg,transparent_0_270deg,currentColor_360deg)]` | className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_270deg,curre |
| 32 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:118` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight relative z-10">{item.lab |
| 33 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:144` | `text-[10px]` | <span className="text-[10px] font-bold tracking-tight relative z-10">{item.label |
| 34 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:158` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight">{item.label}</span> |
| 35 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:183` | `border-[1.5px]` | isActive ? 'bg-brand text-brand-fg shadow-brand/30 scale-105' : 'bg-white text-b |
| 36 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:188` | `text-[10px]` | <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive ? 'text-b |
| 37 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:204` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight">{item.label}</span> |
| 38 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:248` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight">{item.label}</span> |
| 39 | `src/widgets/categories-widget/ui/CategoriesVariants.tsx:60` | `shadow-[var(--app-shadow)]` | className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-4 shadow |
| 40 | `src/widgets/categories-widget/ui/CategoriesVariants.tsx:106` | `shadow-[var(--app-shadow)]` | className="bg-white p-6 md:p-8 shadow-[var(--app-shadow)] flex flex-col items-st |
| 41 | `src/widgets/categories-widget/ui/CategoriesVariants.tsx:159` | `text-[10.5px]` | <span className="mt-2.5 text-[10.5px] sm:text-xs md:text-sm font-semibold text-g |
| 42 | `src/widgets/city-selector/ui/CitySelectorModal.tsx:48` | `text-[15px]` | <span className={`text-[15px] font-bold ${cityRegion === city ? 'text-brand' : ' |
| 43 | `src/widgets/footer/ui/Footer.tsx:188` | `text-[10px]` | <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Загру |
| 44 | `src/widgets/footer/ui/Footer.tsx:195` | `text-[10px]` | <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Досту |
| 45 | `src/widgets/header/ui/Header.tsx:45` | `shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)]` | "md:border-white/55 md:shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)]", |
| 46 | `src/widgets/header/ui/Header.tsx:87` | `text-[19px]` | className={`font-black text-[19px] leading-none tracking-wide transition-colors  |
| 47 | `src/widgets/header/ui/Header.tsx:95` | `text-[7.5px]` | className={`font-bold text-[7.5px] leading-none transition-colors ${isTransparen |
| 48 | `src/widgets/header/ui/Header.tsx:121` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 49 | `src/widgets/header/ui/Header.tsx:127` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 50 | `src/widgets/header/ui/Header.tsx:133` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 51 | `src/widgets/header/ui/Header.tsx:139` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 52 | `src/widgets/header/ui/Header.tsx:149` | `text-[16px]` | className={`text-[16px] font-bold transition-colors hidden lg:block mr-2 hover:t |
| 53 | `src/widgets/header/ui/ServicesMegaMenu.tsx:48` | `text-[16px]` | className={`text-[16px] font-medium transition-colors py-2 ${isOpen ? 'text-bran |
| 54 | `src/widgets/header/ui/ServicesMegaMenu.tsx:63` | `shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]` | <Card className="p-0 shadow-xl overflow-hidden flex max-h-[70vh] md:bg-white/65  |
| 55 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:283` | `text-[11px]` | className="absolute top-24 lg:top-28 right-6 lg:right-10 z-20 text-white text-[1 |
| 56 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:306` | `text-[15px]` | <p className="text-[15px] text-white/[0.82] leading-relaxed max-w-xl mb-6 sm:mb- |
| 57 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:119` | `text-[17px]` | <h2 className="text-[17px] font-bold text-gray-900 leading-tight"> |
| 58 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:122` | `text-[13px]` | <p className="text-[13px] text-gray-500 mt-0.5 leading-tight"> |
| 59 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:132` | `shadow-[0_4px_12px_rgba(34,197,94,0.2)]` | className="flex-1 shadow-[0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[0_6px_16 |
| 60 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:132` | `shadow-[0_6px_16px_rgba(34,197,94,0.3)]` | className="flex-1 shadow-[0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[0_6px_16 |
| 61 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:132` | `text-[15px]` | className="flex-1 shadow-[0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[0_6px_16 |
| 62 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:138` | `text-[15px]` | className="flex-[0.8] bg-white border-gray-200 text-gray-700 hover:bg-gray-50 ho |
| 63 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:195` | `shadow-[0_0_8px_rgba(255,255,255,0.8)]` | ? 'h-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' |
| 64 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:41` | `text-[10px]` | <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10p |
| 65 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:67` | `text-[10px]` | <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10p |
| 66 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:96` | `text-[9px]` | <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] |
| 67 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:96` | `text-[10px]` | <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] |
| 68 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:99` | `text-[26px]` | <h2 className="text-[26px] leading-[1.1] min-[400px]:text-3xl sm:text-4xl font-b |
| 69 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:102` | `text-[13px]` | <p className="text-white/90 text-xs sm:text-[13px] max-w-[280px] leading-snug dr |
| 70 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:107` | `text-[15px]` | <Button as={Link} to={slide.link} className="bg-white text-black hover:bg-gray-1 |
| 71 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:114` | `text-[10px]` | <span className="text-[10px] uppercase tracking-widest font-bold mb-1">Свайп</sp |
| 72 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:99` | `text-[10px]` | 'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold track |
| 73 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:132` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium px-6 h-10 shadow-md" |
| 74 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:178` | `text-[11px]` | <p className="text-[11px] text-gray-500 mb-2">{card.specialization}</p> |
| 75 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:202` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5" |
| 76 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:236` | `text-[10px]` | className="text-[10px] font-medium tracking-[0.08em] uppercase mb-2" |
| 77 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:250` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5 w-fit" |
| 78 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:279` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5 w-fit mt-3 |
| 79 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:21` | `text-[13px]` | className="flex-1 flex items-center justify-center gap-2 rounded-[30px] text-whi |
| 80 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:29` | `text-[13px]` | className="flex-1 flex items-center justify-center gap-2 rounded-[30px] text-gra |
| 81 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:29` | `border-[0.5px]` | className="flex-1 flex items-center justify-center gap-2 rounded-[30px] text-gra |
| 82 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:50` | `text-[13px]` | 'flex-1 py-1.5 rounded-[28px] text-[13px] transition-opacity', |
| 83 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:78` | `text-[13px]` | 'text-[13px] px-3.5 py-1.5 rounded-[20px] border-[0.5px]', |
| 84 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:78` | `border-[0.5px]` | 'text-[13px] px-3.5 py-1.5 rounded-[20px] border-[0.5px]', |
| 85 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:101` | `text-[13px]` | className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand n |
| 86 | `src/widgets/hero-widget/ui/mobile/HeroMobileZonePromos.tsx:42` | `border-[0.5px]` | className="shrink-0 rounded-xl p-3 border-[0.5px] bg-white" |
| 87 | `src/widgets/hero-widget/ui/mobile/HeroMobileZonePromos.tsx:52` | `text-[13px]` | <p className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 mb |
| 88 | `src/widgets/hero-widget/ui/mobile/HeroMobileZonePromos.tsx:56` | `text-[11px]` | className="flex items-center gap-1 text-[11px]" |
| 89 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:105` | `text-[15px]` | className="w-full bg-transparent pl-9 pr-4 py-2 text-[15px] outline-none placeho |
| 90 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:162` | `text-[13px]` | className="px-3 py-1.5 bg-gray-100/80 hover:bg-gray-200 text-gray-600 rounded-fu |
| 91 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:175` | `text-[11px]` | <div className="px-2 py-2 text-[11px] font-bold text-gray-400 uppercase tracking |
| 92 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:192` | `text-[15px]` | <div className="font-bold text-gray-900 text-[15px] truncate">{doctor.name}</div |
| 93 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:193` | `text-[13px]` | <div className="text-[13px] text-gray-500 truncate mt-0.5">{doctor.specialty}</d |
| 94 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:200` | `text-[14px]` | className="w-full p-3 mt-2 text-[14px] text-brand font-semibold text-center hove |
| 95 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:207` | `text-[15px]` | <p className="text-[15px] text-gray-500">По запросу «{searchQuery}» ничего не на |
| 96 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:224` | `text-[17px]` | className="flex-1 py-3 px-4 font-bold text-[17px] text-gray-900 hover:bg-gray-50 |
| 97 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:269` | `text-[16px]` | className="block py-2.5 px-3 text-[16px] font-medium text-gray-600 hover:text-br |
| 98 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:289` | `text-[17px]` | className="flex items-center justify-center w-full py-3.5 bg-brand text-brand-fg |
| 99 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:300` | `text-[19px]` | <span className="text-gray-900 font-extrabold text-[19px] tracking-tight whitesp |
| 100 | `src/widgets/portfolio-widget/ui/PortfolioWidget.tsx:138` | `shadow-[0_0_10px_rgba(0,0,0,0.5)]` | className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_ |
| 101 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:152` | `text-[9px]` | <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider te |
| 102 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:152` | `text-[10px]` | <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider te |
| 103 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:413` | `text-[10px]` | <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 le |
| 104 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:511` | `text-[9px]` | <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt- |
| 105 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:637` | `text-[10px]` | <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 le |
| 106 | `src/widgets/reviews-widget/ui/ReviewsWidgetVariants.tsx:47` | `text-[10px]` | "text-[10px] font-semibold px-2 py-0.5 rounded-full border", |
| 107 | `src/widgets/timeline-widget/ui/TimelineWidgetVariants.tsx:38` | `border-[4px]` | "w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-full flex items-center justify-cente |

---

## 12. Arbitrary размеры — топ повторяющихся (production tier)

| Класс | Вхождений |
|-------|-----------|
| `text-[10px]` | 27 |
| `text-[13px]` | 20 |
| `text-[15px]` | 11 |
| `leading-[1.15]` | 9 |
| `rounded-[30px]` | 8 |
| `text-[16px]` | 7 |
| `text-[11px]` | 7 |
| `h-[100svh]` | 6 |
| `leading-[1.1]` | 5 |
| `text-[17px]` | 5 |
| `min-h-[400px]` | 4 |
| `tracking-[0.08em]` | 4 |
| `w-[280px]` | 4 |
| `h-[140px]` | 4 |
| `max-w-[150px]` | 4 |
| `min-h-[160px]` | 3 |
| `rounded-[32px]` | 3 |
| `text-[9px]` | 3 |
| `min-h-[380px]` | 3 |
| `w-[320px]` | 3 |
| `w-[400px]` | 3 |
| `gap-[3px]` | 2 |
| `max-w-[120px]` | 2 |
| `min-h-[200px]` | 2 |
| `max-h-[70vh]` | 2 |
| `rounded-[28px]` | 2 |
| `w-[340px]` | 2 |
| `text-[19px]` | 2 |
| `min-h-[460px]` | 2 |
| `w-[50%]` | 2 |
| `w-[100vw]` | 2 |
| `rounded-[20px]` | 2 |
| `mt-[80px]` | 2 |
| `mt-[96px]` | 2 |
| `max-w-[200px]` | 2 |
| `min-h-[480px]` | 2 |
| `pt-[80px]` | 2 |
| `w-[52px]` | 2 |
| `h-[52px]` | 2 |
| `py-[13px]` | 2 |

### hero-widget — все arbitrary размеры

| # | Файл:строка | Класс |
|---|-------------|-------|
| 1 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:31` | `min-h-[460px]` |
| 2 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:45` | `w-[50%]` |
| 3 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:45` | `min-h-[400px]` |
| 4 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:60` | `leading-[1.15]` |
| 5 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:124` | `w-[50%]` |
| 6 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:124` | `min-h-[400px]` |
| 7 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:153` | `min-h-[460px]` |
| 8 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:153` | `min-h-[540px]` |
| 9 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:181` | `leading-[1.1]` |
| 10 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:256` | `h-[100svh]` |
| 11 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:256` | `mt-[5rem]` |
| 12 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:256` | `mt-[6rem]` |
| 13 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:256` | `mt-[8rem]` |
| 14 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:256` | `w-[100vw]` |
| 15 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:283` | `text-[11px]` |
| 16 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:283` | `tracking-[0.08em]` |
| 17 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:283` | `rounded-[20px]` |
| 18 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:299` | `leading-[1.1]` |
| 19 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:306` | `text-[15px]` |
| 20 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:83` | `h-[100svh]` |
| 21 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:83` | `mt-[-7rem]` |
| 22 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:83` | `mt-[-8rem]` |
| 23 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:83` | `w-[100vw]` |
| 24 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:87` | `h-[100svh]` |
| 25 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:87` | `mt-[80px]` |
| 26 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:87` | `mt-[96px]` |
| 27 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:119` | `text-[17px]` |
| 28 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:122` | `text-[13px]` |
| 29 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:132` | `text-[15px]` |
| 30 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:138` | `text-[15px]` |
| 31 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:151` | `h-[100svh]` |
| 32 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:162` | `h-[100svh]` |
| 33 | `src/widgets/hero-widget/ui/HeroMobileClassic.tsx:162` | `w-[calc(100vw-32px)]` |
| 34 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:16` | `min-h-[160px]` |
| 35 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:16` | `max-h-[180px]` |
| 36 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:17` | `h-[100%]` |
| 37 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:23` | `max-w-[200px]` |
| 38 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:41` | `text-[10px]` |
| 39 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:44` | `leading-[1.15]` |
| 40 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:60` | `min-h-[440px]` |
| 41 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:60` | `min-h-[480px]` |
| 42 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:61` | `h-[60%]` |
| 43 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:64` | `mt-[45%]` |
| 44 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:67` | `text-[10px]` |
| 45 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:71` | `leading-[1.10]` |
| 46 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:87` | `h-[100svh]` |
| 47 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:87` | `pb-[100px]` |
| 48 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:87` | `pt-[80px]` |
| 49 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:93` | `max-w-[400px]` |
| 50 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:96` | `text-[9px]` |
| 51 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:96` | `text-[10px]` |
| 52 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:99` | `text-[26px]` |
| 53 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:99` | `leading-[1.1]` |
| 54 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:102` | `text-[13px]` |
| 55 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:102` | `max-w-[280px]` |
| 56 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:107` | `min-h-[48px]` |
| 57 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:107` | `text-[15px]` |
| 58 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:113` | `bottom-[80px]` |
| 59 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:114` | `text-[10px]` |
| 60 | `src/widgets/hero-widget/ui/HeroPromoProgress.tsx:21` | `h-[3px]` |
| 61 | `src/widgets/hero-widget/ui/HeroSection.tsx:51` | `min-h-[420px]` |
| 62 | `src/widgets/hero-widget/ui/HeroSection.tsx:51` | `min-h-[480px]` |
| 63 | `src/widgets/hero-widget/ui/HeroSection.tsx:51` | `min-h-[500px]` |
| 64 | `src/widgets/hero-widget/ui/HeroSlideDots.tsx:37` | `rounded-[4px]` |
| 65 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:46` | `min-h-[260px]` |
| 66 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:46` | `min-h-[380px]` |
| 67 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:99` | `text-[10px]` |
| 68 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:99` | `tracking-[0.08em]` |
| 69 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:132` | `rounded-[30px]` |
| 70 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:132` | `text-[13px]` |
| 71 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:178` | `text-[11px]` |
| 72 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:194` | `w-[52px]` |
| 73 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:194` | `h-[52px]` |
| 74 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:202` | `rounded-[30px]` |
| 75 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:202` | `text-[13px]` |
| 76 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:236` | `text-[10px]` |
| 77 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:236` | `tracking-[0.08em]` |
| 78 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:250` | `rounded-[30px]` |
| 79 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:250` | `text-[13px]` |
| 80 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:279` | `rounded-[30px]` |
| 81 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:279` | `text-[13px]` |
| 82 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:298` | `w-[52px]` |
| 83 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:298` | `h-[52px]` |
| 84 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:322` | `min-h-[380px]` |
| 85 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:333` | `min-h-[380px]` |
| 86 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:21` | `rounded-[30px]` |
| 87 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:21` | `text-[13px]` |
| 88 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:21` | `py-[13px]` |
| 89 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:24` | `w-[17px]` |
| 90 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:24` | `h-[17px]` |
| 91 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:29` | `rounded-[30px]` |
| 92 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:29` | `text-[13px]` |
| 93 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:29` | `py-[13px]` |
| 94 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:33` | `w-[17px]` |
| 95 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneCta.tsx:33` | `h-[17px]` |
| 96 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:38` | `p-[3px]` |
| 97 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:38` | `rounded-[30px]` |
| 98 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:50` | `rounded-[28px]` |
| 99 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:50` | `text-[13px]` |
| 100 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:78` | `text-[13px]` |
| 101 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:78` | `rounded-[20px]` |
| 102 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneNav.tsx:101` | `text-[13px]` |
| 103 | `src/widgets/hero-widget/ui/mobile/HeroMobileZonePromos.tsx:52` | `text-[13px]` |
| 104 | `src/widgets/hero-widget/ui/mobile/HeroMobileZonePromos.tsx:56` | `text-[11px]` |
| 105 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneSlider.tsx:92` | `tracking-[0.08em]` |
| 106 | `src/widgets/hero-widget/ui/mobile/HeroMobileZoneSlider.tsx:141` | `rounded-[30px]` |

### header — все arbitrary размеры

| # | Файл:строка | Класс |
|---|-------------|-------|
| 1 | `src/widgets/header/ui/Header.tsx:83` | `w-[30px]` |
| 2 | `src/widgets/header/ui/Header.tsx:83` | `h-[30px]` |
| 3 | `src/widgets/header/ui/Header.tsx:87` | `text-[19px]` |
| 4 | `src/widgets/header/ui/Header.tsx:91` | `mt-[3px]` |
| 5 | `src/widgets/header/ui/Header.tsx:95` | `text-[7.5px]` |
| 6 | `src/widgets/header/ui/Header.tsx:121` | `text-[16px]` |
| 7 | `src/widgets/header/ui/Header.tsx:127` | `text-[16px]` |
| 8 | `src/widgets/header/ui/Header.tsx:133` | `text-[16px]` |
| 9 | `src/widgets/header/ui/Header.tsx:139` | `text-[16px]` |
| 10 | `src/widgets/header/ui/Header.tsx:149` | `text-[16px]` |
| 11 | `src/widgets/header/ui/ServicesMegaMenu.tsx:48` | `text-[16px]` |
| 12 | `src/widgets/header/ui/ServicesMegaMenu.tsx:63` | `max-h-[70vh]` |

---

## 13. Использование DS-классов (brand / green / violet)

Компоненты, уже на токенах (для справки — не требуют замены без Дельты):

| Файл | DS-классов | Примеры |
|------|------------|---------|
| `src/widgets/footer/ui/Footer.tsx` | 77 | `text-gray-600`, `border-gray-100`, `text-gray-900`, `bg-gray-50` |
| `src/widgets/reviews-widget/ui/ReviewsWidgetVariants.tsx` | 65 | `bg-red-50`, `text-red-600`, `border-red-100`, `bg-green-50` |
| `src/widgets/mobile-menu/ui/MobileMenu.tsx` | 46 | `border-gray-100/50`, `bg-gray-100`, `text-gray-400`, `bg-gray-50` |
| `src/widgets/accessibility/ui/AccessibilityPanel.tsx` | 45 | `border-gray-200`, `text-gray-600`, `text-gray-700`, `bg-gray-100` |
| `src/widgets/directions-widget/ui/DirectionsWidgetVariants.tsx` | 36 | `text-gray-800`, `border-gray-100`, `bg-gray-100`, `text-gray-700` |
| `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx` | 34 | `bg-brand-orange`, `text-brand-orange`, `bg-brand-violet`, `text-brand-violet` |
| `src/widgets/program-widget/ui/variants/ProgramVariantClassic.tsx` | 27 | `text-gray-900`, `text-gray-500`, `text-gray-600`, `bg-gray-50` |
| `src/widgets/special-offers-widget/ui/SpecialOffersWidgetVariants.tsx` | 26 | `from-blue-600/90`, `to-orange-600/90`, `from-emerald-600/90`, `to-teal-600/90` |
| `src/widgets/calculator-widget/ui/CalculatorWidget.tsx` | 21 | `bg-gray-100`, `bg-gray-200/50`, `border-gray-200/50`, `from-gray-50` |
| `src/widgets/events/ui/EventRegistrationModal.tsx` | 19 | `text-gray-900`, `text-gray-500`, `bg-green-100`, `text-green-600` |
| `src/widgets/header/ui/Header.tsx` | 18 | `border-gray-100/80`, `bg-gray-100`, `bg-gray-200`, `text-gray-700` |
| `src/widgets/bottom-nav/ui/BottomNavVariants.tsx` | 17 | `from-blue-500`, `via-purple-500`, `to-emerald-400`, `text-gray-400` |
| `src/widgets/features-widget/ui/FeaturesWidgetVariants.tsx` | 17 | `border-gray-100`, `bg-green-50`, `text-green-600`, `text-gray-900` |
| `src/widgets/showcase-widget/ui/variants/ShowcaseVariantClassic.tsx` | 15 | `text-gray-900`, `text-gray-800`, `text-gray-200`, `text-gray-600` |
| `src/widgets/doctors-widget/ui/DoctorsWidgetVariants.tsx` | 13 | `text-gray-900`, `text-gray-500`, `text-gray-600`, `bg-gray-50` |

---

## 14. Расхождения SSOT ↔ код (факты для Дельты)

| Факт | SSOT говорит | Код использует |
|------|--------------|----------------|
| Зелёный бренд | `brand` = HSL `--brand-h:155` ≈ teal-green | `heroTheme.brandGreen` = `#2b8a3e` |
| ВРТ фиолетовый | `brand-violet` = HSL accent | `heroTheme.brandViolet` = `#7c3aed` (= Tailwind violet-600) |
| Оранжевый | `index.css` `#ea580c`, tailwind `#f97316` | Оба разных |
| Синий | `index.css` `#2563eb`, tailwind `#3b82f6` | Оба разных |
| Бирюза | `index.css` `#0d9488`, tailwind `#14b8a6` | Оба разных |
| Скругление | `--app-radius: 24px` | hero `borderRadius: 16`, кнопки `rounded-[30px]` |
| Текст логотипа | — | `#2C2C2C` (не gray-900) |
| CTA услуги | `bg-brand` | `#3e9f3e` / `#348834` / `#2d762d` |
| Фон карточки врача | `gray-50`? | `#f4f5f7` |
| VK hover | — | `#0077FF` |
| OK hover | — | `#EE8208` |

---

## 15. Шаблон Дельты (для заполнения)

Создайте `docs/plan/design_delta.md` по образцу:

```markdown
| Ref (аудит §) | Действие | Целевое значение | Примечание |
|---------------|----------|------------------|------------|
| §4 heroTheme.brandGreen | REPLACE | `brand` / token | |
| §7 app-prototype * | DEFER | — | не продакшн |
| §9 booking-widget * | KEEP | — | read-only |
```

---

*Сырые данные: `docs/legacy/audits/design_audit_raw.json` · Скрипт: `node scripts/design-audit.mjs`*