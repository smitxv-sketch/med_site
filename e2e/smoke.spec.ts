import { expect, test, type Page } from '@playwright/test';

/** Публичные маршруты site-ci (SSOT для smoke). */
const PUBLIC_ROUTES = [
  { path: '/', name: 'главная' },
  { path: '/doctors', name: 'врачи' },
  { path: '/about', name: 'о клинике' },
  { path: '/contacts', name: 'контакты' },
  { path: '/promotions', name: 'акции' },
  { path: '/booking', name: 'запись' },
] as const;

/** Типичные признаки падения SSR Next.js на проде (класс G). */
const SSR_FAILURE_MARKERS = [
  '__next_error__',
  'Application error: a server-side exception has occurred',
  'ReferenceError: window is not defined',
] as const;

async function assertHealthyPage(page: Page, routeName: string) {
  const html = await page.content();
  for (const marker of SSR_FAILURE_MARKERS) {
    expect(html, `${routeName}: найден маркер SSR-ошибки «${marker}»`).not.toContain(marker);
  }

  // Shell сайта: header + footer должны быть в DOM (не белый экран)
  await expect(page.locator('header').first(), `${routeName}: нет header`).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.locator('footer').first(), `${routeName}: нет footer`).toBeVisible({
    timeout: 15_000,
  });
}

test.describe('Smoke: публичные страницы', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.name} (${route.path}) загружается без SSR-ошибок`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('pageerror', (err) => consoleErrors.push(err.message));

      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route.name}: HTTP статус`).toBeLessThan(400);

      await assertHealthyPage(page, route.name);

      // Критичные runtime-ошибки в браузере (не считаем предупреждения)
      const critical = consoleErrors.filter(
        (msg) => !msg.includes('ResizeObserver') && !msg.includes('favicon'),
      );
      expect(critical, `${route.name}: ошибки в консоли`).toEqual([]);
    });
  }
});

test('главная: навигация в меню открывает /doctors', async ({ page }) => {
  await page.goto('/');
  const doctorsLink = page.locator('header a[href="/doctors"], header a[href*="doctors"]').first();
  await expect(doctorsLink).toBeVisible({ timeout: 10_000 });

  await doctorsLink.click();
  await expect(page).toHaveURL(/\/doctors/);
  await assertHealthyPage(page, 'врачи (переход из меню)');
});
