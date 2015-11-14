var h = require('xfx').h

module.exports = (model, value, label, style) => {
  return h('.mdl-textfield.mdl-js-textfield', {style: style }, [
    h('input#' + model + '.mdl-textfield__input', {
      type: 'text',
      name: model,
      value: value
    })
  ])
}
