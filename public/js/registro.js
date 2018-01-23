$(function() {
  prepararFormulariosAjax(function(data) {
    console.log(data);
    if(data != "") {
      $(".errorContainer").text(data.error);
    } else {
      window.location.href = "/";
    }
  });
});
