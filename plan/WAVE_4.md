# WAVE 4: Integration & Cleanup (Финал)

Последний этап архитектурного FSD-перехода: перенос оставшихся секций главной страницы в `src/widgets/` и полное удаление старой папки `sections`. 

- [x] **Шаг 4.1: HeroWidget (V2)**
    * Создать `src/widgets/hero-widget/`.
    * Перенести `HeroSection.tsx`, `HeroImmersive.tsx` и `HeroMobileVariants.tsx` внутрь виджета, реализовав единый интерфейс виджета, реагирующий на пресеты переключателя (UI Settings).
    * В `HomePage.tsx` заменить старый импорт.

- [x] **Шаг 4.2: CategoriesWidget, SpecialOffersWidget, LocationsWidget (V2)**
    * Создать `src/widgets/categories-widget/`, `src/widgets/special-offers-widget/` и `src/widgets/locations-widget/`.
    * Инкапсулировать логику выборки данных.
    * В `HomePage.tsx` заменить старые импорты.

- [x] **Шаг 4.3: Полное удаление директории `sections`**
    * Удалить `src/pages/home/ui/sections/` так как все секции теперь являются независимыми переиспользуемыми виджетами.

- [x] **Шаг 4.4: Финальный аудит архитектуры (eslint, typescript)**
    * Удостовериться, что нет сломанных путей и неиспользуемых компонентов.
    * Запустить `compile_applet`.
