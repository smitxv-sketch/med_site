# Модель данных и связи (Entity Relationship Model)

Здесь описаны основные сущности (Collection Types), которые необходимо создать в Strapi, и их связи.

## 1. Doctor (Врач)
Лицо клиники. Самая важная конверсионная сущность.
*   `mis_id` (String, Unique, Required) - ID врача в медицинской инфо-системе.
*   `slug` (UID) - для URL `/doctors/ivanov-ivan`.
*   `firstName`, `lastName`, `middleName` (String).
*   `photo` (Media: Image) - качественное фото.
*   `experienceYears` (Integer) - стаж работы.
*   `quote` (Text) - короткая цитата врача (философия лечения).
*   `bio` (Rich Text) - подробное описание опыта.
*   `isAdult` (Boolean) - принимает взрослых.
*   `isChild` (Boolean) - принимает детей.
*   **Связи (Relations):**
    *   `specialties` (Many-to-Many с коллекцией Specialty).
    *   `locations` (Many-to-Many с коллекцией Location) - где принимает.
    *   `services` (Many-to-Many с коллекцией Service) - какие услуги оказывает.
    *   `reviews` (One-to-Many с коллекцией Review).

## 2. Specialty (Специальность)
Например: "Акушер-гинеколог", "Врач УЗИ".
*   `title` (String).
*   `slug` (UID).
*   **Связи:** `doctors` (Many-to-Many).

## 3. Service Category (Направление / Отделение)
Крупные блоки: "Взрослая клиника", "Косметология", "Центр ЭКО".
*   `title` (String).
*   `slug` (UID).
*   `shortDescription` (Text).
*   `themeColor` (Enumeration: green, orange, violet, blue, turquoise) - для UI акцентов.
*   `icon` (Media: Image/SVG) - опционально.
*   **Связи:** `services` (One-to-Many).

## 4. Service (Конкретная услуга)
Например: "Ведение беременности", "УЗИ брюшной полости".
*   `mis_id` (String) - для связи с прайсом в МИС.
*   `title` (String).
*   `slug` (UID).
*   `description` (Rich Text).
*   `preparation` (Rich Text) - как подготовиться (натощак и т.д.).
*   `ai_context` (Text) - описание для AI-ассистента.
*   `search_synonyms` (Text) - синонимы для поиска.
*   **Связи:**
    *   `category` (Many-to-One с Service Category).
    *   `doctors` (Many-to-Many с Doctor) - кто выполняет.
    *   `locations` (Many-to-Many с Location) - где выполняется.

## 5. Location (Клиника / Филиал)
*   `mis_id` (String).
*   `title` (String) - например "Клиника на Партизана Железняка".
*   `address` (String).
*   `coordinates` (JSON) - { lat, lng } для карты.
*   `phone` (String).
*   `workingHours` (JSON/Text).
*   `photos` (Media: Array of Images).

## 6. Review (Отзыв)
*   `authorName` (String).
*   `date` (Date).
*   `rating` (Integer 1-5).
*   `text` (Text).
*   `source` (Enumeration: yandex, prodoctorov, 2gis, google, internal).
*   `isVerified` (Boolean).
*   **Связи:**
    *   `doctor` (Many-to-One) - на кого отзыв.
    *   `service` (Many-to-One) - на какую услугу.

## 7. Promotion (Акция)
*   `title` (String).
*   `slug` (UID).
*   `coverImage` (Media: Image).
*   `startDate` (Date).
*   `endDate` (Date).
*   `shortDescription` (Text).
*   `content` (Rich Text / Dynamic Zones).
*   **Связи:** `locations`, `services`, `doctors`.
