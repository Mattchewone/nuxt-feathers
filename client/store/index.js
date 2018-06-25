import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient, { browserClient } from './feathers-client'
import feathersVuex, { initAuth } from 'feathers-vuex'

const publicPages = [
  'index'
]

const createStore = () => {
  let plugins = []
  if (process.browser) {
    const { service: browserService, auth: browserAuth, FeathersVuex } = feathersVuex(browserClient, { idField: '_id', enableEvents: false })
    Vue.use(FeathersVuex)

    plugins = [
      browserService('users', { paginate: true }),
      browserService('movies', { paginate: true }),
      browserAuth({
        userService: 'users',
        state: {
          publicPages
        }
      })
    ]
  }

  return new Vuex.Store({
    state: {},
    actions: {
      nuxtServerInit ({ commit, dispatch, state }, { req, store }) {
        const storage = {
          getItem (key) {
            return store.state.auth ? store.state.auth.accessToken : ''
          },
          setItem (key, value) {
            store.state.auth.accessToken = value
          },
          removeItem (key) {
            store.state.auth.accessToken = null
          }
        }

        const client = feathersClient(storage)
        const { service, auth, FeathersVuex } = feathersVuex(client, { idField: '_id', enableEvents: false })
        Vue.use(FeathersVuex)

        service('users', { paginate: true })(store)
        service('movies', { paginate: true })(store)
        auth({
          userService: 'users',
          state: {
            publicPages
          }
        })(store)

        return initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'feathers-jwt'
        })
          .then(response => {
            return dispatch('auth/authenticate', { accessToken: store.state.auth.accessToken, strategy: 'jwt' })
              .catch(_ => {})
          })
      }
    },
    plugins
  })
}

export default createStore
