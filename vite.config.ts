import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site: https://pyaim.github.io/RootsAndRifts/
  base: "/RootsAndRifts/",
})
