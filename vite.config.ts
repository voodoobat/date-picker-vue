import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import autoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import nesting from 'postcss-nesting'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    autoImport({
      imports: ['vue', 'vue-router'],
    }),
    vue(),
    vueDevTools(),
    vueRouter({}),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer(), nesting()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
