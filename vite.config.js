import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting — prevents jsPDF + html2canvas (360KB)
         * from blocking the initial page load.
         *
         * BEFORE: single 664KB bundle loaded on first visit
         * AFTER:  ~200KB initial, jsPDF loaded only when user clicks Resume
         */
        manualChunks: {
          // React core — changes rarely, long-term cacheable
          'vendor-react': ['react', 'react-dom'],
          // UI icons — loaded with first render but separate cache key
          'vendor-icons': ['lucide-react'],
          // EmailJS — only needed on contact form submit
          'vendor-email': ['@emailjs/browser'],
          // jsPDF + html2canvas — ONLY loaded when Download Resume is clicked
          // (dynamic import in generateResume.js)
          'vendor-pdf': ['jspdf'],
        },
      },
    },
    // Raise chunk size warning threshold slightly — we know about the pdf chunk
    chunkSizeWarningLimit: 600,
  },
});