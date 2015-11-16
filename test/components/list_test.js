var test = require('tap').test
var toHTML = require('vdom-to-html')
var h = require('xfx/h')

var list = require('../../components/list')

test('create list', (t) => {
  var result = toHTML(h('div', list.render(list())))
  t.equals(result, '<div><header class="mdl-layout__header"><div class="mdl-layout__header-row"><span class="mdl-layout-title"><span class="mdl-layout--large-screen-only">C2C</span></span><div class="mdl-layout-spacer"></div><a href="/folder" style="margin-right: 10px;" class="mdl-button mdl-js-button mdl-button--fab"><i class="material-icons">folder</i></a><a href="/new" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"><i class="material-icons">add</i></a></div></header><main class="mdl-layout__content"><div class="mdl-grid"><div class="mdl-cell mdl-cell--2-col"><div style="height: 80px; width: 150px;" class="mdl-card mdl-shadow--2dp"><div style="background: url(&quot;/images/md.png&quot;) center / contain no-repeat;" class="mdl-card--title mdl-card--expand"></div><div class="mdl-card__actions mdl-card--border"><a href="/1" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">one</a><a href="/remove/1" style="float: right;" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">delete</i></a></div></div></div></div></main></div>')
  t.end()
})
