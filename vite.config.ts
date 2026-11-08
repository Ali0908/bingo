
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icons/apple-touch-icon.png',
      ],
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp}',
        ],
      },
      manifest: {
        name: 'Bingo',
        short_name: 'Bingo',
        description: 'Jeu de bingo avec tirage aléatoire',
        theme_color: '#16a05a',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
