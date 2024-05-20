import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_APP_PROJECT_ID": JSON.stringify(process.env.VITE_APP_PROJECT_ID),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
