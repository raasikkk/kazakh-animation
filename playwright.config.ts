import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.ts', workers: 1, timeout: 45000,
  use: { baseURL: 'http://localhost:5176', browserName: 'chromium', launchOptions: { args: ['--enable-unsafe-swiftshader'] }, trace: 'retain-on-failure' },
  projects: [{ name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } }, { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }],
  webServer: { command: 'pnpm dev --port 5176 --strictPort', url: 'http://localhost:5176', reuseExistingServer: !process.env.CI },
})
