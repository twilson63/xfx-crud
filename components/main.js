var h = require('xfx').h
var when = require('../lib/when-then')

module.exports = component
component.render = render

var list = require('./list')
var newData = require('./new')
var show = require('./show')
var edit = require('./edit')

function component () {
  return {
    route: 'list',
    list: list(),
    show: show(),
    edit: edit(),
    newData: newData()
  }
}

var layout = require('./helpers/layout')
var header = require('./helpers/header')
var content = require('./helpers/content')

function render (state) {
  return layout([
    header('Bold', state.route, state.newData.actions.setMode, state.newData.mode),
    content([
      when(state.route === 'list')
        .then(() => list.render(state.list)),
      when(state.route === 'new')
        .then(() => newData.render(state.newData)),
      when(state.route === 'show')
        .then(() => show.render(state.show)),
      when(state.route === 'edit')
        .then(() => edit.render(state.edit))
    ])
  ])
}
