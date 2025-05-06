import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Trip/', // 👈 This line tells Vite where the app is hosted
  plugins: [react()],
  server: {
    open: true,
  },
})
