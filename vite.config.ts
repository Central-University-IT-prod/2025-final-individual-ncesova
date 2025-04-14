import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {TanStackRouterVite} from "@tanstack/router-plugin/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "public",
  },
  publicDir: "publContent",
  plugins: [TanStackRouterVite({}), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
