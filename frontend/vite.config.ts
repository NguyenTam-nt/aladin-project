import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:true,
    port: 3000,
    proxy: {
      "/services": {
        target: "https://giangmyhotpot.online/",
        changeOrigin: true,
      },
    }
  },
  plugins: [react(), tsconfigPaths(), reactRefresh()],
})
