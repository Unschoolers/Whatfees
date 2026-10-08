import { defineConfig } from '@playwright/test'

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4180',
    browserName: 'chromium',
    launchOptions: executablePath ? { executablePath } : {},
    headless: true,
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4180',
    url: 'http://127.0.0.1:4180',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
