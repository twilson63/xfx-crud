var test = require('tap').test
var toHTML = require('vdom-to-html')

var form = require('../../components/form')

test('create form', (t) => {
  var result = toHTML(form({data: {}}))
  t.equals(result, '<form method="POST" action="/create"><input type="hidden" name="type" value="document"><p><label>Name</label><input type="text" name="name"></p><p><label>Body</label><input type="text" name="body"></p><button type="submit">Save</button></form>')
  t.end()
})

test('update form', (t) =>{
  var result = toHTML(form({data: {_id: 1, _rev: 2, name: 'foo', body: 'bar'}}))
  t.equals(result, '<form method="POST" action="/update"><input type="hidden" name="type" value="document"><input type="hidden" name="_id" value="1"><input type="hidden" name="_rev" value="2"><p><label>Name</label><input type="text" name="name" value="foo"></p><p><label>Body</label><input type="text" name="body" value="bar"></p><button type="submit">Save</button></form>')
  t.end()
})
