var app = require('xfx')

var main = require('./components/main')
var state = app(main)

/** palmetto flow **/
var palmetto = require('palmettoflow-nodejs')
var ee = palmetto()
var localDataSource = require('./local/documents')(ee)

var send = require('./lib/palmetto-send')(ee)
var documents = require('./services/documents')(send)

/** routes **/
var page = require('page')
var routes = require('./routes/documents')(state, documents)
var auth = require('./routes/auth')(state)

page('/login', auth.login)
page('/logout', auth.logout)
page('/update', routes.update)
page('/create', routes.create)
page('/remove', routes.remove)
page('/new', routes.new)

page('/:id/edit', routes.edit)
page('/:id', routes.show)

page('/', routes.list)

page()

page.redirect('/login')
