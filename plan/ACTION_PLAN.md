# MedEngine: Пошаговый план реализации

Этот документ описывает конкретные шаги для разработчиков по интеграции фронтенда с бэкендом (Strapi) и построению архитектуры MedEngine.

---

## Этап 1: Фундамент Strapi (Content Graph & SEO)
*Цель: Создать базовые сущности и связи, не привязываясь к визуальному отображению.*

### Что нужно сделать в Strapi (Админка / Content-Type Builder):
1. **Создать Components (Компоненты):**
   * `shared.seo`: Поля `metaTitle`, `metaDescription`, `shareImage` (Media), `canonicalUrl`, `preventIndexing` (Boolean), `structuredData` (JSON).
   * `shared.button`: Поля `label` (String), `url` (String), `variant` (Enum: primary, secondary, outline).
   * `shared.image`: Поля `file` (Media), `altText` (String), `caption` (String).

2. **Создать Collection Types (Сущности графа):**
   * `Direction` (Направление): `title`, `slug`, `description`, `icon` (Media), `seo` (Component).
   * `Service` (Услуга): `title`, `slug`, `price`, `duration`, `description`, `seo`.
   * `Doctor` (Врач): `fullName`, `slug`, `specialty`, `photo`, `experienceYears`, `bio`.
   * `Promotion` (Акция): `title`, `slug`, `startDate`, `endDate`, `image`, `shortDescription`.
   * `Facility` (Клиника/Адрес): `name`, `address`, `phone`, `coordinates` (JSON), `photos`.

3. **Настроить Связи (Relations):**
   * `Service` имеет связь *Many-to-One* с `Direction`.
   * `Doctor` имеет связь *Many-to-Many* с `Service` и `Direction`.
   * `Promotion` имеет связь *Many-to-Many* с `Service`.

---

## Этап 2: Библиотека Блоков (Dynamic Zones)
*Цель: Перенести наши React-компоненты в структуры данных Strapi.*

### Что нужно сделать в Strapi:
1. **Создать категорию компонентов `blocks`:**
   * `blocks.hero`: `title`, `subtitle`, `backgroundImage`, `buttons` (Repeatable Component `shared.button`).
   * `blocks.doctors-carousel`: `title`, `displayMode` (Enum: all, by_direction, manual), `directions` (Relation to Direction), `manualDoctors` (Relation to Doctor).
   * `blocks.services-grid`: `title`, `displayMode`, `services` (Relation to Service).
   * `blocks.faq`: `title`, `questions` (Repeatable Component: `question`, `answer`).
   * `blocks.promotions-slider`: `title`, `promotions` (Relation to Promotion).
   * *...и так далее для всех 28 блоков.*

2. **Создать Collection Type `Page` (Страница):**
   * Поля: `title` (String), `slug` (String, UID), `seo` (Component `shared.seo`).
   * **Главное поле:** `content` (Тип: **Dynamic Zone**). Разрешить использование всех компонентов из категории `blocks`.

---

## Этап 3: Интеграция Фронтенда (React + GraphQL)
*Цель: Научить фронтенд рендерить то, что отдает Strapi.*

### План для Фронтенд-разработчика:
1. **Настройка GraphQL Codegen:** Настроить генерацию TypeScript-типов на основе схемы Strapi GraphQL. Это гарантирует type-safety между бэком и фронтом.
2. **Разработка `<BlockRenderer />`:**
   * Создать компонент, который принимает массив блоков из Dynamic Zone.
   * Реализовать `switch` (или map) по полю `__typename` (которое отдает GraphQL для Dynamic Zones).
   * Пример логики:
     ```tsx
     const BlockRenderer = ({ blocks }) => {
       return blocks.map((block, index) => {
         switch (block.__typename) {
           case 'ComponentBlocksHero': return <HeroBlock key={index} data={block} />;
           case 'ComponentBlocksDoctorsCarousel': return <DoctorsCarouselBlock key={index} data={block} />;
           case 'ComponentBlocksFaq': return <FaqBlock key={index} data={block} />;
           default: return null;
         }
       });
     };
     ```
3. **Роутинг (Catch-all route):**
   * Настроить роутер так, чтобы при переходе на любой URL (например, `/about` или `/services/massage`), фронтенд делал запрос к коллекции `Page` по `slug`.
   * Если страница найдена — рендерим ее через `<BlockRenderer />`.

---

## Этап 4: Подготовка к AI и Аналитике (Backend Customization)
*Цель: Заложить фундамент для MedEngine AI.*

### План для Backend-разработчика (Strapi):
1. **Change Log (Lifecycle Hooks):**
   * В файле `src/api/page/content-types/page/lifecycles.ts` написать хуки `afterUpdate` и `afterCreate`.
   * При сохранении страницы записывать в отдельную таблицу `ChangeLog` слепок изменений (какие блоки добавились/удалились).
2. **Rest API Синхронизация:**
   * Создать кастомный сервис в Strapi (`src/api/sync/services/sync.ts`), который будет принимать данные из твоего REST API по Санкт-Петербургу и использовать `strapi.entityService` для создания/обновления врачей и услуг.
3. **Интерфейс для AI (Ярус 1 и 2):**
   * Создать кастомный Route и Controller в Strapi (например, `POST /api/ai/enhance-text`), который будет обращаться к API DeepSeek, передавая ему контекст (Content Graph) и возвращая улучшенный текст в админку.
