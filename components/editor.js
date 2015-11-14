var h = require('xfx').h

var ace = require('brace')
require('brace/mode/javascript')
require('brace/theme/monokai')

function Hook() {}
Hook.prototype.hook = (node, propertyName, previousValue) => {
  setTimeout(function() {
    var editor = ace.edit(node)
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/monokai')
  }, 100)
}

module.exports = component
component.render = render

function component () {
  return { }
}

function render (state) {
  return h('#editor', { 'my-hook': new Hook(), style: { height: '400px'} })
}
