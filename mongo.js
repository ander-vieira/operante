var mongo = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1:27017";

module.exports.cargarNombre = function(callback) {
  mongo.connect(url, function(err, db) {
    if(!err) {
      var col = db.db('prueba').collection('datos');

      col.find({}).toArray(function(err, items) {
        if(!err) {
          callback(items[0].nombre+" "+items[0].apellido);
        } else {
          logger.error("Error al leer coleccion 'datos' de la BD");
        }
      });
    } else {
      logger.error("Error al conectar a MongoDB");
    }
  });
}
