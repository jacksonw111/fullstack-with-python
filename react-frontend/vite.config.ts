import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default ({ mode }) =>
  defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly', // 我们使用驼峰形式
      },
    },
    server: {
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_BASE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
