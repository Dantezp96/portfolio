// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://frontend-mauve-seven-17.vercel.app",
  integrations: [react()],
  vite: {
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
  },
});
