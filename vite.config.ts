import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // 因为云环境中没有.env/.env.production这样的文件
  // 需要适配在云环境中运行build能通过import.meta.env正常获取到process.env的变量

  // 加载process.env的变量
  dotenv.config();
  dotenv.config({
    path: `./.env.${mode}`,
  });
  return {
    // 载入dotenv后，映射到import.meta.env
    define: {
      'import.meta.env': {
        VITE_APP_NAME: process.env.VITE_APP_NAME,
        VITE_DOCUMENT_NAME: process.env.VITE_DOCUMENT_NAME,
        VITE_API_URL: process.env.VITE_API_URL,
        VITE_WS_URL: process.env.VITE_WS_URL,
      },
    },
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/vendors.[hash].js',
          chunkFileNames: 'assets/app.[hash].js',
          assetFileNames(chunkInfo) {
            let prefix = '[name]';
            if (chunkInfo.name.endsWith('.css')) {
              prefix = 'app';
            }
            return `assets/${prefix}.[hash].[ext]`;
          },
        },
      },
    },
  };
});
