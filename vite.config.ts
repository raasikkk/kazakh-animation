import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom'] },
  server: { port: 5176 },
  build: { rollupOptions: { output: { manualChunks: (id) => id.includes('/three/') ? 'sculpture' : undefined } } },
})
