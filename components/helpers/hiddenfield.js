var h = require('xfx').h

module.exports = (name, value) => {
  return h('input', { type: 'hidden', name: name, value: value})
}
