const movies = require('./movies/movies.service.js')
const users = require('./users/users.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(movies)
  app.configure(users)
}
