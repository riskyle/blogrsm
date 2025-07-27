import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],
  compatibilityDate: '2025-07-08',
  devtools: { enabled: true },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/auth/callback',
      exclude: ['/register', '/registered', '/login', '/confirm-email', '/', '/blog/**'],
    },
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
  },
  ssr: true,
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  plugins: [
    { src: '~/plugins/leaflet.client.js', mode: 'client' }
  ],
  css: ['~/assets/css/tailwind.css', 'leaflet/dist/leaflet.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})