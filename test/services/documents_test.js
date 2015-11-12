var test = require('tap').test

var rewire = require('rewire')
var documents = rewire('../../services/documents')

test('documents list', (t) => {
  documents.__set__('db', {
    query: (map) => {
      return {
        then: (fn) => fn({ rows: [{ key: {_id: 1, name: 'beep'}}]})
      }
    }
  })
  t.equals(documents().list()[0].name, 'beep')
  t.end()
})
