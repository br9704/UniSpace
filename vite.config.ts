import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'UniSpace',
        short_name: 'UniSpace',
        description: 'Live campus occupancy. Your GPS never leaves your device.',
        start_url: '/',
        display: 'standalone',
        // SIGNAL: the splash and OS chrome must match the app, not the
        // retired UoM palette they were left on.
        background_color: '#050505',
        theme_color: '#050505',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'mapbox-tiles', expiration: { maxAgeSeconds: 60 * 60 * 24 * 7 } }
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'supabase-api', expiration: { maxAgeSeconds: 300 } }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: { '@': '/src' }
  },
  build: {
    rollupOptions: {
      output: {
        /*
         * Split the heavy, rarely-changing dependencies into their own chunks.
         *
         * Without this they sit in the entry bundle, so any change to app code
         * invalidates megabytes of vendor code a returning user already had
         * cached. Mapbox alone is 1.6 MB and changes a few times a year.
         */
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined
          // Mapbox is dynamically imported by MapSurface; naming it keeps it in
          // one cacheable file instead of being split across route chunks.
          if (id.includes('mapbox-gl')) return 'mapbox'
          // Supabase is genuinely eager — every screen reads data — so this is
          // purely a caching win: it survives app-code deploys untouched.
          if (id.includes('@supabase')) return 'supabase'
          //
          // Recharts is deliberately NOT listed. It is only reachable through
          // the lazily-loaded BuildingCard, and naming it here made rolldown
          // hoist it into a *static* import of the entry chunk — adding 108 KB
          // gzip to the landing route to "optimise" it.
          //
          return undefined
        },
      },
    },
    // Mapbox is irreducibly large; warning about it on every build trains the
    // eye to ignore the warning. The other chunks stay under the default.
    chunkSizeWarningLimit: 900,
  }
})
