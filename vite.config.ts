import path, { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@backend": path.resolve(__dirname, "../backend"),
    },
  },
  optimizeDeps: {
    exclude: ["telegram-better-auth"],
  },
  server: {
    allowedHosts: ["urgently-tolerant-warthog.ngrok-free.app"],
    proxy: {
      "/api": {
        target:
          // eslint-disable-next-line node/prefer-global/process
          process.env.NODE_ENV === "development"
            ? "http://localhost:9999"
            : "https://learn.self-host.tech",
        changeOrigin: true,
      },
    },
  },
})
