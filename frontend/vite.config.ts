import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    sourcemap: false,
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
});
