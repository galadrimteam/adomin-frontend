import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/uploads": {
        target: "http://127.0.0.1:3333",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
