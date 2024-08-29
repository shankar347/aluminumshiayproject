import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['chart.js', 'react-chartjs-2']
  },
  server:{
    port:3000,
    proxy:{
       "/api":{
        target:"http://127.0.0.1:8000/",
        changeOrigin:true,
        secure:false
       }
    }
  }
})
