import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const frontend_port =
  process.env.FRONTEND_PORT != undefined ? process.env.FRONTEND_PORT : '3002';

const API_URL = process.env.API_URL;
const WS_URL = process.env.WS_URL;

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../.env',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: parseInt(frontend_port),
    proxy: {
      '/api': {
        target: API_URL || `http://localhost:3001`,
        secure: false,
        changeOrigin: false,
      },
      '/ws': {
        target: WS_URL || `ws://localhost:3001`,
        secure: false,
        changeOrigin: false,
      },
    },
  },
});
