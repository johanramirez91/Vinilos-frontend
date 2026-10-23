import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, las peticiones a /api se reenvían a la API local (evita problemas de CORS)
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
