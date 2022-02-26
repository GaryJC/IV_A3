$(document).ready(() => {
  $("#map").click(() => {
    $("#guide1").hide();
    $("#guide2").css("visibility", "visible");
    $("#custBut").click(() => {
      $("#guide2").hide();
      $("#guide3").css("visibility", "visible");
      $(document).on("keypress", function (e) {
        if (e.which == 13) {
          $("#guide3").hide();
        }
      });
    });
  });
});
