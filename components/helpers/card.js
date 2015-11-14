var h = require('xfx').h
var xtend = require('xfx').xtend

module.exports = (title, ref, style) => {
  var s = xtend({
    height: '80px',
    width: '150px'
  }, style)
  var bkg = "http://www.w3.org/html/logo/downloads/HTML5_Logo_512.png"
  if (~title.indexOf('.js')) {
    bkg = "http://3.bp.blogspot.com/-PTty3CfTGnA/TpZOEjTQ_WI/AAAAAAAAAeo/KeKt_D5X2xo/s1600/js.jpg"
  } else if (~title.indexOf('.css')) {
    bkg = "http://4.bp.blogspot.com/-_jtoi-CBS3E/UDg91M4DgLI/AAAAAAAAC1Q/prAGfj6OSG4/s1600/css3-search-box.png"
  } else if (~title.indexOf('md')) {
    bkg = "https://raw.githubusercontent.com/dcurtis/markdown-mark/master/png/208x128-solid.png"
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
