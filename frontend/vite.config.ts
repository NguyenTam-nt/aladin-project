import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // target: "https://hanquochoc.edu.vn",
        changeOrigin: true,
      },
    }
  },
  plugins: [
    svgr(
      { 
        exportAsDefault: false,
        svgrOptions: {
          icon: true,
        },
        include: "./src/assets/icons/iconComponent/*.svg",
  }),
    react(), tsconfigPaths()],
})
