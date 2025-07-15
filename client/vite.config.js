import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy:
        command === "serve"
          ? {
              "/api": {
                target: "https://newsportal-pl6g.onrender.com",
                changeOrigin: true,
                secure: false,
              },
            }
          : undefined,
    },
  };
});

