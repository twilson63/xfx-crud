var page = require('page')
var update = require('xfx').update
var xhr = require('xhr')
var lock = new Auth0Lock('mxx0nXeiWtGozSiGwRAPiUnsGMnxwgzV', 'twilson63.auth0.com')

module.exports = (state, documents) => {
  return Object.freeze({
    login: (ctx) => {
      state.route = 'login'
      lock.show({
        closable: false
      }, (err, profile, id_token) => {
        if (err) { return console.log(err) }
        state.profile = profile
        state.id_token = id_token
        // setup db sync
        xhr.post('/keys',{
          json: {
            token: id_token
          }
        }, (e,r,b) => {
          if (e) return console.log(e)
          b.user_id = profile.user_id
          documents.sync(b).then((result) => page.redirect('/'))
        })

      })
    },
    logout: (ctx) => {

    }
  })
}
