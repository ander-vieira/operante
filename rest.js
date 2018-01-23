var queries = require('./mongo');

module.exports = function(app) {
  app.get("/rest/datosUsuario", function(req, res) {
    queries.cargarNombre(function(nombre) {
      res.json({nombre: nombre});
    });
  });

  app.post("/rest/registro", function(req, res) {
    var nombre = req.body["nombre"];
    var passwd = req.body["passwd"];
    if(passwd != req.body["repasswd"]) {
    res.json({"error": "passwdmismatch"});
      return;
    }

    queries.registroUsuario(nombre, passwd, function(errcode) {
      if(errcode) {
        res.json({"error": errcode});
      }

      res.send();
    });
  })

  app.post("/rest/login", function(req, res) {
    var nombre = req.body["nombre"];
    var passwd = req.body["passwd"];

    queries.loginUsuario(nombre, passwd, function(errcode, cookie) {
      if(errcode) {
        res.json({"error": errcode});
      } else {
        res.cookie('operanteSession', cookie, {maxAge: 28800000, httpOnly: true});
        res.send();
      }
    });
  });
};
