import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8002,
    host: '127.0.0.1',
    proxy: {
      '/searchApi': {
        target: 'https://MY-SEARCH-ENDPOINT.search.windows.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/searchApi/, ''),
      },
      '/aoaiApi': {
        target: 'https://MY-AZURE-OPENAI-ENDPOINT.openai.azure.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aoaiApi/, ''),
      },
    },
  },
})
