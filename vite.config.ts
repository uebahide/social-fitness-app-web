import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { Host } from "./constants";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: Host,
        changeOrigin: true,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      },
    },
  },
});
