/**
 * Face capturi din turul 3D la pozitiile de scroll definite in config.
 * Rulare: node scripts/shots.mjs [url] [dosar-iesire]
 */
import puppeteer from 'puppeteer'
import { mkdir } from 'node:fs/promises'
import { APP_CONFIG } from '../config/app.config.ts'

const { capture } = APP_CONFIG
const url = process.argv[2] ?? capture.url
const outDir = process.argv[3] ?? capture.outDir

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const run = async () => {
  await mkdir(outDir, { recursive: true })
  const browser = await puppeteer.launch({ headless: true, args: [...capture.launchArgs] })
  const page = await browser.newPage()
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(String(error)))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })

  await page.setViewport({ ...capture.viewport })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: capture.navigationTimeoutMs })
  await wait(capture.settleMs)

  for (const [name, progress] of capture.stops) {
    await page.evaluate((p) => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo(0, max * p)
    }, progress)
    await wait(capture.settleMs)
    await page.screenshot({ path: `${outDir}/${name}.png` })
  }

  await browser.close()

  if (errors.length > 0) {
    console.error('Erori in pagina:\n' + errors.join('\n'))
    process.exitCode = 1
    return
  }
  console.log(`OK — ${capture.stops.length} capturi in ${outDir}/`)
}

run()
