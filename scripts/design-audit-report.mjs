import fs from 'fs';

const data = JSON.parse(fs.readFileSync('docs/legacy/audits/design_audit_raw.json', 'utf8'));

const PRODUCTION_WIDGETS = [
  'hero-widget', 'header', 'footer', 'promotions-widget', 'directions-widget',
  'doctors-widget', 'reviews-widget', 'categories-widget', 'gallery-widget',
  'special-offers-widget', 'program-widget', 'showcase-widget', 'timeline-widget',
  'features-widget', 'locations-widget', 'faq-widget', 'bottom-nav', 'mobile-menu',
  'city-selector', 'events', 'calculator-widget', 'portfolio-widget', 'container-widget',
  'accessibility', 'header-widget', 'footer-widget',
];

const PROTOTYPE = ['app-prototype', 'travel-prototypes', 'auto-prototypes', 'sandbox', 'demo'];
const DEV_TOOLS = ['marketing-control-panel', 'admin', 'DiagnosticTools'];

function classify(file) {
  if (file.includes('src/widget/')) return 'booking-widget';
  if (DEV_TOOLS.some((d) => file.includes(d))) return 'dev-tools';
  if (PROTOTYPE.some((d) => file.includes(d))) return 'prototype';
  if (file.includes('src/pages/service/') || file.includes('src/pages/doctor/') || file.includes('src/pages/doctors/')) return 'production-pages';
  if (file.includes('src/pages/')) return 'other-pages';
  if (PRODUCTION_WIDGETS.some((w) => file.includes(`widgets/${w}`))) return 'production-widgets';
  if (file.includes('src/widgets/')) return 'other-widgets';
  if (file.includes('src/app/') || file === 'src/index.css' || file === 'src/App.tsx') return 'foundation';
  if (file.includes('src/shared/') || file.includes('src/components/') || file.includes('src/entities/')) return 'shared-ui';
  return 'other';
}

function groupBy(arr, keyFn) {
  const m = {};
  for (const item of arr) {
    const k = keyFn(item);
    (m[k] = m[k] || []).push(item);
  }
  return m;
}

const hexByTier = groupBy(data.results.hex, (r) => classify(r.file));
const arbByTier = groupBy(data.results.arb, (r) => classify(r.file));
const dimByTier = groupBy(data.results.dim, (r) => classify(r.file));

function tableHex(rows) {
  return rows
    .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
    .map((r, i) => `| ${i + 1} | \`${r.file}:${r.line}\` | \`${r.value}\` | ${r.context.replace(/\|/g, '\\|')} |`)
    .join('\n');
}

