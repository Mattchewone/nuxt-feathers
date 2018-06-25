import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

let browserClient = null
export const host = process.env.API_HOST

export default (storage) => {
  const socket = io(host, {
    transports: ['websocket']
  })

  const feathersClient = feathers()
    .configure(socketio(socket))
    .configure(auth({ storage }))

  return feathersClient
}

// Set up a browser instance so this can be re-used
// Useful if we need to interact with the API and not need to use Vuex
if (process.browser) {
  const socket = io(host, {
    transports: ['websocket']
  })

  browserClient = feathers()
    .configure(socketio(socket))
    .configure(auth({ storage: new CookieStorage() }))
}
export { browserClient }
