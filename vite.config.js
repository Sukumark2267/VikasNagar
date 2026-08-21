import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Keep generated dev-cache files outside node_modules so Windows user and
  // sandbox ownership differences cannot block Vite's dependency optimizer.
  cacheDir: '.vite-cache',
})
