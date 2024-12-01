import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const env = loadEnv('', '..', '');

const frontend_port =
  env.FRONTEND_PORT != undefined ? env.FRONTEND_PORT : '3002';

const backend_host = env.LOCAL_HOST || env.NETWORK_HOST;
const backend_port = env.BACKEND_PORT;

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
        target: `http://${backend_host}:${backend_port}`,
        secure: false,
        changeOrigin: false,
      },
      '/ws': {
        target: `ws://${backend_host}:${backend_port}`,
        secure: false,
        changeOrigin: false,
      },
    },
  },
});
