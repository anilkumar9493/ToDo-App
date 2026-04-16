import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'ToDo App',
        short_name: 'ToDo',
        description: 'Simple task manager app',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/ToDo-App/',
        scope: '/ToDo-App/',
        icons: [
          {
            src: '/ToDo-App/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/ToDo-App/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    open: true,
    port: 2008
  },
  base: '/ToDo-App/',
})
