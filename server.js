var http = require('http')
var ecstatic = require('ecstatic')
var jsonBody = require('body/json')
var sendJSON = require('send-data/json')
var jwt = require('jsonwebtoken')
var secret = 'JGLe0b9UkFBmmnlHioo2e48sAgLj84ZcGYiG_IqY6sw1-tstqGa_JlXZ-c-jEmA0'
var remoteDb = 'http://admin:admin@localhost:5984/bold'
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
