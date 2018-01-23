function prepararFormulariosAjax(handler) {
  $('form.formularioAjax').submit(function() {
    $.ajax({
      data: $(this).serialize(),
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      success: handler
    });

    return false;
  });
}
