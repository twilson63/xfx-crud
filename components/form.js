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

var header = require('./helpers/header')
var headerRow = require('./helpers/header-row')
var fab = require('./helpers/fab')
var fabColored = require('./helpers/fab-colored')

var title = require('./helpers/title')
var spacer = require('./helpers/spacer')

var content = require('./helpers/content')

module.exports = (state) => {
  function Hook() {}
  Hook.prototype.hook = (node, propertyName, previousValue) => {
    setTimeout(function() {
      //var model = document.querySelector('#docBody')
      var editor = ace.edit(node)
      // var h = window.getComputedStyle(document.body).height
      // document.querySelector('#editor').setAttribute('style', 'height: ' + h)

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
      session.setValue(state.data.body)
      editor.getSession().on('change', function() {
        state.data.body = editor.getSession().getValue()
      })

    }, 200)
  }

  var action = state.data._id ? '/update' : '/create'
  var cancel = state.folder_id ? state.folder_id : ''
  return [
    header([
      headerRow([
        title([
          h('span.mdl-layout--large-screen-only','C2C'),
          when(state.name).then(() => ' * ' + state.name)
        ]),
        spacer(),
        fab('button', 'save', {
          'ev-click': sendClick(state.actions.save, false),
          style: {
            marginRight: '10px'
          }
        }),
        fabColored('button', 'keyboard_backspace', {
          'ev-click': sendClick(state.actions.save, true)
        })
      ]),
    ]),
    content([
      h('form', [
        h('div', { id: 'editor', 'my-hook': new Hook(), style: {height: '1000px'}})
      ])

    ])
  ]
}
