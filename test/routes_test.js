var test = require('tap').test

var rewire = require('rewire')
var routes = rewire('../routes/documents')

test('routes /', (t) => {
  routes.__set__({
    documentSvc: () => {
      return {
        list: () => {
          t.ok(true, 'List Called')
          return {
            then: (fn) => { fn([]) }
          }
        }
      }
    },
    page: () => {},
    update: () => {
      t.ok(true, 'Update Called')
      t.end()
    }
  })
  var list = routes({ list: { data: []}}).list
  list({})

})
