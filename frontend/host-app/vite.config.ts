import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host-app",
      remotes: {
        task_module: "http://localhost:4173/assets/remoteEntry.js",
        ui_components: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react"],
    }),
  ],
  server: {
    port: 5174,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["X-Requested-With", "content-type", "Authorization"],
    },
  },
  build: {
    modulePreload: true,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

