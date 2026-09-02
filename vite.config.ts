import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { APP_CONFIG } from './config/app.config.ts'

const { server, site } = APP_CONFIG

/** Textele vin din config si ajung in atribute HTML, deci le escapam. */
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Duce textele si meta-urile din config direct in index.html. */
const injectSiteMeta = (): Plugin => ({
  name: 'inject-site-meta',
  transformIndexHtml: (html) =>
    html
      .replace(/%SITE_LANG%/g, escapeHtml(site.lang))
      .replace(/%SITE_TITLE%/g, escapeHtml(site.title))
      .replace(/%SITE_DESCRIPTION%/g, escapeHtml(site.description))
      .replace(/%SITE_OG_TITLE%/g, escapeHtml(site.ogTitle))
      .replace(/%SITE_OG_DESCRIPTION%/g, escapeHtml(site.ogDescription)),
})

export default defineConfig({
  plugins: [react(), injectSiteMeta()],
  server: { port: server.devPort, strictPort: server.strictPort, open: server.openBrowser },
  preview: { port: server.previewPort, strictPort: server.strictPort },
})
