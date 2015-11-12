var h = require('xfx/h')
var when = require('../lib/when-then')

module.exports = (state) => {
  var action = state.data._id ? 'update' : 'create'

  return h('form', { method: 'POST', action: '/' + action }, [
    h('input', { type: 'hidden', name: 'type', value: 'document'}),
    when(state.data._id)
      .then(() => h('input', { type: 'hidden', name: '_id', value: state.data._id })),
    when(state.data._rev)
      .then(() => h('input', { type: 'hidden', name: '_rev', value: state.data._rev})),
    h('p', [
      h('label', 'Name'),
      h('input', { type: 'text', name: 'name', value: state.data.name })
    ]),
    h('p', [
      h('label', 'Body'),
      h('input', { type: 'text', name: 'body', value: state.data.body })
    ]),
    h('button', {type: 'submit'}, ['Save'])
  ])
}
