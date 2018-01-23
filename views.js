module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {});
  });

  app.get('/error', function(req, res) {
    res.render('error', {title: 'Error'});
  });

  app.get('/contacto', function(req, res) {
    res.render('contacto/contacto', {title: 'Información de contacto'});
  });

  app.get('/registro', function(req, res) {
    res.render('registro/registro', {title: 'Registrarse'});
  });

  app.get('*', function(req, res) {
    res.redirect("/error");
  });
}
