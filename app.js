var app = require('xfx')

var main = require('./components/main2')
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
var auth = require('./routes/auth')(state, documents)

page('/login', auth.login)
page('/logout', auth.logout)
page('/folder', routes.folder)
page('/update', routes.update)
page('/document/save', routes.save)
page('/document/close', routes.close)
page('/remove/:id', routes.remove)
page('/new', routes.new)

page('/:id', routes.show)

page('/', routes.list)

page()

page.redirect('/login')
