const heapdump = require('heapdump')

setInterval(() => {
  heapdump.writeSnapshot(function (_, filename) {
    console.log('dump written to', filename)
  })
}, (5 * 60) * 1000)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    API_HOST: process.env.API_HOST || 'http://localhost:3030'
  },

  /*
  ** Router middleware
  */
  router: {
    middleware: ['auth']
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
