var response = require('../lib/palmetto-events').response
var responseError = require('../lib/palmetto-events').responseError

exports.respond = (ee, event) => (result) => ee.emit('send', response(event, result))
exports.error = (ee, event) => (err) => ee.emit('send', responseError(event, err))
