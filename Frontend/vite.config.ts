import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy :{
      "/newuser": {
        target: "http://localhost:8000"
      },
      "/user_log": {
        target: "http://localhost:8000"
      },
      "/user_details" :{
        target: "http://localhost:8000"
      }
    }
  },
  plugins: [react()],
})
