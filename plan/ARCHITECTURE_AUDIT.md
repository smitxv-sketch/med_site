# Аудит Архитектуры (DI & SDUI & ФСД)

Был проведен глубокий аудит кодовой базы, чтобы проверить, все ли компоненты покрыты новой архитектурой. 

## Оставшиеся прямые зависимости от `src/shared/api` и моков (Нарушение DI)
Эти компоненты до сих пор используют прямые импорты (например, `fetch...` или `mock...`), минуя `DIContext`:
- `src/pages/app-prototype/ui/components/DoctorsScreen.tsx` — Прямой вызов API.
- `src/pages/doctor/ui/DoctorPage.tsx` — Прямой вызов API.
- `src/pages/doctors/ui/DoctorsPage.tsx` — Прямой вызов API.
- `src/pages/home/ui/sections/DirectionsSection.tsx` — Использует `fetchDirections` напрямую.
- `src/pages/home/ui/sections/HeroSection.tsx` — Прямой вызов API.
- `src/widget/context/BookingContext.tsx` — Прямой вызов API.
- `src/widget/hooks/useDoctorSlots.ts` — Прямой вызов API.
- `src/widgets/header/ui/SearchModal.tsx` — Прямой вызов API.
- `src/pages/app-prototype/ui/components/AppHeader.tsx` — Прямой импорт моков `mockUserProfiles`.

## Секции без `Server-Driven UI` (Вариантов) или `DI`
- **`SpecialOffersSection.tsx`**:
  - Данные захардкожены внутри (массив `specialOffers`), нет Репозитория.
  - Нет разделения на варианты (Variations logic).

- **`DirectionsSection.tsx`**:
  - Все еще содержит логику вариантов (`Variant A / B / C`) внутри одного гигантского файла вместо переноса в выделенный файл с Реестром паттерна SDUI (например, `DirectionsVariants.tsx`).

## Пропущенная телеметрия (`analytics.trackEvent`)
- На основе сырого анализа, во многих секциях кнопки записи все еще не обернуты в вызов `analytics.trackEvent`, например в модалках и основных экранах.

## Рекомендации к выполнению следующих этапов рефакторинга:
1. Создать `IDirectionsRepository`, `IHeroRepository`, `ISpecialOffersRepository` и внедрить их в DI.
2. Перевести оставшиеся секции на `Variants Registry` паттерн (Разнести сложный код на изолированные файлы).
3. Переписать хуки виджета (`useDoctorSlots.ts`, `BookingContext`) на DI.
