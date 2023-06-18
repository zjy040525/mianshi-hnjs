import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/vendors.[hash].js',
        chunkFileNames: 'assets/app.[hash].js',
        assetFileNames: chunkInfo => {
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
