var h = require('xfx').h

module.exports = (icon, style) => {
  return h('button.mdl-button.mdl-js-button.mdl-button--fab.mdl-button--colored', { style: style }, [
    h('i.material-icons', icon)
  ])
}
