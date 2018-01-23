$(function() {
  $("a.cerrarSesion").on("click", function(e) {
    e.preventDefault();

    $.ajax({
      url: "/rest/logout",
      method: "POST",
      success: function() {
        window.location.href = "/";
      }
    });
  });
});
