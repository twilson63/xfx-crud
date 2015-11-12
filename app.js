var app = require('xfx')

var main = require('./components/main')
var state = app(main)

var page = require('page')
var pageBodyParser = require('page-body-parser')

var routes = require('./routes/documents')(state)

// routes
page('/update', routes.update)
page('/create', routes.create)
page('/remove', routes.remove)
page('/new', routes.new)

page('/:id/edit', routes.edit)
page('/:id', routes.show)

page('/', routes.list)

page()
pageBodyParser()
