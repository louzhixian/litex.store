// Configuration for your app

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['i18n', 'axios', 'layer2', 'socketio'],

    css: ['app.styl'],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QBtnDropdown',
        'QIcon',
        'QAvatar',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QInput',
        'QSeparator',
        'QSpace',
        'QDialog',
        'QBanner',
        'QDrawer',
        'QScrollArea',
        'QBtnDropdown',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QMarkupTable',
        'QMenu',
        'QDialog',
        'QInnerLoading',
        'QSpinner',
        'QSpinnerBars'
      ],

      directives: ['Ripple', 'ClosePopup'],

      // Quasar plugins
      plugins: ['Notify', 'Loading']

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      env: ctx.dev ? {
        // API: JSON.stringify('http://localhost:7001'),
        // TO: JSON.stringify('0x85435801556be27ED7767bBc208B347012dDC91d')
        API: JSON.stringify('http://api.yamen.co:7001')
      } : {
        API: JSON.stringify('http://api.yamen.co:7001')
      },
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          src: 'statics/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  }
}
