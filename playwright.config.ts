import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const NUXT_PORT = process.env.NUXT_PORT || '3000';
const NUXT_HOST = process.env.NUXT_HOST || '127.0.0.1';
const APP_BASE_URL = process.env.PW_BASE_URL || `http://${NUXT_HOST}:${NUXT_PORT}`;
const BACKEND_URL = process.env.NUXT_PUBLIC_URL_BACKEND || 'http://app.futzo.test';
const BACKEND_PREFIX = process.env.NUXT_PUBLIC_BACKEND_PREFIX || 'api/v1';

export default defineConfig({
  testDir: 'playwright/tests',
  globalSetup: 'playwright/global-setup.ts',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list']],
  use: {
    baseURL: APP_BASE_URL,
    trace: 'on-first-retry',
    storageState: 'playwright/.auth/user.json',
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: `NUXT_HOST=${NUXT_HOST} NUXT_PUBLIC_URL_BACKEND=${BACKEND_URL} NUXT_PUBLIC_BACKEND_PREFIX=${BACKEND_PREFIX} npx -y nuxt dev --port ${NUXT_PORT}`,
    url: APP_BASE_URL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
