import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Arlot-Ai/',   // Repository nomi bilan bir xil bo‘lishi shart
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})