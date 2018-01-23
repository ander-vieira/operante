var mongo = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1:27017";
var connection, isConnected = false;

mongo.connect(url, function(err, db) {
  if(err) {
    logger.error("Error al conectar a MongoDB");
  } else {
    isConnected = true;
    connection = db;
  }
});

module.exports.cargarNombre = function(cookie, callback) {
  if(!isConnected) {
    callback("USUARIO");
    return;
  }

  var col = connection.db('prueba').collection('logins');

  col.findOne({"cookie": cookie}, function(err, login) {
    if(err) {
      logger.error("Error al leer coleccion 'logins' de la BD", err);
      callback("dberr");
    } else if(!login) {
      callback("invalidlogin");
    } else {
      callback(null, login.nombre);
    }
  });
};

module.exports.registroUsuario = function(nombre, passwd, callback) {
  if(!isConnected) {
    callback("dberr");
  }

  var col = connection.db('prueba').collection('usuarios');
  col.findOne({"nombre": nombre}, function(err, usuario) {
    if(err) {
      logger.error("Error: "+err);
      callback("dberr");
    } else if(!usuario) {
      col.insert({"nombre": nombre, "passwd": passwd, "verified": false});
      callback();
    } else {
      callback("repeateduser");
    }
  });
}

module.exports.loginUsuario = function(nombre, passwd, callback) {
  if(!isConnected) {
    callback("dberr");
  }

  var col = connection.db('prueba').collection('usuarios');
  col.findOne({"nombre": nombre}, function(err, usuario) {
    if(err) {
      logger.error("Error: "+err);
      callback("dberr");
    } else if(usuario) {
      if(usuario.passwd === passwd) {
        col = connection.db('prueba').collection('logins');
        col.findOne({"nombre": nombre}, function(err, usuario) {
          if(err) {
            logger.error("Error: "+err);
            callback("dberr");
          } else {
            var cookie;
            if(usuario) {
              cookie = usuario.cookie;
            } else {
              cookie = Math.random().toString().slice(2, 15);
              col.insert({"nombre": nombre, "cookie": cookie});
            }
            callback(null, cookie);
          }
        });
      } else {
        callback("wrongpasswd");
      }
    } else {
      callback("usernotexist");
    }
  });
}
