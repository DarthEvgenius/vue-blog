import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/FrontTestingService-auth': {
        target: 'https://91.220.155.234:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/FrontTestingService-auth/, '')
      },
      '/FrontTestingService-back': {
        target: 'http://91.220.155.234:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/FrontTestingService-back/, '')
      }
    }
  }
})
