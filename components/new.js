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
      // var editor = ace.edit('editor')
      // var session = editor.getSession()
      // //session.setMode('ace/mode/javascript')
      // session.setMode('ace/mode/' + mode)
      // console.log('set mode to ' + mode)
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
