# Ревизия русского языка — med_site

> **Для:** агента Gemini Studio (редактор текстов).  
> **Задача:** найти каждый фрагмент в указанном файле и исправить орфографию, грамматику, пунктуацию, стиль.  
> **Не делать:** менять `/src/widget/` booking flow, `php_backend`, логику деплоя.  
> **Формат записи:** `№` → **фрагмент как в коде** → **файл** → **строка** → **тип проблемы**.

Типы: `ОРФ` орфография · `ГР` грамматика · `ПУН` пунктуация · `СТИЛ` стиль/термин · `Ё` буква ё · `ЕД` единообразие по проекту · `ОТОБ` искажение на экране (код) · `ДУБ` дубликат текста · `ФАКТ` возможное фактическое несоответствие · `СТР` незакрытая/битая строка.

---

## A. Главная страница и блок «Направления» (приоритет)

| № | Фрагмент | Файл | Строка | Тип |
|---|----------|------|--------|-----|
| 1 | `комфортную остановку для каждого пациента` | `src/widgets/features-widget/ui/FeaturesWidget.tsx` | 28 | ОРФ/ГР |
| 2 | `Почему пациенты доверяют нам свое здоровье` | `src/widgets/features-widget/ui/FeaturesWidget.tsx` | 55 | Ё |
| 3 | **Механизм:** подписи услуг в тегах направлений проходят через `charAt(0).toUpperCase() + slice(1).toLowerCase()` — из‑за этого на главной **искажается регистр** названий (в т.ч. блок «Косметология»: «Аппаратная косметология», «ДНЕВНОЙ СТАЦИОНАР», ««Антиклещ»» и др.) | `src/widgets/directions-widget/ui/DirectionsWidgetVariants.tsx` | 56 | ОТОБ |
| 4 | Исходные тексты направления «Косметология» (проверить после исправления п.3) | `src/shared/constants/servicesData.ts` | 47–50 | СТИЛ |
| 5 | `Показать ещё` | `src/widgets/directions-widget/ui/DirectionsWidgetVariants.tsx` | 70, 277 | ЕД |
| 6 | `Показать еще` | `src/shared/ui/ExpandableList/ExpandableList.tsx` | 56 | ЕД |
| 7 | `Показать еще` | `src/pages/doctor/ui/DoctorPage.tsx` | 69 | ЕД |
| 8 | `Конференция с международным участием для врачей акушеров-гинекологов…` | `src/shared/api/contentApi.ts` | 93 | ГР |
| 9 | *(дубль п.8)* | `src/pages/events/ui/EventsPage.tsx` | 15 | ДУБ/ГР |
| 10 | *(дубль п.8)* | `src/pages/news/ui/NewsPage.tsx` | 12 | ДУБ/ГР |
| 11 | `МРТ диагностика на аппарате 3 Тесла` | `src/shared/api/contentApi.ts` | 104 | СТИЛ |
| 12 | *(дубль п.11)* | `src/pages/news/ui/NewsPage.tsx` | 28 | ДУБ/СТИЛ |
| 13 | `Скидка 20% на первичный прием педиатра` | `src/shared/api/contentApi.ts` | 59 | Ё/ЕД |
| 14 | `Повторный прием для подробного разбора результатов и составим персональный план лечения` | `src/widgets/timeline-widget/ui/TimelineWidget.tsx` | 29 | ГР |
| 15 | `Запись на прием` | `src/widgets/hero-widget/ui/HeroSection.tsx` | 146 | Ё/ЕД |
| 16 | `Записаться на прием` | `src/widgets/hero-widget/ui/HeroImmersive.tsx` | 16 | Ё/ЕД |
| 17 | `Учись студент и будь спокоен за свое здоровье, скидка 7% студентам` | `src/shared/infrastructure/storage/SpecialOffersRepository.ts` | 27 | ГР/Ё |
| 18 | `ЭКО за 99000₽ и криоперенос за 49000₽` | `src/shared/infrastructure/storage/SpecialOffersRepository.ts` | 33 | СТИЛ/ПУН |
| 19 | `Скидка 10% пенсионерам на все услуги клиники` | `src/shared/infrastructure/storage/SpecialOffersRepository.ts` | 15 | СТИЛ |

---

## B. Страницы сайта

