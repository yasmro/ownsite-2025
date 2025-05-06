// @ts-check
import { defineConfig } from 'astro/config';
import VitePWA from "@vite-pwa/astro";
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "en",
  },
  vite: {
      plugins: [tailwindcss()]
	},

  integrations: [react(), VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Yu Ohno\'s Portfolio',
        short_name: 'yuOhno_portfolio_2025',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),]
});