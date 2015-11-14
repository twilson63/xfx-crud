var page = require('page')
var update = require('xfx').update

module.exports = (state, documents) => {
  return Object.freeze({
    folder: (ctx) => {
      state.route = 'list'
      var folder = prompt('Enter Folder Name')
      documents.create({
        type: 'folder',
        name: folder,
        profile: state.profile
      }, state.id_token).then((result) => {
        page('/')
      })

    },
    list: (ctx) => {
      state.list.folder = null
      state.list.folder_id = null
      documents.list(state.id_token)
        .then((docs) => {
          state.list.data = docs
          state.route = 'list'
          update()
        })
    },
    new: () => {
      state.route = 'new'
      state.newData.folder_id = state.list.folder_id
      update()
    },
    show: (ctx) => {
      documents.get(ctx.params.id, state.id_token).then((doc) => {
        if (doc.type === 'document') {
          state.edit.data = doc
          state.edit.folder_id = state.list.folder_id
          state.route = 'edit'
          update()
        } else if (doc.type === 'folder') {
          documents.folder(doc.name, state.id_token).then((docs) => {
            state.list.data = docs
            state.list.folder = doc.name
            state.list.folder_id = doc._id
            state.route = 'list'
            update()
          })
        }
        return
      })
    },
    create: (ctx) => {
      ctx.state.body.profile = state.profile
      if (state.list.folder) ctx.state.body.parent = state.list.folder
      documents.create(ctx.state.body, state.id_token).then((result) => {
        if (state.list.folder) {
          return page.redirect('/' + state.list.folder_id)
        }
        page.redirect('/')
      })
    },
    // edit: (ctx) => {
    //   documents.get(ctx.params.id, state.id_token).then((doc) => {
    //     state.edit.data = doc
    //     state.edit.folder_id = state.list.folder_id
    //     state.route = 'edit'
    //     update()
    //   })
    // },
    update: (ctx) => {
      ctx.state.body.profile = state.profile
      if (state.list.folder) ctx.state.body.parent = state.list.folder
      documents.update(ctx.state.body, state.id_token).then((result) => {
        if (state.list.folder) {
          return page.redirect('/' + state.list.folder_id)
        }
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
