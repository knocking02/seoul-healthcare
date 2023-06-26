import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
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
