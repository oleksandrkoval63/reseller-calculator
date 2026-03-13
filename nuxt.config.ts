export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: '',
      siteUrl: '',
      appName: 'Reseller Calculator',
      defaultLocale: 'uk',
      defaultCurrency: 'UAH',
    },
  },

  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia'],
    },
    ssr: {
      noExternal: ['vue', 'vue-router', 'pinia'],
    },
  },

  app: {
    head: {
      titleTemplate: '%s · Reseller Calculator',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f172a' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    langDir: '../i18n/locales',
    defaultLocale: 'uk',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'uk', name: 'Українська', language: 'uk-UA', file: 'uk.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    baseUrl: 'https://reseller-calculator-theta.vercel.app',
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  typescript: {
    strict: true,
    typeCheck: 'build',
  },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/eslint', '@nuxt/image'],

  css: ['~/assets/styles/main.scss'],

  imports: {
    dirs: [
      'app/composables',
      'shared/utils',
      'shared/constants',
      'entities/**/model',
      'features/**/composables',
    ],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
