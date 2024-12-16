import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "task_module",
      filename: "remoteEntry.js",
      exposes: {
        "./List": "./src/components/List/List.tsx",
        "./Input": "./src/components/Input/Input.tsx",
        "./TaskList": "./src/components/TaskList/TaskList.tsx",
      },
      shared: ["react"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});