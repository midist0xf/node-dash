import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rpc': {
        target: 'http://169.254.169.254',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rpc/, '/latest/meta-data'),
      },
      '/node': {
        target: 'http://metadata.google.internal',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/node/, '/'),
      },
      '/health': {
        target: 'http://100.100.100.200',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/health/, '/latest/meta-data'),
      },
    },
  },
})
