var h = require('xfx').h

module.exports = component
component.render = render

function component () {
  return {
    data: [{ name: 'one', _id: 1}]
  }
}

var grid = require('./helpers/grid')
var cell = require('./helpers/cell')
var card = require('./helpers/card')

function render (state) {
  var li = (v) => cell(3, [
    card(v.name, '/' + v._id + '/edit')
  ])
  return grid(state.data.map(li))
}
