import { createRequire } from 'module'
const require = createRequire(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  alias: {
    tslib: require.resolve('tslib/tslib.es6.js'),
  },

  build: {
    transpile: ['tslib', '@supabase/functions-js', '@supabase/gotrue-js', '@vuepic/vue-datepicker'],
  },

  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

    r2AccountId: process.env.R2_ACCOUNT_ID,
    r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    r2BucketName: process.env.R2_BUCKET_NAME,
    maxR2TotalBytes: Number(process.env.MAX_R2_TOTAL_BYTES || 10737418240),
    maxR2UserBytes: Number(process.env.MAX_R2_USER_BYTES || 524288000),
    maxR2FileBytes: Number(process.env.MAX_R2_FILE_BYTES || 3145728),
    maxItemImages: Number(process.env.MAX_ITEM_IMAGES || 1),

    public: {
      apiBase: '',
      siteUrl: '',
      appName: 'Reseller Calculator',
      defaultLocale: 'uk',
      defaultCurrency: 'UAH',

      supabaseUrl: process.env.SUPABASE_URL,
      supabaseImgBucket: process.env.NUXT_PUBLIC_IMG_BUCKET,
      supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY,
    },
  },

  app: {
    head: {
      titleTemplate: 'Reseller Calculator',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f172a' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
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

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/image',
    'pinia-plugin-persistedstate/nuxt',
  ],

  dayjs: {
    locales: ['uk', 'en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'uk',
    defaultTimezone: 'Europe/Kyiv',
  },

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

  vite: {
    optimizeDeps: {
      include: [
        'tslib',
        'vue',
        'vue-router',
        'pinia',
        'pinia-plugin-persistedstate',
        '@supabase/ssr',
        'dayjs-nuxt',
      ],
    },
    ssr: {
      noExternal: ['tslib', 'vue', 'vue-router', 'pinia', 'pinia-plugin-persistedstate'],
    },
  },

  piniaPluginPersistedstate: {
    storage: 'cookies',
    debug: true,
  },
})
