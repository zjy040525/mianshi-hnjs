import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
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
});
