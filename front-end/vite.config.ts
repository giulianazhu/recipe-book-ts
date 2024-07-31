import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //below bit to be removed after completing ts
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.tsx?$/,
    exclude: [],
  },
});
