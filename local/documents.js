var P = require('bluebird')
var PouchDB = require('pouchdb')
var db = PouchDB('documents')
var jwt = require('jsonwebtoken')
var respond = require('../lib/palmetto-respond').respond
var error = require('../lib/palmetto-respond').error

module.exports = (ee, options) => {
  var secret = null
  var remoteDb = null

  function verify (token) {
    return new P((resolve, reject) => {
      jwt.verify(token, new Buffer(secret, 'base64'), (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded)
      })
    })
  }

  ee.on('/documents/sync', (event) => {
    secret = event.object.secret
    remoteDb = PouchDB(event.object.remoteDb)
    PouchDB.sync(db, remoteDb, {
      live: true,
      retry: true
    })
    console.log('syncing database')
    respond(ee, event)({ok: true})
  })

  ee.on('/documents/folder', (event) => {
    verify(event.actor.token).then((decoded) => db.query(function (doc) {
      if (doc.parent) {
        emit(doc.parent, { _id: doc._id, name: doc.name })
      }
    }, { key: event.object.folder }))
    /* TODO: add a document to return back to previous folder */
    .then((result) => result.rows.map((d) => d.value))
    .then(respond(ee, event))
    .catch((err) => {
      console.log(err)
      error(ee, event)
    })
  })

  ee.on('/documents/list', (event) => {
    verify(event.actor.token).then((decoded) => db.query(function (doc) {
      if (!doc.parent) {
        emit({ _id: doc._id, name: doc.name })
      }
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
