import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.svg', '**/*.gif'],
  // Base path for GitHub Pages - replace with your repo name if needed
  base: '/prof-azlef-test/',
  build: {
    outDir: 'dist',
  }
})
