var h = require('xfx').h

module.exports = component
component.render = render

function component () {
  return {
    data: {_id: 1, name: 'Beep'}
  }
}

function render (state) {
  return h('div', [
    h('h1', state.data.name),
    h('div', state.data.body),
    h('ul', [
      h('li', [ h('a', { href: '/' + state.data._id + '/edit'}, ['edit'])]),
      h('form', { method: 'POST', action: '/remove'}, [
        h('input', { type: 'hidden', name: '_id', value: state.data._id }),
        h('input', { type: 'hidden', name: '_rev', value: state.data._rev }),
        h('button', ['remove'])
      ]),
      h('li', [ h('a', { href: '/'}, ['Home'])])
    ])

  ])
}
