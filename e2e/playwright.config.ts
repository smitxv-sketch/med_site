import { defineConfig, devices } from '@playwright/test';

/**
 * E2E smoke-тесты платформы (site-ci).
 * Локально: WEB_URL=http://localhost:3002 npm run test:e2e
 * Прод:     npm run test:e2e:prod
 */
const isProd = process.env.SMOKE_ENV === 'prod' || process.argv.includes('--prod');
const baseURL =
  process.env.WEB_URL ?? (isProd ? 'https://istochnik.smitx.ru' : 'http://localhost:3002');

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list']],
  timeout: 60_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
