import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Arlot-Ai/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})