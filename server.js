var express = require("express");
var minify = require("express-minify");
var exphbs  = require('express-handlebars');

require('./logger.js');

var app = express();
app.engine('html', exphbs({
  defaultLayout: 'main',
  extname: '.html',
  partialsDir: "views/"
 }));
app.set('view engine', 'html');
app.use(minify());
app.use(express.static('./public'));
require('./rest.js')(app);
require('./views.js')(app);
var port = process.argv[2];
var server = app.listen(port, function() {
  logger.info("Server started on port "+port);
});
