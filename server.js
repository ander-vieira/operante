var express = require("express");
var minify = require("express-minify");
var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');

require('./logger.js');

var app = express();
app.use(favicon(path.join(__dirname, 'public/media', 'favicon.ico')));
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
