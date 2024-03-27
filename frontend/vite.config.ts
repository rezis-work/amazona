// https://vitejs.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:4000", // Replace YOUR_BACKEND_PORT with your actual backend server port
    },
  },
  build: {
    outDir: "dist",
  },
  plugins: [react()],
});
