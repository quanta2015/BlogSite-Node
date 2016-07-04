$(init);

function init() {

  $("#loginform").validate({
    errorLabelContainer: "#errorMsg",
    wrapper:"span",
    submitHandler:function(form) {
      doLogin();  //验证成功登陆
    }
  })

  $(document).keyup(function(e){
      if (e.keyCode == 13) {
          doLogin();
      }
  })
}

function doLogin() {

  $.ajax({
    type: "POST",
    url: "/",
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
        $.cookie('username', result.data.username, {expires:30});
        $.cookie('password', result.data.password, {expires:30});
        $.cookie('imgurl', result.data.imgUrl, {expires:30});
        $.cookie('id', result.data._id, {expires:30});
        location.href = "/p/blogs";
      }
    }
  })
}