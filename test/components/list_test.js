var test = require('tap').test
var toHTML = require('vdom-to-html')

var list = require('../../components/list')

test('create list', (t) => {
  var result = toHTML(list.render(list()))
  t.equals(result, '<div class="mdl-grid"><div class="mdl-cell mdl-cell--2-col"><div style="height: 80px; width: 150px;" class="mdl-card mdl-shadow--2dp"><div style="background: url(&quot;/images/folder.jpg&quot;) center / contain no-repeat;" class="mdl-card--title mdl-card--expand"></div><div class="mdl-card__actions mdl-card--border"><a href="/1" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">one</a></div></div></div></div>')
  t.end()
})
