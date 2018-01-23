$(function() {
  $('#formularioRegistro').submit(function() {
    $.ajax({
      data: $(this).serialize(),
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      success: function(data) {
        console.log(data);
        if(data != "") {
          $(".errorContainer").text(data.error);
        } else {
          window.location.href = "/";
        }
      }
    });

    return false;
  });
});
