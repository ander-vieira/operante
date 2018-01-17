function cargarDatosUsuario(callback) {
  $.ajax("/rest/datosUsuario", {
    success: function(data) {
      console.log(data);
      callback(data);
    }
  });
}

function renderDatosUsuario(datos) {
  $(".nombreUsuario").text(datos.nombre);
}

$(function() {
  var datos = cargarDatosUsuario(renderDatosUsuario);
});
