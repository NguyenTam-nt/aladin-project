import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      "/services": {
        target: "http://192.168.1.24:8090",
        changeOrigin: true,
      },
    }
  },
  plugins: [react(), tsconfigPaths(), reactRefresh()],
})
