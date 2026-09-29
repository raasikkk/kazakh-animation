import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const html = renderToStaticMarkup(createElement(App))
  const text = html.replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ')
  assert(!/\p{Script=Latin}/u.test(text), 'Visible copy must remain Kazakh Cyrillic')
  assert(!/<(?:button|dialog)\b/.test(html), 'The experience must not depend on buttons or modals')
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
  assert.equal(new Set(ids).size, ids.length, 'All element and SVG IDs must be unique')
  for (const anchor of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(anchor[1]), `Missing section: ${anchor[1]}`)
  for (const label of html.matchAll(/(?:aria-label|alt)="([^"]+)"/g)) assert(!/\p{Script=Latin}/u.test(label[1]), 'Accessibility copy must remain Cyrillic')
  for (const asset of html.matchAll(/src="(\/[^\"]+)"/g)) await access(`public${asset[1]}`)
  const index = await readFile('index.html', 'utf8')
  assert(index.includes('lang="kk"'), 'Document language must be Kazakh')
  assert(index.includes('ТАМЫР'), 'Page title must remain Cyrillic')
  for (const font of index.matchAll(/href="(\/fonts\/[^\"]+)"/g)) await access(`public${font[1]}`)
  const css = await readFile('src/index.css', 'utf8')
  for (const font of css.matchAll(/url\('(\/fonts\/[^']+)'\)/g)) await access(`public${font[1]}`)
  assert(css.includes('prefers-reduced-motion'), 'Reduced-motion layout must be available')
  console.log('Content checks passed: Cyrillic copy, accessibility labels, valid anchors, unique IDs, local assets, font references, reduced motion, and scroll-only structure.')
} finally {
  await server.close()
}
