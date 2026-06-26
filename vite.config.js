import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'tool-detail': resolve(__dirname, 'tool-detail.html'),
        'writing-guide': resolve(__dirname, 'writing-guide.html'),
        'markdown-demo': resolve(__dirname, 'markdown-demo.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: '/index.html',
  },
})
