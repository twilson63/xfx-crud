var h = require('xfx').h
var xtend = require('xfx').xtend

module.exports = (title, ref, style) => {
  var s = xtend({
    height: '100px',
    width: '240px'
  }, style)
  return h('.mdl-card.mdl-shadow--2dp',
    { style: s}, [
    h('.mdl-card--title.mdl-card--expand', {
      style: {
      background: 'url("http://www.w3.org/html/logo/downloads/HTML5_Logo_512.png") center / contain no-repeat' }
    }, []),
    h('.mdl-card__actions.mdl-card--border', [
      h("a.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect",
        { href: ref }, [
        title
      ])
    ])
  ])
}
