import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "kanban_module",
      filename: "remoteEntry.js",
      exposes: {
        "./Kanban": "./src/components/Kanban/Kanban.tsx",
        "./Test": "./src/components/Test/Test.tsx",
      },
      shared: ["react"],
    }),
  ],
  base: 'http://127.0.0.1:5170',
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5170,
    strictPort: true,
    host: true,
    origin: 'http://127.0.0.1:5170'
  },
  preview: {
    port: 5170,
    strictPort: true,
    host: true,
  },
});