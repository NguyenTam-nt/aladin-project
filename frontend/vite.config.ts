import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/services": {
        target: "http://101.99.6.31:3304",
        changeOrigin: true,
      },
    }
  },
  plugins: [react(), tsconfigPaths(), reactRefresh()],
})