| № | Фрагмент | Файл | Строка | Тип |
|---|----------|------|--------|-----|
| 20 | `влюбленных в свое дело` | `src/pages/AboutPage.tsx` | 64 | Ё |
| 21 | `Прием точно по времени` | `src/pages/AboutPage.tsx` | 32 | Ё/ЕД |
| 22 | `Найдите своего специалиста и запишитесь на прием` | `src/pages/doctors/ui/DoctorsPage.tsx` | 112 | Ё/ЕД |
| 23 | `Записаться на прием` | `src/pages/doctor/ui/DoctorPage.tsx` | 342 | Ё/ЕД |
| 24 | `Как подготовиться к приему?` | `src/pages/service/ui/ServicePage.tsx` | 562 | Ё/ЕД |
| 25 | `Записаться на прием` (несколько кнопок) | `src/pages/service/ui/ServicePage.tsx` | 320, 413, 468 | Ё/ЕД |
| 26 | `Скидка на первичный прием педиатра` | `src/pages/promotions/ui/PromotionsPage.tsx` | 26 | Ё/ЕД |
| 27 | `…услуги клиники ИСТОЧНИК` (без кавычек «») | `src/pages/certificates/ui/CertificatesPage.tsx` | 11 | СТИЛ/ЕД |
| 28 | `Отправьте свое резюме` | `src/pages/vacancies/ui/VacanciesPage.tsx` | 102 | Ё |
| 29 | `соблюдение сан-эпид режима` | `src/pages/vacancies/ui/VacanciesPage.tsx` | 24 | СТИЛ |
| 30 | `Ведение амбулаторного приема` | `src/pages/vacancies/ui/VacanciesPage.tsx` | 15 | Ё/ЕД |
| 31 | `Амбулаторный прием в отделении круглосуточно` | `src/pages/contacts/ui/ContactsPage.tsx` | 64 | Ё/ЕД |
| 32 | `Лицензия № … от 19.01.18г.` (и аналоги `09.08.19г.`) | `src/pages/contacts/ui/ContactsPage.tsx` | 18, 34, 51, 67, 85, 100 | ПУН/СТИЛ |
| 33 | `ПН - ПТ: 8:00 - 22:00` (тире/пробелы в расписании) | `src/pages/contacts/ui/ContactsPage.tsx` | 15, 31, 48… | ЕД/ПУН |
| 34 | `Мастер-класс: УЗИ диагностика сложных патологий` | `src/pages/events/ui/EventDetailsPage.tsx` | 28 | СТИЛ |
| 35 | `Ко всем мероприятиям` (кнопка «назад») | `src/pages/events/ui/EventDetailsPage.tsx` | 58 | СТИЛ/ГР |
| 36 | `Демо (Все блоки)` | `src/widgets/footer/ui/Footer.tsx` | 114 | СТИЛ |

---

## C. Конференция — program & speakers (`eventData.ts` + дубль `eventsDb.ts`)

| № | Фрагмент | Файл | Строка | Тип |
|---|----------|------|--------|-----|
| 37 | `Открытие Конференции` | `src/pages/events/ui/eventData.ts` | 25 | СТИЛ |
| 38 | `до 100 человек очно, онлайн трансляция` | `src/pages/events/ui/eventData.ts` | 8 | ПУН |
| 39 | `…ФГБОУ ВО «ПСПбГМУ им. акад. И. П. Павлова Минздрава России, главный внештатный…` *(нет закрывающей `»`)* | `src/pages/events/ui/eventData.ts` | 57 | СТР/ПУН |
| 40 | `…КГБУЗ «Красноярская межрайонная клиническая больница 4, Красноярск` *(нет закрывающей `»`)* | `src/pages/events/ui/eventData.ts` | 90 | СТР/ПУН |
| 41 | `…ФГБОУ ВО «ПСПбГМУ им. акад. И. П. Павлова Минздрава России, доцент…` *(нет закрывающей `»`)* | `src/pages/events/ui/eventData.ts` | 111 | СТР/ПУН |
| 42 | `Клиники «Источник»` *(лишняя/неверная форма «Клиники»)* | `src/pages/events/ui/eventData.ts` | 118 | ГР |
| 43 | `Санкт Петербург` *(без дефиса)* | `src/pages/events/ui/eventData.ts` | 118 | ОРФ/ЕД |
| 44 | `Заведующий отделом…` *(у спикера Толибова Г.Х.)* | `src/pages/events/ui/eventData.ts` | 64 | ГР |
| 45 | `Заведующий Центром…` *(у спикера Климатова Е.И.)* | `src/pages/events/ui/eventData.ts` | 90 | ГР |
| 46 | `Заведующий отделения…` *(у спикера Туреева А.В.)* | `src/pages/events/ui/eventData.ts` | 97 | ГР |
| 47 | `Заведующий отделением ВРТ…` *(у спикера Бутусова В.А.)* | `src/pages/events/ui/eventData.ts` | 166 | ГР |
| 48 | `Заведующий Центром…` *(дважды в одной строке, у спикера Алпаидзе К.Н.)* | `src/pages/events/ui/eventData.ts` | 188 | ГР/СТИЛ |
| 49 | `Главный врач, Цатурова К. А. — главный врач клиники…` *(повтор должности)* | `src/pages/events/ui/eventData.ts` | 145 | СТИЛ/ГР |
| 50 | `Бесплодный брак – пути решения` | `src/pages/events/ui/eventData.ts` | 95 | ЕД/ПУН |
| 51 | `09:30 – 18:00` vs `09:30 - 18:00` в других файлах | `eventData.ts` / `NewsPage.tsx` / `EventsPage.tsx` | — | ЕД |
| 52 | *(те же проблемы speakers — сокращённые описания)* | `src/shared/api/mocks/eventsDb.ts` | 80, 105, 112, 180, 194 | ДУБ |

