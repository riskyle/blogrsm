// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@nuxt/image',
  ],
  compatibilityDate: '2025-07-08',
  devtools: { enabled: true },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/auth/callback',
      exclude: ['/register', '/login', '/confirm-email'],
      include: ['/'],
    },
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
  },
  css: [
    '~/assets/css/general.css',
  ],
  ssr: true,
})
