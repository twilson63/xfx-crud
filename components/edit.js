var h = require('xfx').h
var bindState = require('xfx').bindState

var form = require('./form')
var page = require('page')

module.exports = component
component.render = form

function component () {
  var state = {
    data: 0
  }
  state.actions = bindState({
    remove: function (state) {
      page('/remove', { body: state.data })
    },
    submit: function (state, body) {
      page('/update', { body: {
        _id: body._id,
        _rev: body._rev,
        type: body.type,
        name: body.name,
        body: body.body
      }})
    }
  }, state)
  return state
}
