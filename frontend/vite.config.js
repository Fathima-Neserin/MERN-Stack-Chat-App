import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: path.resolve(__dirname, 'node_modules/buffer/'), // Correct absolute path
    },
  },
  optimizeDeps: {
    include: ['buffer'], // Ensure buffer is included in optimization
  },
});
