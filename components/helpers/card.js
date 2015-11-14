var h = require('xfx').h
var xtend = require('xfx').xtend

module.exports = (title, ref, style) => {
  var s = xtend({
    height: '80px',
    width: '150px'
  }, style)
  var bkg = "/images/folder.jpg"
  if (~title.indexOf('.js')) {
    bkg = "/images/js.jpg"
  } else if (~title.indexOf('.css')) {
    bkg = "/images/css.png"
  } else if (~title.indexOf('.md')) {
    bkg = "/images/md.png"
  } else if (~title.indexOf('.html')) {
    bkg = "/images/html.png"
  }
  return h('.mdl-card.mdl-shadow--2dp',
    { style: s}, [
    h('.mdl-card--title.mdl-card--expand', {
      style: {
      background: 'url("' + bkg + '") center / contain no-repeat' }
    }, []),
    h('.mdl-card__actions.mdl-card--border', [
      h("a.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect",
        { href: ref }, [
        title
      ])
    ])
  ])
}
