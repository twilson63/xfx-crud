var page = require('page')
var update = require('xfx').update

module.exports = (state, documents) => {
  return Object.freeze({
    folder: (ctx) => {
      state.route = 'list'
      var folder = prompt('Enter Folder Name', 'default')
      if (state.list.folder) { folder = state.list.folder + '/' + folder}

      documents.create({
        type: 'folder',
        name: folder,
        parent: state.list.folder,
        parent_id: state.list.folder_id,
        profile: state.profile
      }, state.id_token).then((result) => {
        page('/' + result.id)
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
      state.newData.data = {
        type: 'document',
        name: 'untitled.html',
        body: ''
      }
      state.newData.folder_id = state.list.folder_id
      update()
    },
    show: (ctx) => {
      //state.list.data = null
      documents.get(ctx.params.id, state.id_token).then((doc) => {
        if (doc.type === 'document') {
          state.list.data = null
          state.edit.data = doc
          state.edit.folder_id = state.list.folder_id
          state.route = 'edit'
          update()
          return
        }
        if (doc.type === 'folder') {
          documents.folder(doc.name, state.id_token).then((docs) => {
            state.list.data = docs
            state.list.folder = doc.name
            state.list.folder_id = doc._id
            state.list.parent_id = doc.parent_id
            state.route = 'list'
            update()
          })
        }
      }).catch((err) => console.log(err))
    },
    save: (ctx) => {
      ctx.state.body.profile = state.profile
      if (state.list.folder) {
        ctx.state.body.parent = state.list.folder
        ctx.state.body.parent_id = state.list.folder_id
      }
      documents.update(ctx.state.body, state.id_token).then((result) => {
        console.log(result)
        page('/' + result.id)
      })
    },
    close: (ctx) => {
      ctx.state.body.profile = state.profile
      if (state.list.folder) {
        ctx.state.body.parent = state.list.folder
        ctx.state.body.parent_id = state.list.folder_id
      }
      documents.update(ctx.state.body, state.id_token).then((result) => {
        if (state.list.folder) {
          return page.redirect('/' + state.list.folder_id)
        }
        page.redirect('/')
      })
    },
    update: (ctx) => {
      ctx.state.body.profile = state.profile
      if (state.list.folder) {
        ctx.state.body.parent = state.list.folder
        ctx.state.body.parent_id = state.list.folder_id
      }
      documents.update(ctx.state.body, state.id_token).then((result) => {
        if (state.list.folder) {
          return page.redirect('/' + state.list.folder_id)
        }
        page.redirect('/')
      })
    },
    remove: (ctx) => {
      if (confirm('Are you sure?')) {
        documents.remove(ctx.params.id, state.id_token).then((result) => {
          // if nested folder redirect to parent,otherwise root
          page.redirect(state.list.folder_id ? '/' + state.list.folder_id : '/')
        })
      }
    }
  })
}
