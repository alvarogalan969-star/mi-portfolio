import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    css: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
