import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Smart-goal-planner', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})