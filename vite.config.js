import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {    // API 프록시 설정
      '/api': {  
        target: 'http://localhost',  
        changeOrigin: true,
        logLevel: 'debug',
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false     
      }
    }
  }  
})
