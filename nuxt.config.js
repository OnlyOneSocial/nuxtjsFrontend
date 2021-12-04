import axios from 'axios'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    host: '0.0.0.0', // default: localhost
    port: 8111
  },
  head: {
    title: '%s - Social network',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      { name: 'description', content: '', hid: 'description' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'theme-color', property: 'theme-color', content: '#6f2cff' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Social network' },
      { hid: 'robots', name: 'robots', content: 'index,follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icons/favicon.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet preload prefetch', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;900&display=swap', crossorigin: 'anonymous' }
    ]
  },
  cache: {
    // ....
    store: {
      type: 'redis',
      host: 'localhost',
      ttl: 10 * 60,
      configure: [
        // these values are configured
        // on redis upon initialization
        ['maxmemory', '200mb'],
        ['maxmemory-policy', 'allkeys-lru']
      ]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/variables.css',
    '~/assets/css/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-ssr-cache',
    'cookie-universal-nuxt',
    '@nuxtjs/recaptcha',
    '@nuxtjs/sitemap',
    '@nuxtjs/yandex-metrika',
    '@nuxtjs/i18n'
  ],
  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    },
    langDir: 'lang/',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js', dir: 'ltr' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.js', dir: 'ltr' }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        fr: {
          welcome: 'Bienvenue'
        },
        es: {
          welcome: 'Bienvenido'
        }
      }
    }
  },
  yandexMetrika: {
    id: '86443781',
    webvisor: false
    // clickmap:true,
    // useCDN:false,
    // trackLinks:true,
    // accurateTrackBounce:true,
  },
  sitemap:
    {
      path: '/sitemap.xml',
      hostname: 'https://only-one.su',
      gzip: false,
      routes: ['/users', '/login', '/about'],
      sitemaps: [
        {
          path: '/sitemap-main.xml',
          routes: ['/users', '/login', '/about']
        },
        {
          path: '/sitemap-users.xml',
          exclude: ['/users', '/login', '/about', '/news', '/'],
          routes: async () => {
            const array = []
            const { data } = await axios.get('https://social.katelinlis.xyz/api/user/get')
            array.push(...data.users.map(user => `/user/${user.id}`))
            array.push(...data.users.map(user => `/user/${user.id}/friends`))
            return array
          }
        }
      ]
    },

  recaptcha: {
    siteKey: '6LeM-igcAAAAAJNQUHNOzpAH1jzTgruIMcjtUTsJ', // Site key for requests
    version: 2

  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
