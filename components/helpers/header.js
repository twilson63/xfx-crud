var h = require('xfx').h
var sendClick = require('xfx').sendClick

var when = require('../../lib/when-then')

module.exports = (title, route, modeFn, currentMode, list) => {
  return h('header.mdl-layout__header', [
    h('.mdl-layout__header-row', [
      /* Title */,
      h('span.mdl-layout-title', [ title,
        when(list.folder).then(() => ' - ' + list.folder)
      ]),
      /* Add spacer, to align navigation to the right */,
      h('div.mdl-layout-spacer'),
      /* Navigation. We hide it in small screens. */,
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

      // h('button#mode.mdl-button.mdl-js-button.mdl-button--icon', [
      //   h('i.material-icons', ['more_vert'])
      // ]),
      // h('ul.mdl-menu.mdl-menu--bottom-right.mdl-js-menu.mdl-js-ripple-effect', {for: 'mode'}, [
      //   h('li.mdl-menu__item', ['HTML']),
      //   h('li.mdl-menu__item', ['JS']),
      //   h('li.mdl-menu__item', ['CSS'])
      // ])

    ])
  ])
}
