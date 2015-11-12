var test = require('tap').test
var toHTML = require('vdom-to-html')

var list = require('../../components/list')

test('create list', (t) => {
  var result = toHTML(list.render(list()))
  t.equals(result, '<ul><li><a href="/show/1">one</a></li></ul>')
  t.end()
})
