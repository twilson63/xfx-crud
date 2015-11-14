var page = require('page')
var update = require('xfx').update

module.exports = (state, documents) => {
  return Object.freeze({
    editor: (ctx) => {
      state.route = 'editor'
      update()
    },
    list: (ctx) => {
      documents.list(state.id_token)
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
      documents.create(ctx.state.body, state.id_token).then((result) => {
        page.redirect('/')
      })
    },
    edit: (ctx) => {
      documents.get(ctx.params.id, state.id_token).then((doc) => {
        state.edit.data = doc
        state.route = 'edit'
        update()
      })
    },
    update: (ctx) => {
      documents.update(ctx.state.body, state.id_token).then((result) => {
        page.redirect('/')
      })
    },
    remove: (ctx) => {
      if (confirm('Are you sure?')) {
        documents.remove(ctx.state.body, state.id_token).then((result) => {
          page.redirect('/')
        })
      }
    }
  })
}