---

## D. Mock-данные услуг, отзывы, SEO

| № | Фрагмент | Файл | Строка | Тип |
|---|----------|------|--------|-----|
| 53 | `author: 'Причал Здоровья'` *(подозрительное имя в отзыве)* | `src/shared/api/mocks/servicesDb.ts` | 111 | ФАКТ/ОРФ |
| 54 | `Check-up "Женское здоровье"` | `src/shared/api/mocks/servicesDb.ts` | 70 | СТИЛ/ЕД |
| 55 | `Женские боли – норма?` | `src/shared/api/mocks/servicesDb.ts` | 138 | ПУН |
| 56 | `…услуги по гинекологии и акушерству в Санкт-Петербурге` *(сеть «Источник» — Челябинск)* | `src/shared/api/mocks/servicesDb.ts` | 155 | ФАКТ |
| 57 | `На первичный прием желательно…` и др. (~14× «прием») | `src/shared/api/mocks/servicesDb.ts` | 85, 90–94… | Ё/ЕД |
| 58 | `Медицинские чекапы (check-up), скрининги` | `src/shared/constants/servicesData.ts` | 76 | СТИЛ/ЕД |
| 59 | `ДНЕВНОЙ СТАЦИОНАР` *(ALL CAPS в списке)* | `src/shared/constants/servicesData.ts` | 7 | СТИЛ |
| 60 | `«Антиклещ»` *(кавычки + регистр в тегах)* | `src/shared/constants/servicesData.ts` | 22 | СТИЛ/ОТОБ |
| 61 | `Повторный прием врача-гастроэнтеролога` | `src/shared/api/mocks/pricesDb.ts` | 54 | Ё/ЕД |
| 62 | `Были на приеме у педиатра…` | `src/entities/review/api/reviewsRepository.ts` | 29 | Ё/ЕД |
| 63 | `…напомнят о приеме` | `src/entities/review/api/reviewsRepository.ts` | 53 | Ё/ЕД |

---

## E. Виджеты, FAQ, footer, конфиги

| № | Фрагмент | Файл | Строка | Тип |
|---|----------|------|--------|-----|
| 64 | `Как записаться на прием к специалисту?` | `src/widgets/faq-widget/ui/FaqWidget.tsx` | 9 | Ё/ЕД |
| 65 | `Записаться на прием` | `src/widgets/mobile-menu/ui/MobileMenu.tsx` | 291 | Ё/ЕД |
| 66 | `Безболезненное удаление пораженных тканей` | `src/shared/store/cmsStore.ts` | 83 | Ё |
| 67 | `Вопросы о: Лечение кариеса под микроскопом` | `src/shared/store/cmsStore.ts` | 86 | ПУН/СТИЛ |
| 68 | `Диагностика и Исследования` *(заглавная «И»)* | `server/config/logic.json` | 24, 76 | СТИЛ/ЕД |
| 69 | `Консультативный прием` | `server/config/logic.json` | 45, 78 | Ё/ЕД |
| 70 | `Записаться еще раз` | `server/config/text.json` | 42 | Ё/ЕД |
| 71 | `Нажимаю кнопку, вы соглашаетесь…` | `server/config/text.json` | 35 | ГР/СТИЛ |

---

## F. Единообразие по всему проекту (потенциальные — пройти grep)

