import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({ channel: 'chromium', args: ['--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
await page.goto('http://localhost:5176', { waitUntil: 'networkidle' })
await page.waitForFunction(() => document.fonts.status === 'loaded')
await page.waitForTimeout(2600)
await page.screenshot({ path: 'artifacts/desktop-hero.png' })
console.log('Initial:', await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth, renderer: document.querySelector('.golden-object').dataset.ready, height: document.documentElement.scrollHeight })))
for (const [name, selector, fraction] of [['hero-unfold', '.hero', .8], ['landscape', '.landscape', .75], ['ornament', '.pattern-lab', .92], ['crafts', '.crafts', .5], ['woven', '.woven', 0], ['roof', '.roof-scene', .45], ['roof-end', '.roof-scene', .96], ['footer', '.footer', 0]]) {
  const top = await page.locator(selector).evaluate((element, fraction) => element.getBoundingClientRect().top + scrollY + (element.offsetHeight - innerHeight) * fraction - (fraction ? 0 : 80), fraction)
  await page.evaluate((y) => window.scrollTo(0, y), top)
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `artifacts/desktop-${name}.png` })
}
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
mobile.on('pageerror', (error) => errors.push(error.message))
await mobile.goto('http://localhost:5176', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(2400)
await mobile.screenshot({ path: 'artifacts/mobile-hero.png' })
console.log('Mobile:', await mobile.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth })))
await mobile.emulateMedia({ reducedMotion: 'reduce' })
await mobile.waitForTimeout(500)
await mobile.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true })
console.log('Errors:', errors)
await browser.close()
