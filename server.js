var http = require('http')
var ecstatic = require('ecstatic')
var jsonBody = require('body/json')
var sendJSON = require('send-data/json')
var jwt = require('jsonwebtoken')
var secret = process.env.JWT_SECRET || 'JGLe0b9UkFBmmnlHioo2e48sAgLj84ZcGYiG_IqY6sw1-tstqGa_JlXZ-c-jEmA0'
var remoteDb = process.env.COUCHDB || 'http://admin:admin@localhost:5984/bold'

var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-upsert'))
var rdb = PouchDB(remoteDb)
rdb.putIfNotExists('_design/filters', {
    language: 'javascript',
    filters: {
      owner: function (doc, req) {
        if (doc.profile && doc.profile.user_id !== req.query.user_id) {
          return false
        }
        return true
      }.toString()
    }
  }, function (err, result) {
  if (err) return console.log(err)
})

rdb.putIfNotExists('_design/web', {
    language: 'javascript',
    views: {
      urls: {
        map: function (doc) {
          var url = '/'
          if (doc.type === 'document') {
            if (doc.parent) {
              url += doc.parent
            } else {
              url += doc.profile.nickname
            }
            url += '/' + doc.name
          }
          emit(url, doc.body)
        }.toString()
      }
    }
  }, function (err, result) {
  if (err) return console.log(err)
  console.log(result)
})

var server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/keys') {
    jsonBody(req, res, (err, body) => {
      if (err) return sendJSON(req, res, { message: err.message })
      // verify
      jwt.verify(body.token, new Buffer(secret, 'base64'), (err, decoded) => {
        if (err) return sendJSON(req, res, {message: err.message })
        sendJSON(req,res, {
          remoteDb: remoteDb,
          secret: secret
        })
      })
    })
    return
  }
  if (!~[
    '/bundle.js',
    '/material.min.js',
    '/material.blue_grey-amber.min.css',
    '/images/css.png',
    '/images/folder.jpg',
    '/images/html.png',
    '/images/js.jpg',
    '/images/md.png'
    ].indexOf(req.url)) {
      req.url = '/index.html'
  }

  ecstatic({ root: __dirname + '/www'})(req, res)
})

server.listen(process.env.PORT || 9966)
