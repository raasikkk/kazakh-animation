import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function scrollScene(page: Page, selector: string, progress: number) {
  const y = await page.locator(selector).evaluate((element, value) => element.getBoundingClientRect().top + scrollY + (element.clientHeight - innerHeight) * value, progress)
  await page.evaluate((value) => window.scrollTo(0, value), y)
}

test('the page loads in Cyrillic with no click-dependent scenes', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'kk')
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Тамыр')
  await expect(page.locator('button, dialog')).toHaveCount(0)
  await expect(page.locator('.golden-object')).toHaveAttribute('data-ready', 'true')
  expect(await page.locator('body').innerText()).not.toMatch(/\p{Script=Latin}/u)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(errors).toEqual([])
})

test('the ornament draws and reverses when scrolling back', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await scrollScene(page, '.pattern-lab', 1)
  await expect(page.locator('.lab-percent')).toHaveText('100')
  await expect(page.locator('.lab-fill')).toHaveCSS('opacity', '1')
  await expect(page.locator('.lab-step').last()).toHaveCSS('opacity', '1')
  await scrollScene(page, '.pattern-lab', 0)
  await expect(page.locator('.lab-percent')).toHaveText('000')
  await expect(page.locator('.lab-fill')).toHaveCSS('opacity', '0')
})

test('the roof assembles and reveals its closing words', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await scrollScene(page, '.roof-scene', 1)
  await expect(page.locator('.roof-count')).toHaveText('64 / 64')
  await expect(page.locator('.roof-quote')).toHaveCSS('opacity', '1')
  await expect(page.locator('.roof-quote')).toContainText('Тамыр терең.')
})

test('reduced motion preserves every chapter', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(page.locator('.hero-stage')).toHaveCSS('position', 'relative')
  await expect(page.locator('.roof-quote')).toHaveCSS('opacity', '1')
  for (const step of await page.locator('.lab-step').all()) await expect(step).toHaveCSS('opacity', '1')
  await expect(page.locator('.craft-card')).toHaveCount(3)
})

test('an SVG ornament remains visible without WebGL', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (kind: string, ...args: unknown[]) {
      return kind === 'webgl2' ? null : Reflect.apply(original, this, [kind, ...args])
    } as typeof original
  })
  await page.goto('/')
  await expect(page.locator('.golden-fallback')).toBeVisible()
})
