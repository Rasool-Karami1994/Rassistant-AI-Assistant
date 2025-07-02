import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
// import mkcert from "vite-plugin-mkcert";
// https://vite.dev/config/
export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
      // mkcert(),
    ],
    base: "/",
    build: {
      outDir: "dist",
    },
    server: {
      port: Number(process.env.VITE_PORT),
      host: process.env.VITE_HOST,
      strictPort: true,
      // https: true,
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "./src/react/components"),
        "@ui": path.resolve(__dirname, "./src/react/ui"),
        "@hooks": path.resolve(__dirname, "./src/react/hooks"),
        "@lib": path.resolve(__dirname, "./src/react/lib"),
        "@api": path.resolve(__dirname, "./src/react/api"),
        "@types": path.resolve(__dirname, "./src/react/api/types.ts"),
        "@react": path.resolve(__dirname, "./src/react"),
      },
    },
  };
});