| № | Описание | Где искать | Тип |
|---|----------|------------|-----|
| 72 | **~35+ вхождений** `прием` без буквы **ё** (в UI почти везде; одно `приём` в prototype) | `src/**/*.tsx`, `src/**/*.ts`, `server/config/*.json` | ЕД |
| 73 | **Смешение** `ещё` / `eще` в кнопках «Показать…» | см. п.5–7, `DirectionsWidgetVariants`, `ExpandableList`, `DoctorPage` | ЕД |
| 74 | **Смешение** `-` / `–` / `—` в диапазонах времени и заголовках | events, news, contacts | ЕД |
| 75 | **Английские вставки** без перевода: `check-up`, `Check-up`, `Zoom`, `Email` | servicesData, servicesDb, EventsPage | СТИЛ |
| 76 | **Тесла** как единица (МРТ) — проверить написание и пробелы | contentApi, NewsPage, AiContentTab | СТИЛ |
| 77 | **Название клиники:** `ИСТОЧНИК` / `«Источник»` / `Источник` — разный регистр и кавычки | AboutPage, certificates, eventData, footer | ЕД |

---

## G. Прототипы и админка (низкий приоритет, но исправить при экспорте)

| № | Фрагмент | Файл | Строка | Тип |
|---|----------|------|--------|-----|
| 78 | `Ближайший приём` *(единственное с ё)* | `src/pages/app-prototype/ui/components/UpcomingAppointment.tsx` | 17 | ЕД |
| 79 | `Запись на прием` | `src/pages/app-prototype/ui/AppPrototype.tsx` | 188 | Ё/ЕД |
| 80 | `Попробуйте еще раз` | `src/widgets/marketing-control-panel/ui/tabs/LaboratoryTab.tsx` | 63 | Ё/ЕД |
| 81 | `цена 4000 руб` | `src/widgets/marketing-control-panel/ui/tabs/AiContentTab.tsx` | 92 | СТИЛ |
| 82 | `1.5 Тесла` | `src/widgets/marketing-control-panel/ui/tabs/AiContentTab.tsx` | 92 | СТИЛ |
| 83 | `Профессиональное лечение зубов в Челябинске` *(зубы в CMS-tab — чужой контент)* | `src/widgets/marketing-control-panel/ui/tabs/CmsTab.tsx` | 38 | ФАКТ |
| 84 | `Долго ждал в приемной…` | `src/widgets/marketing-control-panel/ui/tabs/CmsTab.tsx` | 57 | Ё/ЕД |

---

## H. Запись онлайн (только user-visible тексты, read-only модуль)

| № | Фрагмент | Файл | Строка | Тип |
|---|----------|------|--------|-----|
| 85 | `Создает запись на прием для пациента` | `src/widget/engine/ai-contracts.ts` | 27 | Ё/ЕД |
| 86 | `Записаться на прием` | `src/widget/components/DoctorProfileModal.tsx` | 180 | Ё/ЕД |
| 87 | Все строки из `server/config/text.json` с `прием`/`еще`set` | `server/config/text.json` | 35, 42 | Ё/ЕД |

> Полный grep по `src/widget/components/*.tsx` — ещё ~8 фраз с «прием» (см. категорию F, п.72).

---

## Промпт для Gemini (вставить в Studio)

```
Открой docs/RUSSIAN_TEXT_AUDIT.md в проекте med_site.

Исправь все пункты 1–87 (и категорию F — единообразие ё/приём/ещё по grep).

Правила:
1. Не меняй смысл медицинских терминов без необходимости.
2. Для дублей (ДУБ) — правь SSOT или вынеси в один конфиг, остальные файлы импортируй.
3. Пункт 3 (ОТОБ) — исправь код в DirectionsWidgetVariants.tsx, не только тексты в servicesData.
4. Не трогай php_backend и логику booking API.
5. После правок: grep по «остановку», «акушеров-», незакрытым «», «прием» (если политика — везде «приём»).

Не создавай новые markdown-файлы. Коммит-message не нужен — только готовый код.
```

---

## Статистика ревизии

| Категория | Пунктов |
|-----------|---------|
| A — главная | 19 |
| B — страницы | 17 |
| C — конференция | 16 |
| D — mock/SEO | 11 |
| E — виджеты/конфиг | 8 |
| F — единообразие | 6 |
| G — прототип/админ | 7 |
| H — booking UI | 3 |
| **Итого явных** | **87** |

*Дата ревизии: 2026-06-17 · Репозиторий: `main` (коммит с `public/img/conference.jpg`)*
