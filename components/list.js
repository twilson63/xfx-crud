var h = require('xfx').h
var when = require('../lib/when-then')

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

var header = require('./helpers/header')
var headerRow = require('./helpers/header-row')
var fab = require('./helpers/fab')
var fabColored = require('./helpers/fab-colored')

var title = require('./helpers/title')
var spacer = require('./helpers/spacer')

var content = require('./helpers/content')
var _ = require('underscore')

//'Bold', state.route, state.newData.actions.setMode, state.newData.mode, state.list)

function render (state) {
  var li = (v) => {
    return cell(2, [
      card(_(v.name.split('/')).last(), '/' + v._id)
    ])
  }

  return [
    header([
      headerRow([
        title([
          h('span.mdl-layout--large-screen-only','C2C'),
          when(state.folder).then(() => ' * ' + state.folder)
        ]),
        spacer(),
        when(state.folder).then(() => fab('a','keyboard_backspace', {
          href: '/' + (state.parent_id || ''),
          style: { marginRight: '10px'}
        })),
        fab('a', 'folder', {
          href: '/folder',
          style: { marginRight: '10px'}
        }),
        fabColored('a', 'add', {
          href: '/new'
        })
      ])
    ]),
    content([
      grid(state.data.map(li))
    ])
  ]
}

/*
[
  h('.mdl-layout__header-row', [

    h('span.mdl-layout-title', [ title,
      when(list.folder).then(() => ' - ' + list.folder)
    ]),
    h('div.mdl-layout-spacer'),
    when(route === 'list' && list.folder).then(() => h('a.mdl-button.mdl-js-button.mdl-button--fab', {
      href: '/',
      style: { marginRight: '10px'}
    }, [
      h('i.material-icons',['home'])
    ])),
    when(route === 'list').then(() => h('a.mdl-button.mdl-js-button.mdl-button--fab', {
      href: '/folder',
      style: { marginRight: '10px'}
    }, [
      h('i.material-icons',['folder'])
    ])),
    when(route === 'list').then(() => h('a.mdl-button.mdl-js-button.mdl-button--fab.mdl-button--colored', {
      href: '/new'
    }, [
      h('i.material-icons',['add'])
    ])),
    when(route === 'new').then(() => h('button.mdl-button.mdl-js-button', {
      className: currentMode === 'html' ? 'mdl-button--accent' : null,
      'ev-click': sendClick(modeFn,'html')
    }, ['HTML'])),
    when(route === 'new').then(() => h('button.mdl-button.mdl-js-button', {
      className: currentMode === 'javascript' ? 'mdl-button--accent' : null,
      'ev-click': sendClick(modeFn,'javascript')
    }, ['JS'])),
    when(route === 'new').then(() => h('button.mdl-button.mdl-js-button', {
      className: currentMode === 'css' ? 'mdl-button--accent' : null,
      'ev-click': sendClick(modeFn,'css')
    }, ['CSS'])),
    when(route === 'new').then(() => h('button.mdl-button.mdl-js-button', {
      className: currentMode === 'markdown' ? 'mdl-button--accent' : null,
      'ev-click': sendClick(modeFn,'markdown')
    }, ['MD']))


  ])
]
*/
