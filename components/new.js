var h = require('xfx').h
var xtend = require('xfx').xtend

var bindState = require('xfx').bindState
var update = require('xfx').update

var form = require('./form')
var page = require('page')

module.exports = component
component.render = form

function component () {
  var state = {
    data: {
      type: 'document',
      name: 'untitled.html',
      body: ''
    },
    mode: 'html',
  }
  state.actions = bindState({
    save: function (state, close) {
      var editor = ace.edit('editor')
      if (state.data.name === 'untitled.html') {
        state.data.name = prompt('Enter Filename', state.data.name)
        var target = close ? '/document/close' : '/document/save'
        var data = xtend({}, state.data)
        // clear data
        state.data = { name: 'untitled.html' }
        // this could be passed in via init - state.submit(...)
        page(target, { body: data })
      }
    }
  }, state)
  return state
}
