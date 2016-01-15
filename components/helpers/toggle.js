var h = require('xfx').h

module.exports = (label, options) => {
  if (!options) { options = {}}
  options.type = 'checkbox'
  return h('label.mdl-switch.mdl-js-switch.mdl-js-ripple-effect', [
    h('input.mdl-switch__input', options),
    h('span.mdl-switch__label', [label])
  ])
}
