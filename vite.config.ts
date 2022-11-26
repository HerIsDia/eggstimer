import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'robots.txt',
      'apple-touch-icon.png',
      'logo.png',
      'sound.mp3'
    ],
    manifest: {
      name: '🥚 EggsTimer.',
      short_name: 'EggsTimer',
      description: 'Simple timer for your eggs.',
      theme_color: '#1a232b',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'android-chrome-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      sourcemap: true
    },
  }),
  ],
})
