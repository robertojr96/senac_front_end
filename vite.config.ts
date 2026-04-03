import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // porta do servidor de desenvolvimento
    open: true, // abre o browser automaticamente
    proxy: {
      // redireciona chamadas de API para o back-end
      "/api": "http://localhost:8080",
    },
  },
  build: {
    outDir: "dist", // pasta de saída do build
    sourcemap: true, // gera source maps para debug em produção
  },
});
