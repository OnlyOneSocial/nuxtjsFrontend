import axios from 'axios'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    server: {
        host: '0.0.0.0',
        port: 8111
    },
    head: {
        title: 'Only One',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                name: 'description',
                content: '',
                hid: 'description'
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                href: '/icons/favicon.png'
            },
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/icons/favicon.ico'
            }
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
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/axios',
        '~/plugins/devel'
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
            {
                code: 'en',
                iso: 'en-US',
                file: 'en.js',
                dir: 'ltr'
            },
            {
                code: 'ru',
                iso: 'ru-RU',
                file: 'ru.js',
                dir: 'ltr'
            }
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
    build: {}
}
