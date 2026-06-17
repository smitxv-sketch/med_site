# Архитектура и Интеграция с Backend (Strapi + CI/CD)

Этот документ описывает планируемую интеграцию текущего фронтенда UI-конструктора (Marketing UI Engine) с backend-частью (Strapi) и процессом развертывания (Deploy).

## Общая концепция "Слепой сборки"
Frontend-приложение спроектировано как **SSG/ISR** (Static Site Generation / Incremental Static Regeneration) или классический SPA, который на этапе загрузки или сборки получает конфигурацию из API.
В рабочей среде (Production) панель `DevModeToggle` либо отключена полностью для обычных пользователей, либо скрыта за строгой авторизацией (проверкой ролей, JWT токеном администратора/маркетолога).

## Роль Backend (Strapi)
**Strapi CMS** будет выступать в роли единого окна как для контента клиники (новости, врачи, услуги), так и для глобальных UI-настроек.

**Модель данных (Global Settings):**
В Strapi нужно создать Single Type (например, `UI Config` или `App Settings`), который будет хранить JSON или список полей, аналогичных `UISettingsState` во фронтенде:
- `homePageConcept` (string: classic/immersive)
- `fontFamily` (string)
- `colorTheme`, `customHue`, `customSaturation`, `customLightness`
- `layoutDensity`, `shadowStyle`, `animationTheme`
- `marketingTriggers`, `pricingStrategy`, `urgencyLevel`
- Параметры блоков (variants)

**Поток данных (Чтение):**
При загрузке/сборке приложения фронтенд делает запрос к REST/GraphQL API Strapi (например, `GET /api/ui-config`). Полученные настройки маппятся в стор (Zustand: `useUISettingsStore`) и приложение мгновенно принимает нужный вид.

## Реализация визуального конструктора в Production
Чтобы Владелец сайта или Маркетолог могли видеть изменения в моменте и затем публиковать их:

### Вариант 1 (Предпочтительный для SSG/ISR): Конструктор на Фронтенде + Reverse API
1. Маркетолог логинится во Frontend приложении (или скрытом портале администратора) под правами редактора.
2. Ему становится доступна панель `Command Center` (`DevModeToggle.tsx`). 
3. Он "двигает ползунки", меняет настройки и видит изменения интерфейса **прямо в браузере (на клиенте)** в локальном хранилище/памяти (работает текущая логика Zustand). Фронтенд работает очень быстро, нет никаких задержек.
4. Когда правки утверждены, маркетолог нажимает **"Опубликовать изменения"**.
5. Фронтенд выполняет `POST` / `PUT` запрос к Strapi (`/api/ui-config`), отправляя новую конфигурацию настроек с JWT-токеном авторизации.
6. Strapi сохраняет настройки в БД.
7. Strapi срабатывает на жизненный цикл (Lifecycle hooks: `afterUpdate`) и кидает **Webhook** в систему CI/CD (GitHub Actions, GitLab CI, Vercel, Netlify).
8. Система CI/CD запускает сборку (`npm run build`). Она скачивает новые параметры из Strapi, запекает их в статику (или пересобирает кэш) и выкладывает на сервер.

### Вариант 2: Preview Mode
Если используется фреймворк типа Next.js/Nuxt, можно интегрировать `Preview Mode` или `Draft Mode`, где все запросы за настройками идут к Strapi на каждый рендер, минуя кэш. Так администратор видит реальное поведение.

## Жизненный цикл "Опубликовать" в коде
Функционал кнопки (которую мы добавили) должен выглядеть так:
```typescript
async function handlePublishSettings(settings) {
  try {
    // 1. Сохраняем в Strapi
    await fetch('https://api.clinic-example.com/api/ui-config', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ data: settings })
    });
    
    // (опционально) 2. Если CI/CD принимает вебхуки напрямую, а не из Strapi
    // await fetch('https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_URL', { method: 'POST' });
    
    toast.success('Настройки успешно обновлены и запущен деплой!');
  } catch (error) {
    toast.error('Ошибка публикации');
  }
}
```

## Требования к серверу (Свой сервер / VPS)
Так как приложение планируется размещать на собственном физическом сервере, вам потребуется настроить окружение для приема вебхуков:

* **Инструмент CI/CD:** Вы можете использовать GitLab CI, GitHub Actions (Self-hosted runners) или легковесные решения вроде **Coolify**, **Dokku** или кастомный скрипт вебхука (`webhook` на Go или Node.js).
* **Скрипт Webhook:** Сервис постоянно слушает порт (например, `:9000/hooks/deploy`). Strapi отправляет на него POST запрос.
* Действия скрипта:
  1. `git pull`
  2. `npm install`
  3. `npm run build`
  4. Перезапуск процесса (если SSR - `pm2 restart app`, если SSG - перенос папки `dist` в директорию Nginx - `cp -r dist/* /var/www/clinic`).

Этот подход гарантирует 100% производительность для конечных пользователей, так как они будут скачивать готовую статику (с запеченными настройками CSS/Variables, собранными в Tailwind), в то время как конструктор позволит менять "заводские" параметры без погружения в код.
