/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: command === 'serve' ? '/' : '/cv/', // Raíz en desarrollo, /cv/ en producción
    build: {
      outDir: 'dist',
      sourcemap: command === 'serve', // Solo sourcemaps en desarrollo
      // Optimizaciones de bundle
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            // Separar vendor chunks para mejor caching
            vendor: ['react', 'react-dom'],
            i18n: [
              'react-i18next',
              'i18next',
              'i18next-browser-languagedetector',
            ],
            pdf: ['html2canvas', 'jspdf'],
          },
        },
      },
      // Optimizar assets
      assetsInlineLimit: 4096, // Inline assets menores a 4KB
      cssCodeSplit: true, // Separar CSS por chunks
      minify: 'esbuild' as const, // Usar esbuild para minificación (más rápido que terser)
    },
    // Optimizaciones de desarrollo
    server: {
      hmr: {
        overlay: false, // Desactivar overlay de errores para mejor performance
      },
    },
    // Optimizar dependencias
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-i18next',
        'i18next',
        'i18next-browser-languagedetector',
      ],
      exclude: ['html2canvas', 'jspdf'], // Lazy load estas dependencias pesadas
    },
    // Configuración de assets
    assetsInclude: ['**/*.woff', '**/*.woff2'],
  };

  if (command === 'serve' || process.env.NODE_ENV === 'test') {
    return {
      ...config,
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
      },
    };
  }

  return config;
});
