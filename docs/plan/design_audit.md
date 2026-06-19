# Аудит дизайн-токенов · med_site

**Дата:** 2026-06-19
**Статус:** Шаг 1 — только факты, без рекомендаций
**Следующий шаг:** вы заполняете `design_delta.md` (REPLACE / KEEP / DEFER)

---

## 1. Сводка

| Зона | HEX-вхождений | Arbitrary color `[#…]` | Arbitrary размеры `[Npx]` | Файлов затронуто |
|------|---------------|------------------------|---------------------------|------------------|
| `widgets` | 44 | 178 | 315 | 62 |
| `pages` | 46 | 141 | 138 | 38 |
| `shared` | 0 | 6 | 15 | 16 |
| `components` | 0 | 2 | 7 | 4 |
| `app` | 12 | 0 | 4 | 4 |
| `admin` | 1 | 2 | 7 | 2 |
| `widget-booking` | 6 | 153 | 46 | 17 |
| `root` | 10 | 6 | 2 | 2 |
| `other` | 0 | 2 | 9 | 2 |

**Уникальных HEX-значений в коде:** 60

### Классификация по приоритету ревизии

| Tier | Описание | HEX | Arbitrary colors |
|------|----------|-----|------------------|
| **foundation** | | 22 | 6 |
| **production-widgets** | | 30 | 75 |
| **production-pages** | | 21 | 45 |
| **shared-ui** | | 0 | 10 |
| **other-pages** | | 1 | 12 |
| **other-widgets** | | 0 | 0 |
| **prototype** | | 24 | 84 |
| **dev-tools** | | 15 | 105 |
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
| 1 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:51` | `#ffffff` | style={{ background: '#ffffff', color: '#000000' }} |
| 2 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:51` | `#000000` | style={{ background: '#ffffff', color: '#000000' }} |
| 3 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:59` | `#ffffff` | style={{ background: '#ffffff', color: '#000000' }} |
| 4 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:59` | `#000000` | style={{ background: '#ffffff', color: '#000000' }} |
| 5 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:67` | `#000000` | style={{ background: '#000000', color: '#ffffff' }} |
| 6 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:67` | `#ffffff` | style={{ background: '#000000', color: '#ffffff' }} |
| 7 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:75` | `#9dd1ff` | style={{ background: '#9dd1ff', color: '#063462' }} |
| 8 | `src/widgets/accessibility/ui/AccessibilityPanel.tsx:75` | `#063462` | style={{ background: '#9dd1ff', color: '#063462' }} |
| 9 | `src/widgets/footer/ui/Footer.tsx:28` | `#0077FF` | <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-gray-50 hover:bg-[#0077FF] te |
| 10 | `src/widgets/footer/ui/Footer.tsx:34` | `#EE8208` | <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-gray-50 hover:bg-[#EE8208] te |
| 11 | `src/widgets/header/ui/Header.tsx:87` | `#2C2C2C` | className={`font-black text-[19px] leading-none tracking-wide transition-colors ${isTransparent ? "text-white" : "text-[#2C2C2C]"}`} |
| 12 | `src/widgets/header/ui/Header.tsx:95` | `#2C2C2C` | className={`font-bold text-[7.5px] leading-none transition-colors ${isTransparent ? "text-white/90" : "text-[#2C2C2C]"}`} |
| 13 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:127` | `#121212` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1584982751601-97dcc09665 |
| 14 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:128` | `#121212` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1516549655169-df83a07745 |
| 15 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:129` | `#121212` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1586773860418-d37222d8fc |
| 16 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:136` | `#ffffff` | backgroundColor: '#ffffff', |
| 17 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:139` | `#ffffff` | : { backgroundColor: HERO_THEME.brandGreen, color: '#ffffff' } |
| 18 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:258` | `#111827` | <h3 className="text-base font-medium text-[var(--color-text-primary,#111827)] leading-snug pr-14 mb-1 flex-1"> |

### hero-widget (включая config)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|
| 1 | `src/widgets/hero-widget/config/heroTheme.ts:3` | `#2b8a3e` | brandGreen: '#2b8a3e', |
| 2 | `src/widgets/hero-widget/config/heroTheme.ts:4` | `#7c3aed` | brandViolet: '#7c3aed', |
| 3 | `src/widgets/hero-widget/config/heroTheme.ts:5` | `#b45a8c` | brandCosmo: '#b45a8c', |
| 4 | `src/widgets/hero-widget/config/heroTheme.ts:6` | `#f0ebfa` | vrtCardBg: '#f0ebfa', |
| 5 | `src/widgets/hero-widget/config/heroTheme.ts:7` | `#c9b8f0` | vrtCardBorder: '#c9b8f0', |
| 6 | `src/widgets/hero-widget/config/heroTheme.ts:8` | `#e0e0e0` | cardBorder: '#e0e0e0', |
| 7 | `src/widgets/hero-widget/config/heroTheme.ts:42` | `#e8f5e9` | bg: '#e8f5e9', |
| 8 | `src/widgets/hero-widget/config/heroTheme.ts:43` | `#1b5e20` | color: '#1b5e20', |
| 9 | `src/widgets/hero-widget/config/heroTheme.ts:44` | `#a5d6a7` | border: '#a5d6a7', |
| 10 | `src/widgets/hero-widget/config/heroTheme.ts:48` | `#ef4444` | urgent: '#ef4444', |
| 11 | `src/widgets/hero-widget/config/heroTheme.ts:49` | `#f97316` | warning: '#f97316', |
| 12 | `src/widgets/hero-widget/config/heroTheme.ts:50` | `#7c3aed` | neutral: '#7c3aed', |
| 13 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:127` | `#121212` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1584982751601-97dcc09665 |
| 14 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:128` | `#121212` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1516549655169-df83a07745 |
| 15 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:129` | `#121212` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1586773860418-d37222d8fc |
| 16 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:136` | `#ffffff` | backgroundColor: '#ffffff', |
| 17 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:139` | `#ffffff` | : { backgroundColor: HERO_THEME.brandGreen, color: '#ffffff' } |
| 18 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:258` | `#111827` | <h3 className="text-base font-medium text-[var(--color-text-primary,#111827)] leading-snug pr-14 mb-1 flex-1"> |

---

## 5. HEX-инвентарь: Production Pages

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|
| 1 | `src/pages/doctor/ui/DoctorPage.tsx:214` | `#f4f5f7` | <div className="w-full md:w-2/5 lg:w-1/3 bg-[#f4f5f7] relative border-b md:border-b-0 md:border-r border-gray-100 shrink-0 min-w-0 flex flex |
| 2 | `src/pages/doctor/ui/DoctorPage.tsx:218` | `#f4f5f7` | <div className="aspect-[4/5] sm:aspect-square md:aspect-[3/4] w-full relative overflow-hidden bg-[#f4f5f7]"> |
| 3 | `src/pages/doctor/ui/DoctorPage.tsx:309` | `#0083CA` | { source: 'ПроДокторов', rating: 4.9, count: 128, color: 'bg-[#0083CA]', bg: 'bg-blue-50/50 hover:bg-blue-50', border: 'border-blue-100', le |
| 4 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `#A4C516` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C516]/5 hover:bg-[#A4C516]/10', border: 'border-[#A4C516]/20',  |
| 5 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `#A4C516` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C516]/5 hover:bg-[#A4C516]/10', border: 'border-[#A4C516]/20',  |
| 6 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `#A4C516` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C516]/5 hover:bg-[#A4C516]/10', border: 'border-[#A4C516]/20',  |
| 7 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `#A4C516` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C516]/5 hover:bg-[#A4C516]/10', border: 'border-[#A4C516]/20',  |
| 8 | `src/pages/doctor/ui/DoctorPage.tsx:311` | `#FF0000` | { source: 'Яндекс', rating: 4.8, count: 89, color: 'bg-[#FF0000]', bg: 'bg-red-50/50 hover:bg-red-50', border: 'border-red-100', letter: 'Я' |
| 9 | `src/pages/service/ui/ServicePage.tsx:258` | `#1a1a1a` | <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.1] mb-6 sm:mb-10"> |
| 10 | `src/pages/service/ui/ServicePage.tsx:275` | `#3e9f3e` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover:bg-[#348834] active:bg-[#2d762d] text-white border-transpar |
| 11 | `src/pages/service/ui/ServicePage.tsx:275` | `#348834` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover:bg-[#348834] active:bg-[#2d762d] text-white border-transpar |
| 12 | `src/pages/service/ui/ServicePage.tsx:275` | `#2d762d` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover:bg-[#348834] active:bg-[#2d762d] text-white border-transpar |
| 13 | `src/pages/service/ui/ServicePage.tsx:286` | `#1a1a1a` | <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div> |
| 14 | `src/pages/service/ui/ServicePage.tsx:287` | `#1a1a1a` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1.3] max-w-[150px] mx-auto sm:mx-0"> |
| 15 | `src/pages/service/ui/ServicePage.tsx:292` | `#1a1a1a` | <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div> |
| 16 | `src/pages/service/ui/ServicePage.tsx:293` | `#1a1a1a` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1.3] max-w-[150px] mx-auto sm:mx-0"> |
| 17 | `src/pages/service/ui/ServicePage.tsx:294` | `#005bff` | Средний рейтинг<br/>врачей на <span className="text-[#005bff]">prodoctorov</span> |
| 18 | `src/pages/service/ui/ServicePage.tsx:301` | `#1a1a1a` | {renderPlatformBadge("yandex")} <span className="text-[13px] text-gray-700 font-semibold ml-1">Карты</span> <span className="font-extrabold  |
| 19 | `src/pages/service/ui/ServicePage.tsx:304` | `#1a1a1a` | {renderPlatformBadge("2gis")} <span className="text-[13px] text-gray-700 font-semibold ml-1">2GIS</span> <span className="font-extrabold tex |
| 20 | `src/pages/service/ui/ServicePage.tsx:307` | `#005bff` | <span className="text-[#005bff] font-bold text-[13px] ml-1">prodoctorov</span> <span className="font-extrabold text-[#1a1a1a] ml-1">5.0</spa |
| 21 | `src/pages/service/ui/ServicePage.tsx:307` | `#1a1a1a` | <span className="text-[#005bff] font-bold text-[13px] ml-1">prodoctorov</span> <span className="font-extrabold text-[#1a1a1a] ml-1">5.0</spa |

---

## 6. HEX-инвентарь: Foundation (app + index.css)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|
| 1 | `src/app/providers/ThemeProvider.tsx:37` | `#429A2E` | case 'green': hue = 109; break; // Match original site (#429A2E) |
| 2 | `src/app/providers/ThemeProvider.tsx:72` | `#111827` | root.style.setProperty('--brand-fg', isLightBrandColor ? '#111827' : '#FFFFFF'); |
| 3 | `src/app/providers/ThemeProvider.tsx:72` | `#FFFFFF` | root.style.setProperty('--brand-fg', isLightBrandColor ? '#111827' : '#FFFFFF'); |
| 4 | `src/app/styles/accessibility.css:32` | `#ffffff` | background-color: #ffffff !important; |
| 5 | `src/app/styles/accessibility.css:33` | `#000000` | color: #000000 !important; |
| 6 | `src/app/styles/accessibility.css:34` | `#000000` | border-color: #000000 !important; |
| 7 | `src/app/styles/accessibility.css:40` | `#000000` | background-color: #000000 !important; |
| 8 | `src/app/styles/accessibility.css:41` | `#ffffff` | color: #ffffff !important; |
| 9 | `src/app/styles/accessibility.css:42` | `#ffffff` | border-color: #ffffff !important; |
| 10 | `src/app/styles/accessibility.css:48` | `#9dd1ff` | background-color: #9dd1ff !important; |
| 11 | `src/app/styles/accessibility.css:49` | `#063462` | color: #063462 !important; |
| 12 | `src/app/styles/accessibility.css:50` | `#063462` | border-color: #063462 !important; |
| 13 | `src/index.css:16` | `#ffffff` | --brand-fg: #ffffff; |
| 14 | `src/index.css:121` | `#FFFFFF` | --color-brand-fg: var(--brand-fg, #FFFFFF); |
| 15 | `src/index.css:158` | `#ea580c` | --color-brand-orange: #ea580c;    /* Deeper orange */ |
| 16 | `src/index.css:159` | `#2563eb` | --color-brand-blue: #2563eb;      /* Professional blue */ |
| 17 | `src/index.css:160` | `#0d9488` | --color-brand-turquoise: #0d9488; /* Richer turquoise */ |
| 18 | `src/index.css:219` | `#2563eb` | color: #2563eb; |
| 19 | `src/index.css:268` | `#ffffff` | [data-theme="white"] { background-color: #ffffff; } |
| 20 | `src/index.css:269` | `#f9fafb` | [data-theme="gray"] { background-color: #f9fafb; } |
| 21 | `src/index.css:271` | `#111827` | [data-theme="dark"] { background-color: #111827; color: #ffffff; } |
| 22 | `src/index.css:271` | `#ffffff` | [data-theme="dark"] { background-color: #111827; color: #ffffff; } |

---

## 7. HEX-инвентарь: Prototypes (низкий приоритет)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|
| 1 | `src/pages/app-prototype/model/constants.ts:12` | `#00D09C` | { id: 'start', name: 'Старт', discount: '3%', bg: 'bg-gradient-to-br from-[#00D09C] to-[#009E73]', text: 'text-white', badge: 'bg-white/20 t |
| 2 | `src/pages/app-prototype/model/constants.ts:12` | `#009E73` | { id: 'start', name: 'Старт', discount: '3%', bg: 'bg-gradient-to-br from-[#00D09C] to-[#009E73]', text: 'text-white', badge: 'bg-white/20 t |
| 3 | `src/pages/app-prototype/model/constants.ts:13` | `#E2E8F0` | { id: 'comfort', name: 'Комфорт', discount: '5%', bg: 'bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1]', text: 'text-gray-900', badge: 'bg-gra |
| 4 | `src/pages/app-prototype/model/constants.ts:13` | `#CBD5E1` | { id: 'comfort', name: 'Комфорт', discount: '5%', bg: 'bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1]', text: 'text-gray-900', badge: 'bg-gra |
| 5 | `src/pages/app-prototype/model/constants.ts:14` | `#FDE68A` | { id: 'premium', name: 'Премиум', discount: '7%', bg: 'bg-gradient-to-br from-[#FDE68A] to-[#D97706]', text: 'text-amber-900', badge: 'bg-am |
| 6 | `src/pages/app-prototype/model/constants.ts:14` | `#D97706` | { id: 'premium', name: 'Премиум', discount: '7%', bg: 'bg-gradient-to-br from-[#FDE68A] to-[#D97706]', text: 'text-amber-900', badge: 'bg-am |
| 7 | `src/pages/app-prototype/model/constants.ts:15` | `#D4AF37` | { id: 'vip', name: 'VIP', discount: '10%', bg: 'bg-gradient-to-br from-gray-900 to-black', text: 'text-white', badge: 'bg-[#D4AF37]/20 text- |
| 8 | `src/pages/app-prototype/model/constants.ts:15` | `#D4AF37` | { id: 'vip', name: 'VIP', discount: '10%', bg: 'bg-gradient-to-br from-gray-900 to-black', text: 'text-white', badge: 'bg-[#D4AF37]/20 text- |
| 9 | `src/pages/app-prototype/ui/components/DoctorProfileScreen.tsx:92` | `#F5F7F9` | <div className="h-full flex flex-col bg-[#F5F7F9] absolute inset-0 z-20"> |
| 10 | `src/pages/app-prototype/ui/components/DoctorProfileScreen.tsx:140` | `#00BFA5` | <span key={i} className={`text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium border ${isPromo ? 'bg-brand-violet text- |
| 11 | `src/pages/app-prototype/ui/components/DoctorProfileScreen.tsx:140` | `#00BFA5` | <span key={i} className={`text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium border ${isPromo ? 'bg-brand-violet text- |
| 12 | `src/pages/app-prototype/ui/components/DoctorProfileScreen.tsx:140` | `#00BFA5` | <span key={i} className={`text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium border ${isPromo ? 'bg-brand-violet text- |
| 13 | `src/pages/app-prototype/ui/components/DoctorsScreen.tsx:73` | `#F5F7F9` | <div className="h-full flex flex-col bg-[#F5F7F9]"> |
| 14 | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx:40` | `#38b2ac` | <div className="w-full aspect-[1.6] bg-gradient-to-tr from-[#38b2ac] to-[#81e6d9] rounded-3xl shadow-lg relative overflow-hidden mb-6"> |
| 15 | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx:40` | `#81e6d9` | <div className="w-full aspect-[1.6] bg-gradient-to-tr from-[#38b2ac] to-[#81e6d9] rounded-3xl shadow-lg relative overflow-hidden mb-6"> |
| 16 | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx:51` | `#ff5252` | <div className="w-2 h-2 bg-[#ff5252] rounded-full"></div> |
| 17 | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx:52` | `#4caf50` | <div className="w-2 h-2 bg-[#4caf50] rounded-full"></div> |
| 18 | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx:53` | `#9c27b0` | <div className="w-2 h-2 bg-[#9c27b0] rounded-full"></div> |
| 19 | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx:54` | `#ff9800` | <div className="w-2 h-2 bg-[#ff9800] rounded-full"></div> |
| 20 | `src/pages/app-prototype/ui/components/LoyaltyCard.tsx:62` | `#D4AF37` | <button className="bg-[#D4AF37] text-black px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg flex flex-col items-center justify-center gap- |
| 21 | `src/pages/app-prototype/ui/components/ProfileScreen.tsx:14` | `#F5F7F9` | <div className="h-full flex flex-col bg-[#F5F7F9]"> |
| 22 | `src/pages/app-prototype/ui/components/ReferralModal.tsx:60` | `#25D366` | <button className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow |
| 23 | `src/pages/app-prototype/ui/components/ReferralModal.tsx:60` | `#25D366` | <button className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow |
| 24 | `src/pages/sandbox/SandboxPage.tsx:48` | `#f8fafc` | <div className="min-h-screen bg-[#f8fafc] pb-20 w-full overflow-x-hidden"> |

---

## 8. HEX-инвентарь: Dev Tools (не продакшн)

| # | Файл:строка | HEX | Контекст |
|---|-------------|-----|----------|
| 1 | `src/admin/DiagnosticTools.tsx:628` | `#0f172a` | <div className="flex-1 bg-[#0f172a] rounded-xl p-4 overflow-auto max-h-[600px] shadow-inner"> |
| 2 | `src/widgets/marketing-control-panel/ui/components/SiteNodeMap.tsx:68` | `#CBD5E1` | <path d="M 50% 40 L 50% 120" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" fill="none" /> |
| 3 | `src/widgets/marketing-control-panel/ui/components/SiteNodeMap.tsx:71` | `#CBD5E1` | <path d="M 15% 220 L 85% 220" stroke="#CBD5E1" strokeWidth="2" fill="none" /> |
| 4 | `src/widgets/marketing-control-panel/ui/components/SiteNodeMap.tsx:74` | `#CBD5E1` | <path d="M 15% 220 L 15% 260" stroke="#CBD5E1" strokeWidth="2" fill="none" /> |
| 5 | `src/widgets/marketing-control-panel/ui/components/SiteNodeMap.tsx:75` | `#CBD5E1` | <path d="M 50% 220 L 50% 260" stroke="#CBD5E1" strokeWidth="2" fill="none" /> |
| 6 | `src/widgets/marketing-control-panel/ui/components/SiteNodeMap.tsx:76` | `#CBD5E1` | <path d="M 85% 220 L 85% 260" stroke="#CBD5E1" strokeWidth="2" fill="none" /> |
| 7 | `src/widgets/marketing-control-panel/ui/components/SiteNodeMap.tsx:78` | `#CBD5E1` | <path d="M 50% 160 L 50% 220" stroke="#CBD5E1" strokeWidth="2" fill="none" /> |
| 8 | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx:6` | `#4CAF50` | { id: 'green', name: 'Источник (Классика)', hex: '#4CAF50' }, |
| 9 | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx:7` | `#03A9F4` | { id: 'blue', name: 'Медицина (Доверие)', hex: '#03A9F4' }, |
| 10 | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx:8` | `#673AB7` | { id: 'purple', name: 'Премиум (Уверенность)', hex: '#673AB7' }, |
| 11 | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx:9` | `#E91E63` | { id: 'rose', name: 'Забота (Теплота)', hex: '#E91E63' }, |
| 12 | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx:96` | `#e5e7eb` | { id: 'none', shadow: 'none', border: '1px solid #e5e7eb' }, |
| 13 | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx:99` | `#d1d5db` | { id: 'bordered', shadow: 'none', border: '1px solid #d1d5db' }, |
| 14 | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx:100` | `#000` | { id: 'neo', shadow: '4px 4px 0px 0px rgba(0,0,0,0.9)', border: '2px solid #000' } |
| 15 | `src/widgets/marketing-control-panel/ui/tabs/MarketingTab.tsx:158` | `#E91E63` | className={`flex-1 py-2.5 text-xs font-bold transition-all rounded-md flex flex-col items-center gap-1 ${store.urgencyLevel === s.id ? 'bg-w |

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
| `#000` | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx` |
| `#000000` | `src/app/styles/accessibility.css`, `src/widgets/accessibility/ui/AccessibilityPanel.tsx` |
| `#005bff` | `src/pages/service/ui/ServicePage.tsx` |
| `#0077ff` | `src/widgets/footer/ui/Footer.tsx` |
| `#0083ca` | `src/pages/doctor/ui/DoctorPage.tsx` |
| `#009e73` | `src/pages/app-prototype/model/constants.ts` |
| `#00bfa5` | `src/pages/app-prototype/ui/components/DoctorProfileScreen.tsx` |
| `#00d09c` | `src/pages/app-prototype/model/constants.ts` |
| `#03a9f4` | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx` |
| `#063462` | `src/app/styles/accessibility.css`, `src/widgets/accessibility/ui/AccessibilityPanel.tsx` |
| `#0d9488` | `src/index.css` |
| `#0f172a` | `src/admin/DiagnosticTools.tsx`, `src/widget/BookingWidget.tsx` |
| `#111827` | `src/app/providers/ThemeProvider.tsx`, `src/index.css`, `src/widgets/hero-widget/ui/HeroVariantC.tsx` |
| `#121212` | `src/widgets/hero-widget/ui/HeroImmersive.tsx` |
| `#1a1a1a` | `src/pages/service/ui/ServicePage.tsx` |
| `#1b5e20` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#2563eb` | `src/index.css` |
| `#25d366` | `src/pages/app-prototype/ui/components/ReferralModal.tsx` |
| `#2b8a3e` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#2c2c2c` | `src/widgets/header/ui/Header.tsx` |
| `#2d762d` | `src/pages/service/ui/ServicePage.tsx` |
| `#348834` | `src/pages/service/ui/ServicePage.tsx` |
| `#38b2ac` | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx` |
| `#3e9f3e` | `src/pages/service/ui/ServicePage.tsx` |
| `#429a2e` | `src/app/providers/ThemeProvider.tsx` |
| `#4caf50` | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx`, `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx` |
| `#64748b` | `src/widget/BookingWidget.tsx` |
| `#673ab7` | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx` |
| `#7c3aed` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#81e6d9` | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx` |
| `#9c27b0` | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx` |
| `#9dd1ff` | `src/app/styles/accessibility.css`, `src/widgets/accessibility/ui/AccessibilityPanel.tsx` |
| `#a4c516` | `src/pages/doctor/ui/DoctorPage.tsx` |
| `#a5d6a7` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#b45a8c` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#c9b8f0` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#cbd5e1` | `src/pages/app-prototype/model/constants.ts`, `src/widgets/marketing-control-panel/ui/components/SiteNodeMap.tsx` |
| `#d1d5db` | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx` |
| `#d4af37` | `src/pages/app-prototype/model/constants.ts`, `src/pages/app-prototype/ui/components/LoyaltyCard.tsx` |
| `#d97706` | `src/pages/app-prototype/model/constants.ts` |
| `#e0e0e0` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#e2e8f0` | `src/pages/app-prototype/model/constants.ts`, `src/widget/BookingWidget.tsx` |
| `#e5e7eb` | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx` |
| `#e8f5e9` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#e91e63` | `src/widgets/marketing-control-panel/ui/tabs/IntegratorTab.tsx`, `src/widgets/marketing-control-panel/ui/tabs/MarketingTab.tsx` |
| `#ea580c` | `src/index.css` |
| `#ee8208` | `src/widgets/footer/ui/Footer.tsx` |
| `#ef4444` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#f0ebfa` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#f1f5f9` | `src/widget/BookingWidget.tsx` |
| `#f4f5f7` | `src/pages/doctor/ui/DoctorPage.tsx` |
| `#f5f7f9` | `src/pages/app-prototype/ui/components/DoctorProfileScreen.tsx`, `src/pages/app-prototype/ui/components/DoctorsScreen.tsx`, `src/pages/app-prototype/ui/components/ProfileScreen.tsx` |
| `#f8fafc` | `src/pages/events/ui/EventDetailsPage.tsx`, `src/pages/sandbox/SandboxPage.tsx`, `src/widget/BookingWidget.tsx` |
| `#f97316` | `src/widgets/hero-widget/config/heroTheme.ts` |
| `#f9fafb` | `src/index.css` |
| `#fde68a` | `src/pages/app-prototype/model/constants.ts` |
| `#ff0000` | `src/pages/doctor/ui/DoctorPage.tsx` |
| `#ff5252` | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx` |
| `#ff9800` | `src/pages/app-prototype/ui/components/GiftCertificateModal.tsx` |
| `#ffffff` | `src/app/providers/ThemeProvider.tsx`, `src/app/styles/accessibility.css`, `src/index.css`, `src/widget/BookingWidget.tsx`, `src/widgets/accessibility/ui/AccessibilityPanel.tsx`, `src/widgets/hero-widget/ui/HeroVariantC.tsx` |

---

## 11. Arbitrary Tailwind colors (не HEX, но кастом)

Примеры: `text-[#2C2C2C]`, `bg-[var(--color-text-primary,#111827)]`, `shadow-[0_8px_32px_…]`

| Tier | Кол-во |
|------|--------|
| foundation | 6 |
| production-widgets | 75 |
| production-pages | 45 |
| shared-ui | 10 |
| prototype | 84 |
| dev-tools | 105 |
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
| 7 | `src/pages/doctor/ui/DoctorPage.tsx:214` | `bg-[#f4f5f7]` | <div className="w-full md:w-2/5 lg:w-1/3 bg-[#f4f5f7] relative border-b md:borde |
| 8 | `src/pages/doctor/ui/DoctorPage.tsx:218` | `bg-[#f4f5f7]` | <div className="aspect-[4/5] sm:aspect-square md:aspect-[3/4] w-full relative ov |
| 9 | `src/pages/doctor/ui/DoctorPage.tsx:248` | `text-[1rem]` | <div className="text-gray-600 text-[1rem] md:text-xl mb-5 leading-relaxed max-w- |
| 10 | `src/pages/doctor/ui/DoctorPage.tsx:309` | `bg-[#0083CA]` | { source: 'ПроДокторов', rating: 4.9, count: 128, color: 'bg-[#0083CA]', bg: 'bg |
| 11 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `bg-[#A4C516]` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C51 |
| 12 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `bg-[#A4C516]` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C51 |
| 13 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `bg-[#A4C516]` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C51 |
| 14 | `src/pages/doctor/ui/DoctorPage.tsx:310` | `border-[#A4C516]` | { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C51 |
| 15 | `src/pages/doctor/ui/DoctorPage.tsx:311` | `bg-[#FF0000]` | { source: 'Яндекс', rating: 4.8, count: 89, color: 'bg-[#FF0000]', bg: 'bg-red-5 |
| 16 | `src/pages/doctor/ui/DoctorPage.tsx:338` | `shadow-[0_8px_30px_rgb(0,0,0,0.04)]` | <Card className="p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray |
| 17 | `src/pages/doctor/ui/DoctorPage.tsx:440` | `border-[4px]` | <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-[4px] border |
| 18 | `src/pages/doctor/ui/DoctorPage.tsx:517` | `shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]` | <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl b |
| 19 | `src/pages/doctor/ui/DoctorPage.tsx:521` | `text-[10px]` | <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">П |
| 20 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:92` | `text-[10px]` | <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracki |
| 21 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:111` | `text-[10px]` | <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracki |
| 22 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:170` | `shadow-[0_-10px_40px_rgba(0,0,0,0.1)]` | <Card className="fixed md:absolute z-50 bottom-0 left-0 right-0 md:bottom-auto m |
| 23 | `src/pages/doctors/ui/components/DoctorsFilterBar.tsx:194` | `text-[15px]` | <span className="truncate pr-4 text-[15px] md:text-base">{spec}</span> |
| 24 | `src/pages/service/ui/ServicePage.tsx:258` | `text-[46px]` | <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-extrabold text-[#1a1a1a] |
| 25 | `src/pages/service/ui/ServicePage.tsx:258` | `text-[#1a1a1a]` | <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-extrabold text-[#1a1a1a] |
| 26 | `src/pages/service/ui/ServicePage.tsx:265` | `text-[17px]` | <p className="text-base sm:text-[17px] text-gray-600 leading-[1.6] mb-5"> |
| 27 | `src/pages/service/ui/ServicePage.tsx:268` | `text-[17px]` | <p className="text-base sm:text-[17px] text-gray-600 leading-[1.6] mb-8"> |
| 28 | `src/pages/service/ui/ServicePage.tsx:275` | `bg-[#3e9f3e]` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover |
| 29 | `src/pages/service/ui/ServicePage.tsx:275` | `bg-[#348834]` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover |
| 30 | `src/pages/service/ui/ServicePage.tsx:275` | `bg-[#2d762d]` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover |
| 31 | `src/pages/service/ui/ServicePage.tsx:275` | `text-[13px]` | className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover |
| 32 | `src/pages/service/ui/ServicePage.tsx:286` | `text-[44px]` | <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div |
| 33 | `src/pages/service/ui/ServicePage.tsx:286` | `text-[#1a1a1a]` | <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div |
| 34 | `src/pages/service/ui/ServicePage.tsx:287` | `text-[15px]` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1 |
| 35 | `src/pages/service/ui/ServicePage.tsx:287` | `text-[13px]` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1 |
| 36 | `src/pages/service/ui/ServicePage.tsx:287` | `text-[#1a1a1a]` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1 |
| 37 | `src/pages/service/ui/ServicePage.tsx:292` | `text-[44px]` | <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div |
| 38 | `src/pages/service/ui/ServicePage.tsx:292` | `text-[#1a1a1a]` | <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div |
| 39 | `src/pages/service/ui/ServicePage.tsx:293` | `text-[15px]` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1 |
| 40 | `src/pages/service/ui/ServicePage.tsx:293` | `text-[13px]` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1 |
| 41 | `src/pages/service/ui/ServicePage.tsx:293` | `text-[#1a1a1a]` | <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1 |
| 42 | `src/pages/service/ui/ServicePage.tsx:294` | `text-[#005bff]` | Средний рейтинг<br/>врачей на <span className="text-[#005bff]">prodoctorov</span |
| 43 | `src/pages/service/ui/ServicePage.tsx:301` | `text-[13px]` | {renderPlatformBadge("yandex")} <span className="text-[13px] text-gray-700 font- |
| 44 | `src/pages/service/ui/ServicePage.tsx:301` | `text-[#1a1a1a]` | {renderPlatformBadge("yandex")} <span className="text-[13px] text-gray-700 font- |
| 45 | `src/pages/service/ui/ServicePage.tsx:304` | `text-[13px]` | {renderPlatformBadge("2gis")} <span className="text-[13px] text-gray-700 font-se |
| 46 | `src/pages/service/ui/ServicePage.tsx:304` | `text-[#1a1a1a]` | {renderPlatformBadge("2gis")} <span className="text-[13px] text-gray-700 font-se |
| 47 | `src/pages/service/ui/ServicePage.tsx:307` | `text-[#005bff]` | <span className="text-[#005bff] font-bold text-[13px] ml-1">prodoctorov</span> < |
| 48 | `src/pages/service/ui/ServicePage.tsx:307` | `text-[13px]` | <span className="text-[#005bff] font-bold text-[13px] ml-1">prodoctorov</span> < |
| 49 | `src/pages/service/ui/ServicePage.tsx:307` | `text-[#1a1a1a]` | <span className="text-[#005bff] font-bold text-[13px] ml-1">prodoctorov</span> < |
| 50 | `src/pages/service/ui/ServicePage.tsx:762` | `shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]` | <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl b |
| 51 | `src/pages/service/ui/ServicePage.tsx:764` | `text-[10px]` | <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold"> |
| 52 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:30` | `bg-[conic-gradient(from_0deg,transparent_0_270deg,currentColor_360deg)]` | className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_270deg,curre |
| 53 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:113` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight relative z-10">{item.lab |
| 54 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:139` | `text-[10px]` | <span className="text-[10px] font-bold tracking-tight relative z-10">{item.label |
| 55 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:153` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight">{item.label}</span> |
| 56 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:178` | `border-[1.5px]` | isActive ? 'bg-brand text-brand-fg shadow-brand/30 scale-105' : 'bg-white text-b |
| 57 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:183` | `text-[10px]` | <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive ? 'text-b |
| 58 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:199` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight">{item.label}</span> |
| 59 | `src/widgets/bottom-nav/ui/BottomNavVariants.tsx:243` | `text-[10px]` | <span className="text-[10px] font-medium tracking-tight">{item.label}</span> |
| 60 | `src/widgets/categories-widget/ui/CategoriesVariants.tsx:60` | `shadow-[var(--app-shadow)]` | className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-4 shadow |
| 61 | `src/widgets/categories-widget/ui/CategoriesVariants.tsx:106` | `shadow-[var(--app-shadow)]` | className="bg-white p-6 md:p-8 shadow-[var(--app-shadow)] flex flex-col items-st |
| 62 | `src/widgets/categories-widget/ui/CategoriesVariants.tsx:159` | `text-[10.5px]` | <span className="mt-2.5 text-[10.5px] sm:text-xs md:text-sm font-semibold text-g |
| 63 | `src/widgets/city-selector/ui/CitySelectorModal.tsx:48` | `text-[15px]` | <span className={`text-[15px] font-bold ${cityRegion === city ? 'text-brand' : ' |
| 64 | `src/widgets/footer/ui/Footer.tsx:28` | `bg-[#0077FF]` | <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-cent |
| 65 | `src/widgets/footer/ui/Footer.tsx:34` | `bg-[#EE8208]` | <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-cent |
| 66 | `src/widgets/footer/ui/Footer.tsx:187` | `text-[10px]` | <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Загру |
| 67 | `src/widgets/footer/ui/Footer.tsx:194` | `text-[10px]` | <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Досту |
| 68 | `src/widgets/header/ui/Header.tsx:45` | `shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)]` | "md:border-white/55 md:shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)]", |
| 69 | `src/widgets/header/ui/Header.tsx:87` | `text-[19px]` | className={`font-black text-[19px] leading-none tracking-wide transition-colors  |
| 70 | `src/widgets/header/ui/Header.tsx:87` | `text-[#2C2C2C]` | className={`font-black text-[19px] leading-none tracking-wide transition-colors  |
| 71 | `src/widgets/header/ui/Header.tsx:95` | `text-[7.5px]` | className={`font-bold text-[7.5px] leading-none transition-colors ${isTransparen |
| 72 | `src/widgets/header/ui/Header.tsx:95` | `text-[#2C2C2C]` | className={`font-bold text-[7.5px] leading-none transition-colors ${isTransparen |
| 73 | `src/widgets/header/ui/Header.tsx:121` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 74 | `src/widgets/header/ui/Header.tsx:127` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 75 | `src/widgets/header/ui/Header.tsx:133` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 76 | `src/widgets/header/ui/Header.tsx:139` | `text-[16px]` | className={`text-[16px] font-medium transition-colors hover:text-brand ${isTrans |
| 77 | `src/widgets/header/ui/Header.tsx:149` | `text-[16px]` | className={`text-[16px] font-bold transition-colors hidden lg:block mr-2 hover:t |
| 78 | `src/widgets/header/ui/ServicesMegaMenu.tsx:48` | `text-[16px]` | className={`text-[16px] font-medium transition-colors py-2 ${isOpen ? 'text-bran |
| 79 | `src/widgets/header/ui/ServicesMegaMenu.tsx:63` | `shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]` | <Card className="p-0 shadow-xl overflow-hidden flex max-h-[70vh] md:bg-white/65  |
| 80 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:283` | `text-[11px]` | className="absolute top-24 lg:top-28 right-6 lg:right-10 z-20 text-white text-[1 |
| 81 | `src/widgets/hero-widget/ui/HeroDesktopVariants.tsx:306` | `text-[15px]` | <p className="text-[15px] text-white/[0.82] leading-relaxed max-w-xl mb-6 sm:mb- |
| 82 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:127` | `border-[#121212]` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src |
| 83 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:128` | `border-[#121212]` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src |
| 84 | `src/widgets/hero-widget/ui/HeroImmersive.tsx:129` | `border-[#121212]` | <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src |
| 85 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:60` | `text-[10px]` | <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10p |
| 86 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:86` | `text-[10px]` | <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10p |
| 87 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:115` | `text-[9px]` | <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] |
| 88 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:115` | `text-[10px]` | <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] |
| 89 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:118` | `text-[26px]` | <h2 className="text-[26px] leading-[1.1] min-[400px]:text-3xl sm:text-4xl font-b |
| 90 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:121` | `text-[13px]` | <p className="text-white/90 text-xs sm:text-[13px] max-w-[280px] leading-snug dr |
| 91 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:126` | `text-[15px]` | <Button as={Link} to={slide.link} className="bg-white text-black hover:bg-gray-1 |
| 92 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:133` | `text-[10px]` | <span className="text-[10px] uppercase tracking-widest font-bold mb-1">Свайп</sp |
| 93 | `src/widgets/hero-widget/ui/HeroSection.tsx:171` | `text-[17px]` | <h2 className="text-[17px] font-bold text-gray-900 leading-tight">Запись на приё |
| 94 | `src/widgets/hero-widget/ui/HeroSection.tsx:172` | `text-[13px]` | <p className="text-[13px] text-gray-500 mt-0.5 leading-tight">В клинику или онла |
| 95 | `src/widgets/hero-widget/ui/HeroSection.tsx:176` | `shadow-[0_4px_12px_rgba(34,197,94,0.2)]` | <Button as={Link} to="/booking" variant="primary" className="flex-1 shadow-[0_4p |
| 96 | `src/widgets/hero-widget/ui/HeroSection.tsx:176` | `shadow-[0_6px_16px_rgba(34,197,94,0.3)]` | <Button as={Link} to="/booking" variant="primary" className="flex-1 shadow-[0_4p |
| 97 | `src/widgets/hero-widget/ui/HeroSection.tsx:176` | `text-[15px]` | <Button as={Link} to="/booking" variant="primary" className="flex-1 shadow-[0_4p |
| 98 | `src/widgets/hero-widget/ui/HeroSection.tsx:179` | `text-[15px]` | <Button variant="outline" className="flex-[0.8] bg-white border-gray-200 text-gr |
| 99 | `src/widgets/hero-widget/ui/HeroSection.tsx:222` | `shadow-[0_0_8px_rgba(255,255,255,0.8)]` | className={`w-1.5 rounded-full transition-all duration-theme ${idx === currentSl |
| 100 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:99` | `text-[10px]` | 'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold track |
| 101 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:132` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium px-6 h-10 shadow-md" |
| 102 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:178` | `text-[11px]` | <p className="text-[11px] text-gray-500 mb-2">{card.specialization}</p> |
| 103 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:202` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5" |
| 104 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:236` | `text-[10px]` | className="text-[10px] font-medium tracking-[0.08em] uppercase mb-2" |
| 105 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:250` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5 w-fit" |
| 106 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:258` | `text-[var(--color-text-primary,#111827)]` | <h3 className="text-base font-medium text-[var(--color-text-primary,#111827)] le |
| 107 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:279` | `text-[13px]` | className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5 w-fit mt-3 |
| 108 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:105` | `text-[15px]` | className="w-full bg-transparent pl-9 pr-4 py-2 text-[15px] outline-none placeho |
| 109 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:162` | `text-[13px]` | className="px-3 py-1.5 bg-gray-100/80 hover:bg-gray-200 text-gray-600 rounded-fu |
| 110 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:175` | `text-[11px]` | <div className="px-2 py-2 text-[11px] font-bold text-gray-400 uppercase tracking |
| 111 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:192` | `text-[15px]` | <div className="font-bold text-gray-900 text-[15px] truncate">{doctor.name}</div |
| 112 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:193` | `text-[13px]` | <div className="text-[13px] text-gray-500 truncate mt-0.5">{doctor.specialty}</d |
| 113 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:200` | `text-[14px]` | className="w-full p-3 mt-2 text-[14px] text-brand font-semibold text-center hove |
| 114 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:207` | `text-[15px]` | <p className="text-[15px] text-gray-500">По запросу «{searchQuery}» ничего не на |
| 115 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:224` | `text-[17px]` | className="flex-1 py-3 px-4 font-bold text-[17px] text-gray-900 hover:bg-gray-50 |
| 116 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:269` | `text-[16px]` | className="block py-2.5 px-3 text-[16px] font-medium text-gray-600 hover:text-br |
| 117 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:289` | `text-[17px]` | className="flex items-center justify-center w-full py-3.5 bg-brand text-brand-fg |
| 118 | `src/widgets/mobile-menu/ui/MobileMenu.tsx:300` | `text-[19px]` | <span className="text-gray-900 font-extrabold text-[19px] tracking-tight whitesp |
| 119 | `src/widgets/portfolio-widget/ui/PortfolioWidget.tsx:138` | `shadow-[0_0_10px_rgba(0,0,0,0.5)]` | className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_ |
| 120 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:152` | `text-[9px]` | <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider te |
| 121 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:152` | `text-[10px]` | <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider te |
| 122 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:413` | `text-[10px]` | <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 le |
| 123 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:511` | `text-[9px]` | <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt- |
| 124 | `src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx:637` | `text-[10px]` | <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 le |
| 125 | `src/widgets/reviews-widget/ui/ReviewsWidgetVariants.tsx:47` | `text-[10px]` | "text-[10px] font-semibold px-2 py-0.5 rounded-full border", |
| 126 | `src/widgets/timeline-widget/ui/TimelineWidgetVariants.tsx:38` | `border-[4px]` | "w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-full flex items-center justify-cente |

---

## 12. Arbitrary размеры — топ повторяющихся (production tier)

| Класс | Вхождений |
|-------|-----------|
| `text-[10px]` | 27 |
| `text-[13px]` | 14 |
| `text-[15px]` | 11 |
| `leading-[1.15]` | 9 |
| `text-[16px]` | 7 |
| `h-[100svh]` | 6 |
| `text-[11px]` | 6 |
| `leading-[1.1]` | 5 |
| `text-[17px]` | 5 |
| `min-h-[200px]` | 4 |
| `min-h-[400px]` | 4 |
| `rounded-[30px]` | 4 |
| `w-[280px]` | 4 |
| `h-[140px]` | 4 |
| `max-w-[150px]` | 4 |
| `min-h-[160px]` | 3 |
| `rounded-[32px]` | 3 |
| `tracking-[0.08em]` | 3 |
| `text-[9px]` | 3 |
| `min-h-[380px]` | 3 |
| `w-[320px]` | 3 |
| `w-[400px]` | 3 |
| `max-w-[120px]` | 2 |
| `max-h-[70vh]` | 2 |
| `w-[340px]` | 2 |
| `text-[19px]` | 2 |
| `min-h-[460px]` | 2 |
| `w-[50%]` | 2 |
| `w-[100vw]` | 2 |
| `max-w-[200px]` | 2 |
| `min-h-[480px]` | 2 |
| `pt-[80px]` | 2 |
| `mt-[80px]` | 2 |
| `mt-[96px]` | 2 |
| `min-h-[260px]` | 2 |
| `w-[52px]` | 2 |
| `h-[52px]` | 2 |
| `min-w-[260px]` | 2 |
| `w-[85vw]` | 2 |
| `h-[60vh]` | 2 |

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
| 24 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:35` | `min-h-[160px]` |
| 25 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:35` | `max-h-[180px]` |
| 26 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:36` | `h-[100%]` |
| 27 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:42` | `max-w-[200px]` |
| 28 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:60` | `text-[10px]` |
| 29 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:63` | `leading-[1.15]` |
| 30 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:79` | `min-h-[440px]` |
| 31 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:79` | `min-h-[480px]` |
| 32 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:80` | `h-[60%]` |
| 33 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:83` | `mt-[45%]` |
| 34 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:86` | `text-[10px]` |
| 35 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:90` | `leading-[1.10]` |
| 36 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:106` | `h-[100svh]` |
| 37 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:106` | `pb-[100px]` |
| 38 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:106` | `pt-[80px]` |
| 39 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:112` | `max-w-[400px]` |
| 40 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:115` | `text-[9px]` |
| 41 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:115` | `text-[10px]` |
| 42 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:118` | `text-[26px]` |
| 43 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:118` | `leading-[1.1]` |
| 44 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:121` | `text-[13px]` |
| 45 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:121` | `max-w-[280px]` |
| 46 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:126` | `min-h-[48px]` |
| 47 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:126` | `text-[15px]` |
| 48 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:132` | `bottom-[80px]` |
| 49 | `src/widgets/hero-widget/ui/HeroMobileVariants.tsx:133` | `text-[10px]` |
| 50 | `src/widgets/hero-widget/ui/HeroPromoProgress.tsx:21` | `h-[3px]` |
| 51 | `src/widgets/hero-widget/ui/HeroSection.tsx:87` | `min-h-[420px]` |
| 52 | `src/widgets/hero-widget/ui/HeroSection.tsx:87` | `min-h-[480px]` |
| 53 | `src/widgets/hero-widget/ui/HeroSection.tsx:87` | `min-h-[500px]` |
| 54 | `src/widgets/hero-widget/ui/HeroSection.tsx:154` | `h-[100svh]` |
| 55 | `src/widgets/hero-widget/ui/HeroSection.tsx:154` | `mt-[80px]` |
| 56 | `src/widgets/hero-widget/ui/HeroSection.tsx:154` | `mt-[96px]` |
| 57 | `src/widgets/hero-widget/ui/HeroSection.tsx:171` | `text-[17px]` |
| 58 | `src/widgets/hero-widget/ui/HeroSection.tsx:172` | `text-[13px]` |
| 59 | `src/widgets/hero-widget/ui/HeroSection.tsx:176` | `text-[15px]` |
| 60 | `src/widgets/hero-widget/ui/HeroSection.tsx:179` | `text-[15px]` |
| 61 | `src/widgets/hero-widget/ui/HeroSection.tsx:189` | `h-[100svh]` |
| 62 | `src/widgets/hero-widget/ui/HeroSection.tsx:195` | `h-[100svh]` |
| 63 | `src/widgets/hero-widget/ui/HeroSection.tsx:195` | `w-[calc(100vw-32px)]` |
| 64 | `src/widgets/hero-widget/ui/HeroSlideDots.tsx:33` | `rounded-[4px]` |
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
| 84 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:323` | `min-h-[380px]` |
| 85 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:334` | `min-h-[380px]` |
| 86 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:346` | `min-h-[260px]` |
| 87 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:346` | `h-[260px]` |
| 88 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:349` | `min-w-[260px]` |
| 89 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:349` | `min-h-[200px]` |
| 90 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:350` | `min-w-[260px]` |
| 91 | `src/widgets/hero-widget/ui/HeroVariantC.tsx:350` | `min-h-[200px]` |

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
| `src/widgets/bottom-nav/ui/BottomNavVariants.tsx` | 17 | `from-blue-500`, `via-purple-500`, `to-emerald-400`, `text-gray-400` |
| `src/widgets/features-widget/ui/FeaturesWidgetVariants.tsx` | 17 | `border-gray-100`, `bg-green-50`, `text-green-600`, `text-gray-900` |
| `src/widgets/header/ui/Header.tsx` | 16 | `border-gray-100/80`, `bg-gray-100`, `bg-gray-200`, `text-gray-700` |
| `src/widgets/showcase-widget/ui/variants/ShowcaseVariantClassic.tsx` | 15 | `text-gray-900`, `text-gray-800`, `text-gray-200`, `text-gray-600` |
| `src/widgets/hero-widget/ui/HeroSection.tsx` | 14 | `bg-gray-50`, `border-gray-100`, `bg-gray-200`, `bg-gray-50/50` |

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

*Сырые данные: `docs/plan/design_audit_raw.json` · Скрипт: `node scripts/design-audit.mjs`*