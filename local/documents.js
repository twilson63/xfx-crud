var P = require('bluebird')
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-upsert'))

//var db = PouchDB('documents')
//var jwt = require('jsonwebtoken')
var respond = require('../lib/palmetto-respond').respond
var error = require('../lib/palmetto-respond').error
var uuid = require('uuid')

module.exports = (ee, options) => {
  var secret = null
  var remoteDb = null
  var db = null

  function verify (token) {
    return new P((resolve, reject) => {
      //jwt.verify(token, new Buffer(secret, 'base64'), (err, decoded) => {
        //if (err) return reject(err)
        //resolve(decoded)
        resolve({ok: true})
      //})
    })
  }

  ee.on('/documents/sync', (event) => {
    db = PouchDB(event.object.user_id)
    secret = event.object.secret
    remoteDb = PouchDB(event.object.remoteDb)
    PouchDB.sync(db, remoteDb, {
      live: true,
      retry: true,
      filter: 'filters/owner',
      query_params: { user_id: event.object.user_id }
    })
    //console.log('syncing database')
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
    // TODO: Need to confirm (folder + name) is unique
    verify(event.actor.token)
      .then((decoded) => db.post(event.object).then(respond(ee, event)))
      .catch(error(ee, event))
  })

  ee.on('/documents/update', (event) => {
    if (!event.object._id) event.object._id = uuid.v4()
    verify(event.actor.token)
      .then((decoded) => db.put(event.object).then(respond(ee, event)))
      .catch(error(ee, event))
  })

  ee.on('/documents/remove', (event) => {
    verify(event.actor.token)
      .then((decoded) => {
        db.upsert(event.object, function (doc) {
          doc._deleted = true
          return doc
        }).then(respond(ee, event))
      })
      .catch(error(ee, event))
  })
}
