var P = require('bluebird')
module.exports = (send) => {
  return Object.freeze({
    sync: (config) => send('sync', config),
    folder: (folder, token) => send('folder', { folder: folder }, token),
    list: (token) => send('list', {}, token),
    get: (doc, token) => send('get', doc, token),
    create: (doc, token) => send('create', doc, token),
    update: (doc, token) => send('update', doc, token),
    remove: (doc, token) => send('remove', doc, token)
  })
}
