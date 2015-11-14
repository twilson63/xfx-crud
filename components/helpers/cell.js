var h = require('xfx').h

module.exports = (size, contents) => {
  return h('.mdl-cell.mdl-cell--' + size +'-col', contents)
}
