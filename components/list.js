var h = require('xfx').h

module.exports = component
component.render = render

function component () {
  return {
    data: [{ name: 'one', _id: 1}]
  }
}

function render (state) {
  var li = (v) => h('li', [
    h('a', { href: '/' + v._id }, [v.name])
  ])
  return h('ul', state.data.map(li))
}
