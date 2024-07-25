import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

declare const __dirname: string; // Add this line

export default defineConfig({
  plugins: [react()],
  mode: 'development',
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background.ts')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});
