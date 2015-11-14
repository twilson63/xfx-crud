var documentSvc = require('../services/documents')
var page = require('page')
var update = require('xfx').update


module.exports = (state) => {
  var documents = documentSvc()

  return Object.freeze({
    editor: (ctx) => {
      state.route = 'editor'
      update()
    },
    list: (ctx) => {
      documents.list()
        .then((docs) => {

          state.list.data = docs
          state.route = 'list'
          update()
        })
    },
    new: () => {
      state.route = 'new'
      update()
    },
    show: (ctx) => {
      documents.get(ctx.params.id).then((doc) => {
        state.show.data = doc
        state.route = 'show'
        update()
      })
    },
    create: (ctx) => {
      console.log('create called')
      console.log(ctx)
      documents.create(ctx.state.body).then((result) => {
        page.redirect('/')
      })
    },
    edit: (ctx) => {
      documents.get(ctx.params.id).then((doc) => {
        state.edit.data = doc
        state.route = 'edit'
        update()
      })
    },
    update: (ctx) => {
      documents.update(ctx.state.body).then((result) => {
        page.redirect('/' + ctx.state.body._id)
      })
    },
    remove: (ctx) => {
      if (confirm('Are you sure?')) {
        documents.remove(ctx.state.body).then((result) => {
          page.redirect('/')
        })
      }
    }
  })
}
