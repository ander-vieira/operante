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

module.exports.cargarNombre = function(callback) {
  if(!isConnected) {
    callback("USUARIO");
    return;
  }

  var col = connection.db('prueba').collection('datos');

  col.find({}).toArray(function(err, items) {
    if(!err) {
      callback(items[0].nombre+" "+items[0].apellido);
    } else {
      logger.error("Error al leer coleccion 'datos' de la BD");
    }
  });
};

module.exports.registroUsuario = function(nombre, passwd, callback) {
  if(!isConnected) {
    callback();
    return;
  }

  var col = connection.db('prueba').collection('usuarios');
  col.find({"nombre": nombre}, function(err, usuario) {
    if(!err && !usuario) {
      col.insert({"nombre": nombre, "passwd": passwd, "verified": false});
    }
  });
}
