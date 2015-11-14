var moment = require('moment')
var uuid = require('uuid')

exports.request = (subject, verb, object, actor) => {
  return Object.freeze({
    from: uuid.v4(),
    to: '/' + [subject, verb].join('/'),
    subject: subject,
    verb: verb,
    object: object,
    actor: actor,
    dateSubmitted: moment().utc().format()
  })
}

exports.response = (event, dataObject) => {
  return Object.freeze({
    to: event.from,
    from: event.to,
    subject: event.subject + '-response',
    verb: event.verb + '-response',
    object: dataObject,
    dateSubmitted: event.dateSubmitted,
    duration: moment().diff(event.dateSubmitted)
  })
}

exports.responseError = (event, dataObject) => {
  return Object.freeze({
    to: event.from,
    from: event.to,
    subject: event.subject + '-error',
    verb: event.verb + '-error',
    object: dataObject,
    dateSubmitted: event.dateSubmitted,
    duration: moment().diff(event.dateSubmitted),
    error: true
  })
}
