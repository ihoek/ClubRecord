import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { API_URL } from "./config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3008,
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
      },
    },
  },
});
