var request = require('./palmetto-events').request;
var P = require('bluebird')

module.exports = (ee) => {
  return (action, obj, token) => {
    var event = request('documents', action, obj, { token: token })

    return new P((resolve) => {
      ee.on(event.from, (response) => resolve(response.object))
      ee.emit('send', event)
    })
  }
}
