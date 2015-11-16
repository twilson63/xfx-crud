var h = require('xfx').h

module.exports = (type, icon, options) => {
  return h(type + '.mdl-button.mdl-js-button.mdl-button--fab', options, [
    h('i.material-icons', icon)
  ])
}
