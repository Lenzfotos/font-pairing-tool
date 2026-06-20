import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// On `vite build` (production / GitHub Pages) assets are served from the repo
// subpath; the dev server stays at root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/font-pairing-tool/" : "/",
  plugins: [react()],
}));
