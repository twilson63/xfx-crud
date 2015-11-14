var h = require('xfx').h
var when = require('../../lib/when-then')

module.exports = (title, route) => {
  return h('header.mdl-layout__header', [
    h('.mdl-layout__header-row', [
      /* Title */,
      h('span.mdl-layout-title', [ title ]),
      /* Add spacer, to align navigation to the right */,
      h('div.mdl-layout-spacer'),
      /* Navigation. We hide it in small screens. */,
      when(route === 'list').then(() => h('nav.mdl-navigation.mdl-layout--large-screen-only', [
        h('a.mdl-navigation__link', { attributes: {
            'href': '/new'
        } }, [ "New Document" ])
      ])),
      when(route === 'new').then(() => h('button.mdl-button.mdl-js-button.mdl-button--accent', ['HTML'])),
      when(route === 'new').then(() => h('button.mdl-button.mdl-js-button', ['JS'])),
      when(route === 'new').then(() => h('button.mdl-button.mdl-js-button', ['CSS']))

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
