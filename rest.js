var queries = require('./mongo');

module.exports = function(app) {
  app.get("/rest/datosUsuario", function(req, res) {
    var cookie = req.cookies["operanteSession"];
    if(cookie) {
      queries.cargarNombre(cookie, function(errcode, nombre) {
        if(errcode) {
          res.json({nombre: "ANÓNIMO"});
        } else {
          res.json({nombre: nombre});
        }
      });
    } else {
      res.json({nombre: "ANÓNIMO"});
    }
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
