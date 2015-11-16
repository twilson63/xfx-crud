var h = require('xfx').h
var when = require('../lib/when-then')

module.exports = component
component.render = render

var list = require('./list')
var newData = require('./new')
var edit = require('./edit')

function component () {
  return {
    route: '',
    list: list(),
    edit: edit(),
    newData: newData()
  }
}

var layout = require('./helpers/layout')

function render (state) {
  return layout([
    when(state.profile).then(() => [
      when(state.route === 'new')
        .then(() => newData.render(state.newData)),
      when(state.route === 'edit')
        .then(() => edit.render(state.edit)),
      when(state.route === 'list')
        .then(() => list.render(state.list)),
    ])
  ])
}
