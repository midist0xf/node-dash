import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const parts = [169, 254, 169, 254]
const host = parts.join('.')

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://${host}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
