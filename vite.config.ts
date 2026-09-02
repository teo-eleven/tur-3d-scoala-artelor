import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** Port dedicat proiectului — nu se suprapune peste celelalte proiecte locale. */
const DEV_PORT = 5180
const PREVIEW_PORT = 5181

export default defineConfig({
  plugins: [react()],
  server: { port: DEV_PORT, strictPort: true, open: false },
  preview: { port: PREVIEW_PORT, strictPort: true },
})
