import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 0, // No inline-ar assets como base64
    // Nombres con hash (default de Vite): las fotos de distintas categorías se
    // llaman igual (01.webp, 02.webp…) y además así el caché de Vercel es seguro.
  },
});
