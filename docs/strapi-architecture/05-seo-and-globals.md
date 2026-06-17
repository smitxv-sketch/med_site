# Routing, SEO & Global Settings

Для управления глобальными элементами сайта (меню, футер) и метаданными, в Strapi используются Single Types (Единичные типы) и специальные компоненты.

## 1. Global Settings (Single Type)
Хранит настройки, которые применяются ко всему сайту.
*   `siteName` (String).
*   `defaultSeo` (Component: SEO) - метаданные по умолчанию.
*   `contactPhone` (String).
*   `contactEmail` (String).
*   `socialLinks` (Repeatable Component):
    *   `platform` (Enumeration: vk, telegram, whatsapp, youtube).
    *   `url` (String).
*   `appStoreLink` (String).
*   `googlePlayLink` (String).

## 2. Navigation / Menu (Single Type)
Управление главным меню и мега-меню.
*   `headerMenu` (Repeatable Component: MenuItem):
    *   `label` (String).
    *   `url` (String).
    *   `isMegaMenu` (Boolean) - открывать ли большое выпадающее меню.
    *   `children` (Repeatable Component: MenuItem) - подпункты.
*   `footerColumns` (Repeatable Component: FooterColumn):
    *   `title` (String) - Заголовок колонки (например, "О компании").
    *   `links` (Repeatable Component: MenuItem).

## 3. SEO Component (Переиспользуемый компонент)
Этот компонент должен быть добавлен в КАЖДУЮ коллекцию, которая имеет свою страницу (Page, Doctor, Service, Article).
*   `metaTitle` (String) - Title страницы (с ограничением ~60 символов).
*   `metaDescription` (Text) - Description (с ограничением ~160 символов).
*   `metaImage` (Media: Image) - Картинка для OpenGraph (когда ссылкой делятся в Telegram/VK).
*   `keywords` (Text) - опционально.
*   `canonicalUrl` (String) - опционально.
*   `preventIndexing` (Boolean) - добавить тег noindex.

## 4. Pages (Collection Type)
Коллекция для создания статических страниц (О клинике, Контакты, Правовая информация).
*   `title` (String).
*   `slug` (UID) - URL страницы (например, `about`, `privacy-policy`).
*   `seo` (Component: SEO).
*   `content` (Dynamic Zone) - конструктор страницы (см. Документ 04).

## Рекомендация для Strapi Architect:
Использовать плагин `strapi-plugin-seo` для удобного управления метаданными и генерации sitemap.xml.
