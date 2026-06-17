# Dynamic Zones & Component Inventory (Конструктор страниц)

Чтобы реализовать Composable Architecture (когда маркетолог сам собирает страницы), в Strapi нужно создать набор Компонентов (Components) и объединить их в Динамическую Зону (Dynamic Zone), например, назвав ее `pageBuilder`.

Ниже перечислены компоненты, которые уже реализованы на фронтенде и должны иметь точное отражение в схеме Strapi.

## 1. Hero Section (Главный экран)
Компонент для верхнего блока страницы.
*   `variant` (Enumeration: immersive, classic).
*   `title` (String) - Главный заголовок (H1).
*   `subtitle` (String) - Опциональный надзаголовок.
*   `description` (Text).
*   `backgroundImage` (Media: Image).
*   `primaryButton` (Component: Link) - { text, url }.
*   `secondaryButton` (Component: Link) - { text, url }.

## 2. Bento Grid (Сетка услуг/преимуществ)
Компонент для вывода красивых карточек (как на странице "Направления").
*   `title` (String) - Заголовок блока.
*   `cards` (Repeatable Component):
    *   `title` (String).
    *   `description` (Text).
    *   `image` (Media: Image).
    *   `themeColor` (Enumeration: green, violet, orange...).
    *   `link` (String).

## 3. Doctors Carousel (Слайдер врачей)
Блок для вывода врачей на любой странице (например, на лендинге ЭКО вывести только репродуктологов).
*   `title` (String).
*   `description` (Text).
*   `mode` (Enumeration: manual, dynamic).
*   `selectedDoctors` (Relation: Many-to-Many с Doctor) - если mode = manual.
*   `filterBySpecialty` (Relation: Many-to-One с Specialty) - если mode = dynamic (автоматически тянуть врачей этой специальности).

## 4. FAQ Accordion (Вопрос-ответ)
*   `title` (String) - Заголовок блока (например, "Частые вопросы").
*   `items` (Repeatable Component):
    *   `question` (String).
    *   `answer` (Rich Text).

## 5. Rich Text Block (Текстовый блок)
Для вставки обычного SEO-текста, таблиц, списков.
*   `content` (Rich Text / Markdown).

## 6. Call to Action (CTA Banner)
Яркий баннер с призывом к действию.
*   `title` (String).
*   `description` (Text).
*   `buttonText` (String).
*   `buttonLink` (String).
*   `theme` (Enumeration: light, dark, brand).

## Как это работает в Strapi:
В коллекции `Page` (или `Landing`) создается поле `content` типа **Dynamic Zone**. В эту зону разрешается добавлять любой из вышеперечисленных компонентов в любом порядке. Фронтенд будет проходить по массиву этих компонентов и рендерить соответствующие React-компоненты.
