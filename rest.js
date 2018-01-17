var queries = require('./mongo');

module.exports = function(app) {
  app.get("/rest/datosUsuario", function(req, res) {
    queries.cargarNombre(function(nombre) {
      res.send({nombre: nombre});
    });
  });
};
