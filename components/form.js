var h = require('xfx/h')
var sendSubmit = require('xfx').sendSubmit
var sendClick = require('xfx').sendClick

var when = require('../lib/when-then')

var ace = require('brace')
require('brace/mode/javascript')
require('brace/mode/html')
require('brace/mode/markdown')
require('brace/mode/css')

require('brace/theme/monokai')

var textfield = require('./helpers/textfield')
var fab = require('./helpers/fab')
var form = require('./helpers/form')
var hidden = require('./helpers/hiddenfield')

module.exports = (state) => {
  function Hook() {}
  Hook.prototype.hook = (node, propertyName, previousValue) => {
    setTimeout(function() {
      var model = document.querySelector('#docBody')
      var editor = ace.edit(node)
      editor.$blockScrolling = Infinity
      var session = editor.getSession()
      //session.setMode('ace/mode/javascript')
      if (state.data.name && ~state.data.name.indexOf('.js')) {
        session.setMode('ace/mode/javascript')
      }
      if (state.data.name && ~state.data.name.indexOf('.html')) {
        session.setMode('ace/mode/html')
      }
      if (state.data.name && ~state.data.name.indexOf('.css')) {
        session.setMode('ace/mode/css')
      }
      if (state.data.name && ~state.data.name.indexOf('.md')) {
        session.setMode('ace/mode/markdown')
      }
      if (!state.data.name) {
        session.setMode('ace/mode/' + state.mode)
      }
      editor.setTheme('ace/theme/monokai')
      // sync editor and input
      session.setValue(model.value)
      editor.getSession().on('change', function() {
        model.value = editor.getSession().getValue()
      })

    }, 100)
  }

  var action = state.data._id ? '/update' : '/create'

  return h('form', { 'ev-submit': sendSubmit(state.actions.submit) }, [
    hidden('type', 'document'),
    when(state.data._id).then(() => hidden('_id', state.data._id)),
    when(state.data._rev).then(() => hidden('_rev', state.data._rev)),
    h('input#docBody', { type: 'hidden', name: 'body', value: state.data.body}),
    h('div', { id: 'editor', 'my-hook': new Hook(), style: {height: '400px'}}),
    fab('done', { position: 'absolute', right: '100px' }), //, { position: 'absolute', top: '63px', right: '100px', 'z-index': '1000'}),
    h('a.mdl-button.mdl-js-button.mdl-button--fab', {href: '/', style: { position: 'absolute', right: '30px' }}, [
      h('i.material-icons', 'close')
    ]),
    when(state.data._id).then(() => h('a.mdl-button.mdl-js-button.mdl-button--fab', {
      'ev-click': sendClick(state.actions.remove),
      style: { position: 'absolute', left: '30px' }}, [
      h('i.material-icons', 'delete')
    ])),
    textfield('name', state.data.name, 'Name', { marginLeft: '150px'})
  ])
}
