function cargarDatosUsuario(callback) {
  $.ajax("/rest/datosUsuario", {
    success: callback
  });
}

function renderDatosUsuario(datos) {
  $(".nombreUsuario").text(datos.nombre);
}

$(function() {
  var datos = cargarDatosUsuario(renderDatosUsuario);
});
