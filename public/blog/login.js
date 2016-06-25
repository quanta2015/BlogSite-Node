$(init);

function init() {

  $("body").on('click', '#btnLogin', doLogin);
}

function doLogin() {

  $.ajax({
    type: "POST",
    url: "/login",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'usr': $("#usr").val(),
      'pwd': $("#pwd").val()
    }),
    success: function(result) {
      if (result.code == 99) {
        $(".login-box-msg").text(result.msg);
      } else {
        location.href = "/blog";
      }
    }
  })
}