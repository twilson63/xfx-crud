var h = require('xfx').h

module.exports = (action, contents) => {
  return h('form', { method: 'POST', action: action }, contents)
}
