module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {title: 'Ejemplo Node JS'});
  });

  app.get('/error', function(req, res) {
    res.render('error', {title: 'Error'});
  });

  app.get('/contacto', function(req, res) {
    res.render('contacto/contacto', {title: 'Información de contacto'});
  });

  app.get('*', function(req, res) {
    res.redirect("/error");
  });
}
