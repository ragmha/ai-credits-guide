import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 90000,
  use: {
    baseURL: 'http://127.0.0.1:4321/ai-credits-guide/',
    channel: process.env.BROWSER_CHANNEL || 'chrome',
    viewport: { width: 1440, height: 1000 },
  },
  reporter: 'line',
  webServer: {
    command: 'bun run preview --port 4321',
    url: 'http://127.0.0.1:4321/ai-credits-guide/',
    reuseExistingServer: !process.env.CI,
  },
});
