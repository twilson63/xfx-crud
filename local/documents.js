var P = require('bluebird')
var PouchDB = require('pouchdb')
var db = PouchDB('documents')
var jwt = require('jsonwebtoken')
var secret = 'JGLe0b9UkFBmmnlHioo2e48sAgLj84ZcGYiG_IqY6sw1-tstqGa_JlXZ-c-jEmA0'

var respond = require('../lib/palmetto-respond').respond
var error = require('../lib/palmetto-respond').error

module.exports = (ee) => {
  function verify (token) {
    return new P((resolve, reject) => {
      jwt.verify(token, new Buffer(secret, 'base64'), (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded)
      })
    })
  }

  ee.on('/documents/list', (event) => {
    verify(event.actor.token).then((decoded) => db.query(function (doc) {
      emit({ _id: doc._id, name: doc.name })
    }))
    .then((result) => result.rows.map((d) => d.key))
    .then(respond(ee, event))
    .catch((err) => {
      console.log(err)
      error(ee, event)
    })
  })

  ee.on('/documents/get', (event) => {
    verify(event.actor.token)
      .then((decoded) => db.get(event.object).then(respond(ee, event)))
      .catch((err) => {
        error(ee, event)
      })
  })

  ee.on('/documents/create', (event) => {
    verify(event.actor.token)
      .then((decoded) => db.post(event.object).then(respond(ee, event)))
      .catch(error(ee, event))
  })

  ee.on('/documents/update', (event) => {
    verify(event.actor.token)
      .then((decoded) => db.put(event.object).then(respond(ee, event)))
      .catch(error(ee, event))
  })

  ee.on('/documents/remove', (event) => {
    verify(event.actor.token)
      .then((decoded) => db.remove(event.object).then(respond(ee, event)))
      .catch(error(ee, event))
  })
}
