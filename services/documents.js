var PouchDB = require('pouchdb')
var db = PouchDB('documents')

module.exports = () => {
  return Object.freeze({
    list: () => db
      .query(function (doc) {
        emit({ _id: doc._id, name: doc.name })
      })
      .then((result) => {
        return result.rows.map((d) => d.key)
      })
    ,
    get: (doc) => db.get(doc),
    create: (doc) => db.post(doc),
    update: (doc) => db.put(doc),
    remove: (doc) => db.remove(doc)

  })

}