function summarizeDim(rows) {
  const freq = {};
  for (const r of rows) {
    const k = r.value;
    freq[k] = (freq[k] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([v, c]) => `| \`${v}\` | ${c} |`)
    .join('\n');
}

const lines = [];
lines.push('# Аудит дизайн-токенов · med_site');
lines.push('');
lines.push(`**Дата:** ${data.generatedAt.slice(0, 10)}`);
lines.push('**Статус:** Шаг 1 — только факты, без рекомендаций');
lines.push('**Следующий шаг:** вы заполняете `design_delta.md` (REPLACE / KEEP / DEFER)');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 1. Сводка');
lines.push('');
lines.push('| Зона | HEX-вхождений | Arbitrary color `[#…]` | Arbitrary размеры `[Npx]` | Файлов затронуто |');
lines.push('|------|---------------|------------------------|---------------------------|------------------|');
for (const [zone, s] of Object.entries(data.summary)) {
  lines.push(`| \`${zone}\` | ${s.hex} | ${s.arb} | ${s.dim} | ${s.files.length} |`);
}
lines.push('');
lines.push(`**Уникальных HEX-значений в коде:** ${data.uniqueHexCount}`);
lines.push('');
lines.push('### Классификация по приоритету ревизии');
lines.push('');
lines.push('| Tier | Описание | HEX | Arbitrary colors |');
lines.push('|------|----------|-----|------------------|');
for (const tier of ['foundation', 'production-widgets', 'production-pages', 'shared-ui', 'other-pages', 'other-widgets', 'prototype', 'dev-tools', 'booking-widget']) {
  const h = hexByTier[tier]?.length || 0;
  const a = arbByTier[tier]?.length || 0;
  lines.push(`| **${tier}** | | ${h} | ${a} |`);
}
lines.push('');
lines.push('> **booking-widget** (`src/widget/`) — зафиксирован отдельно. По правилам проекта: read-only, не трогать при ревизии сайта.');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 2. SSOT — официальные токены (эталон для Дельты)');
lines.push('');
lines.push('### `src/index.css` — CSS-переменные');
lines.push('');
lines.push('| Переменная | Значение | Назначение |');
lines.push('|------------|----------|------------|');
lines.push('| `--brand-h/s/l` | `155 / 80% / 40%` | Динамический бренд (зелёный) |');
lines.push('| `--brand-fg` | `#ffffff` | Цвет текста на бренде |');
lines.push('| `--accent-h/s/l` | `188 / 70% / 45%` | Акцент (ВРТ / violet) |');
lines.push('| `--app-radius` | `24px` | Скругление карточек |');
lines.push('| `--app-shadow` | `0 10px 40px rgba(0,0,0,0.05)` | Тень карточек |');
lines.push('| `--spacing-section` | `1.5rem` (24px) | Межсекционный отступ |');
lines.push('| `--color-brand-orange` | `#ea580c` | Оранжевый (детская) |');
lines.push('| `--color-brand-blue` | `#2563eb` | Синий (косметология) |');
lines.push('| `--color-brand-turquoise` | `#0d9488` | Бирюза (программы) |');
lines.push('');
lines.push('### `tailwind.config.js` — Tailwind-алиасы');
lines.push('');
lines.push('| Класс | Реальное значение |');
lines.push('|-------|-------------------|');
lines.push('| `brand` / `brand-green` | `hsl(var(--brand-h) var(--brand-s) var(--brand-l))` |');
lines.push('| `brand-violet` | `hsl(var(--accent-h) var(--accent-s) var(--accent-l))` |');
lines.push('| `brand-orange` | `#f97316` (хардкод в config) |');
lines.push('| `brand-blue` | `#3b82f6` (хардкод в config) |');
lines.push('| `brand-turquoise` | `#14b8a6` (хардкод в config) |');
lines.push('| `green-50…950` | Производные от `--brand-h` |');
lines.push('| `rounded-app` | `var(--app-radius)` |');
lines.push('| `spacing-section` | `var(--spacing-section)` |');
lines.push('');
lines.push('### `DESIGN_SYSTEM.md` — заявленные направления');
lines.push('');
lines.push('| Направление | Заявленный токен |');
lines.push('|-------------|------------------|');
lines.push('| ВРТ | `violet` / `brand-violet` |');
lines.push('| Поликлиника | `brand-green` |');
lines.push('| Детская | `brand-orange` |');
lines.push('| Косметология | `brand-blue` |');
lines.push('| Скорая | `red` |');
lines.push('| Программы | `brand-turquoise` |');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 3. Локальные конфиги с HEX (вне SSOT)');
lines.push('');
lines.push('### `src/widgets/hero-widget/config/heroTheme.ts`');
lines.push('');
lines.push('| Ключ | HEX / значение | UI-контекст |');
lines.push('|------|----------------|-------------|');
lines.push('| `brandGreen` | `#2b8a3e` | Зелёный бренд hero |');
lines.push('| `brandViolet` | `#7c3aed` | Фиолетовый ВРТ |');
lines.push('| `brandCosmo` | `#b45a8c` | Косметология hero |');
lines.push('| `vrtCardBg` | `#f0ebfa` | Фон ВРТ-карточки |');
lines.push('| `vrtCardBorder` | `#c9b8f0` | Бордер ВРТ-карточки |');
lines.push('| `cardBorder` | `#e0e0e0` | Бордер карточек |');
lines.push('| `discountBadge.bg/color/border` | `#e8f5e9` / `#1b5e20` / `#a5d6a7` | Бейдж скидки |');
lines.push('| `promoProgress.urgent/warning/neutral` | `#ef4444` / `#f97316` / `#7c3aed` | Прогресс-бар срочности |');
lines.push('| `borderRadius` | `16` (px) | Скругление карточек hero |');
lines.push('| `gridGap` | `16` (px) | Gap сетки |');
lines.push('| `gapToPromotionsDesktop` | `24` (px) | Отступ hero → Акции |');
lines.push('| `sliderMinHeightDesktop/Mobile` | `380` / `260` (px) | Мин. высота слайдера |');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 4. HEX-инвентарь: Production Widgets');
lines.push('');
lines.push('| # | Файл:строка | HEX | Контекст |');
lines.push('|---|-------------|-----|----------|');
lines.push(tableHex((hexByTier['production-widgets'] || []).concat(hexByTier['other-widgets'] || []).filter((r) => !r.file.includes('marketing-control-panel') && !r.file.includes('hero-widget/config'))));
lines.push('');
lines.push('### hero-widget (включая config)');
lines.push('');
lines.push('| # | Файл:строка | HEX | Контекст |');
lines.push('|---|-------------|-----|----------|');
lines.push(tableHex(data.results.hex.filter((r) => r.file.includes('hero-widget'))));
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 5. HEX-инвентарь: Production Pages');
lines.push('');
lines.push('| # | Файл:строка | HEX | Контекст |');
lines.push('|---|-------------|-----|----------|');
lines.push(tableHex(hexByTier['production-pages'] || []));
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 6. HEX-инвентарь: Foundation (app + index.css)');
lines.push('');
lines.push('| # | Файл:строка | HEX | Контекст |');
lines.push('|---|-------------|-----|----------|');
lines.push(tableHex(hexByTier['foundation'] || []));
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 7. HEX-инвентарь: Prototypes (низкий приоритет)');
lines.push('');
lines.push('| # | Файл:строка | HEX | Контекст |');
lines.push('|---|-------------|-----|----------|');
lines.push(tableHex(hexByTier['prototype'] || []));
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 8. HEX-инвентарь: Dev Tools (не продакшн)');
lines.push('');
lines.push('| # | Файл:строка | HEX | Контекст |');
lines.push('|---|-------------|-----|----------|');
lines.push(tableHex([...(hexByTier['dev-tools'] || []), ...(hexByTier['other'] || [])]));
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 9. HEX-инвентарь: Booking Widget (READ-ONLY)');
lines.push('');
lines.push('| # | Файл:строка | HEX | Контекст |');
lines.push('|---|-------------|-----|----------|');
lines.push(tableHex(hexByTier['booking-widget'] || []));
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 10. Уникальные HEX — сводная таблица');
lines.push('');
lines.push('| HEX | Где встречается (файлы) |');
lines.push('|-----|-------------------------|');
const hexFiles = groupBy(data.results.hex, (r) => r.value.toLowerCase());
for (const hex of data.uniqueHex) {
  const files = [...new Set(hexFiles[hex].map((r) => r.file))].sort();
  lines.push(`| \`${hex}\` | ${files.map((f) => `\`${f}\``).join(', ')} |`);
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 11. Arbitrary Tailwind colors (не HEX, но кастом)');
lines.push('');
lines.push('Примеры: `text-[#2C2C2C]`, `bg-[var(--color-text-primary,#111827)]`, `shadow-[0_8px_32px_…]`');
lines.push('');
lines.push('| Tier | Кол-во |');
lines.push('|------|--------|');
for (const tier of ['foundation', 'production-widgets', 'production-pages', 'shared-ui', 'prototype', 'dev-tools', 'booking-widget']) {
  lines.push(`| ${tier} | ${arbByTier[tier]?.length || 0} |`);
}
lines.push('');
lines.push('### Production — arbitrary colors (полный список)');
lines.push('');
lines.push('| # | Файл:строка | Класс | Контекст |');
lines.push('|---|-------------|-------|----------|');
const prodArb = [...(arbByTier['production-widgets'] || []), ...(arbByTier['production-pages'] || []), ...(arbByTier['foundation'] || [])]
  .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
prodArb.forEach((r, i) => {
  lines.push(`| ${i + 1} | \`${r.file}:${r.line}\` | \`${r.value}\` | ${r.context.replace(/\|/g, '\\|').slice(0, 80)} |`);
});
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 12. Arbitrary размеры — топ повторяющихся (production tier)');
lines.push('');
lines.push('| Класс | Вхождений |');
lines.push('|-------|-----------|');
const prodDim = [...(dimByTier['production-widgets'] || []), ...(dimByTier['production-pages'] || []), ...(dimByTier['foundation'] || []), ...(dimByTier['shared-ui'] || [])];
lines.push(summarizeDim(prodDim));
lines.push('');
lines.push('### hero-widget — все arbitrary размеры');
lines.push('');
lines.push('| # | Файл:строка | Класс |');
lines.push('|---|-------------|-------|');
data.results.dim
  .filter((r) => r.file.includes('hero-widget'))
  .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
  .forEach((r, i) => lines.push(`| ${i + 1} | \`${r.file}:${r.line}\` | \`${r.value}\` |`));
lines.push('');
lines.push('### header — все arbitrary размеры');
lines.push('');
lines.push('| # | Файл:строка | Класс |');
lines.push('|---|-------------|-------|');
data.results.dim
  .filter((r) => r.file.includes('widgets/header'))
  .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
  .forEach((r, i) => lines.push(`| ${i + 1} | \`${r.file}:${r.line}\` | \`${r.value}\` |`));
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 13. Использование DS-классов (brand / green / violet)');
lines.push('');
lines.push('Компоненты, уже на токенах (для справки — не требуют замены без Дельты):');
lines.push('');
const brandByFile = groupBy(data.results.brandClasses.filter((r) => classify(r.file) === 'production-widgets'), (r) => r.file);
const topBrandFiles = Object.entries(brandByFile)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 15);
lines.push('| Файл | DS-классов | Примеры |');
lines.push('|------|------------|---------|');
for (const [file, rows] of topBrandFiles) {
  const examples = [...new Set(rows.map((r) => r.value))].slice(0, 4).map((v) => `\`${v}\``).join(', ');
  lines.push(`| \`${file}\` | ${rows.length} | ${examples} |`);
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 14. Расхождения SSOT ↔ код (факты для Дельты)');
lines.push('');
lines.push('| Факт | SSOT говорит | Код использует |');
lines.push('|------|--------------|----------------|');
lines.push('| Зелёный бренд | `brand` = HSL `--brand-h:155` ≈ teal-green | `heroTheme.brandGreen` = `#2b8a3e` |');
lines.push('| ВРТ фиолетовый | `brand-violet` = HSL accent | `heroTheme.brandViolet` = `#7c3aed` (= Tailwind violet-600) |');
lines.push('| Оранжевый | `index.css` `#ea580c`, tailwind `#f97316` | Оба разных |');
lines.push('| Синий | `index.css` `#2563eb`, tailwind `#3b82f6` | Оба разных |');
lines.push('| Бирюза | `index.css` `#0d9488`, tailwind `#14b8a6` | Оба разных |');
lines.push('| Скругление | `--app-radius: 24px` | hero `borderRadius: 16`, кнопки `rounded-[30px]` |');
lines.push('| Текст логотипа | — | `#2C2C2C` (не gray-900) |');
lines.push('| CTA услуги | `bg-brand` | `#3e9f3e` / `#348834` / `#2d762d` |');
lines.push('| Фон карточки врача | `gray-50`? | `#f4f5f7` |');
lines.push('| VK hover | — | `#0077FF` |');
lines.push('| OK hover | — | `#EE8208` |');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 15. Шаблон Дельты (для заполнения)');
lines.push('');
lines.push('Создайте `docs/plan/design_delta.md` по образцу:');
lines.push('');
lines.push('```markdown');
lines.push('| Ref (аудит §) | Действие | Целевое значение | Примечание |');
lines.push('|---------------|----------|------------------|------------|');
lines.push('| §4 heroTheme.brandGreen | REPLACE | `brand` / token | |');
lines.push('| §7 app-prototype * | DEFER | — | не продакшн |');
lines.push('| §9 booking-widget * | KEEP | — | read-only |');
lines.push('```');
lines.push('');
lines.push('---');
lines.push('');
lines.push('*Сырые данные: `docs/legacy/audits/design_audit_raw.json` · Скрипт: `node scripts/design-audit.mjs`*');

fs.writeFileSync('docs/legacy/audits/design_audit.md', lines.join('\n'));
console.log('Written docs/legacy/audits/design_audit.md');
