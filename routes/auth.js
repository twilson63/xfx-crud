var page = require('page')
var update = require('xfx').update

var lock = new Auth0Lock('mxx0nXeiWtGozSiGwRAPiUnsGMnxwgzV', 'twilson63.auth0.com')

module.exports = (state) => {
  return Object.freeze({
    login: (ctx) => {
      state.route = 'login'
      lock.show({
        closable: false
      }, (err, profile, id_token) => {
        if (err) { return console.log(err) }
        state.profile = profile
        state.id_token = id_token
        page.redirect('/')
      })
    },
    logout: (ctx) => {

    }
  })
}
