import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      "/api": {
        // target: "https://hanquochoc.edu.vn",
        changeOrigin: true,
      },
    }
  },
  plugins: [react(), tsconfigPaths(), reactRefresh()],
})
