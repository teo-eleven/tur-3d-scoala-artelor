/**
 * Face capturi din turul 3D la mai multe pozitii de scroll.
 * Rulare: node scripts/shots.mjs [url] [dosar-iesire]
 */
import puppeteer from 'puppeteer'
import { mkdir } from 'node:fs/promises'

const URL = process.argv[2] ?? 'http://localhost:5180/'
const OUT_DIR = process.argv[3] ?? 'shots'
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 1 }
const SETTLE_MS = 2600

/** Punctele din tur pe care le fotografiem. */
const STOPS = [
  ['00-exterior', 0],
  ['01-intrare', 0.09],
  ['02-hol', 0.15],
  ['03-sala-lidia', 0.27],
  ['04-coridor', 0.35],
  ['05-sala-teodora', 0.43],
  ['06-scara-jos', 0.55],
  ['07-scara-palier', 0.61],
  ['08-etaj', 0.68],
  ['09-sala-marian', 0.75],
  ['10-sala-sergiu', 0.9],
  ['11-final', 1],
]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const run = async () => {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--use-gl=angle', '--use-angle=metal', '--enable-unsafe-swiftshader'],
  })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(String(error)))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })

  await page.setViewport(VIEWPORT)
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60_000 })
  await wait(SETTLE_MS)

  for (const [name, progress] of STOPS) {
    await page.evaluate((p) => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo(0, max * p)
    }, progress)
    await wait(SETTLE_MS)
    await page.screenshot({ path: `${OUT_DIR}/${name}.png` })
  }

  await browser.close()

  if (errors.length > 0) {
    console.error('Erori in pagina:\n' + errors.join('\n'))
    process.exitCode = 1
    return
  }
  console.log(`OK — ${STOPS.length} capturi in ${OUT_DIR}/`)
}

run()
