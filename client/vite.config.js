import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tailwind v3 runs via PostCSS, not a Vite plugin, so we remove it from here.
export default defineConfig({
  plugins: [react()],
})