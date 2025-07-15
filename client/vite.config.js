import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://newsportal-pl6g.onrender.com', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
