var h = require('xfx').h
var when = require('../lib/when-then')

module.exports = component
component.render = render

function component () {
  return {
    data: [{ name: 'one.md', _id: 1}],
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
          when(state.folder).then(() => [
            ' * ',
            h('a', { target: '_new', href: 'http://' + state.folder + '.w3foo.com' }, [state.folder])
          ])
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
