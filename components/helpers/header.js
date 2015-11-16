var h = require('xfx').h
var sendClick = require('xfx').sendClick

var when = require('../../lib/when-then')

module.exports = (contents) => {
  return h('header.mdl-layout__header', contents)
}
