var h = require('xfx').h
var bindState = require('xfx').bindState

var form = require('./form')
var page = require('page')

module.exports = component
component.render = form

function component () {
  var state = {
    data: 0,
    mode: 'html'
  }
  state.actions = bindState({
    remove: function (state) {
      page('/remove', { body: state.data })
    },
    save: function (state, close) {
      if (!close) {
        page('/document/save', { body: state.data })
      } else {
        page('/update', { body: state.data })
      }

    }
  }, state)
  return state
}
