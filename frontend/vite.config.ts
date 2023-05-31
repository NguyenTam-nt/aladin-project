import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 3000,
    proxy: {
      "/api": {
        target: "http://101.99.6.88:8998/",
        changeOrigin: true,
      },
    }
  },
  plugins: [react(), tsconfigPaths()],
});
