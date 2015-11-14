var h = require('xfx').h
var bindState = require('xfx').bindState
var update = require('xfx').update

var form = require('./form')
var page = require('page')

module.exports = component
component.render = form

function component () {
  var state = { data: {}, mode: 'html' }
  state.actions = bindState({
    setMode: function (state, mode) {
      state.mode = mode
      update()
    },
    submit: function (state, body) {
      page('/create', { body: {
        type: body.type,
        name: body.name,
        body: body.body
      }})
    }
  }, state)
  return state
}
