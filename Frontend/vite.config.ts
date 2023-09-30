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
      },
      "/newBsitter" :{
        target: "http://localhost:8000"
      },
      "/bsitter_log" :{
        target: "http://localhost:8000"
      },
      "/bsitter_details" :{
        target: "http://localhost:8000"
      },
      "/conversation" :{
        target: "http://localhost:8000"
      },
      "/conversations" :{
        target: "http://localhost:8000"
      },
      "/get_all_bsitter" :{
        target: "http://localhost:8000"
      },
      "/message" :{
        target: "http://localhost:8000"
      },
      "/messages" :{
        target: "http://localhost:8000"
      },
      "/get_user" :{
        target: "http://localhost:8000"
      },
      "/get_bsitter" :{
        target: "http://localhost:8000"
      },
      "//delete_conver" :{
        target: "http://localhost:8000"
      }
    }
  },
  plugins: [react()],
})
