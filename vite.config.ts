import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  define: {
    "process.env.VITE_APP_PROJECT_ID": JSON.stringify(
      process.env.VITE_APP_PROJECT_ID
    ),
    "process.env.VITE_APP_ONRAMPER": JSON.stringify(
      process.env.VITE_APP_ONRAMPER
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
