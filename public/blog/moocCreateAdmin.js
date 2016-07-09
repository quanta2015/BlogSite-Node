$(init);

function init() {

  var socket = io();
  socket.on('uploadProgress' , function(percent){
    console.log(percent);
    $(".pg-bar").progressbar( "option", "value", parseInt(percent));
    $(".pg-info").text( percent + '%');
  });

  $("#defaultForm").validate({
    wrapper:"span",
    onfocusout:false,
    submitHandler:function(form) {
      doAddMooc();  //验证成功，调用添加慕课函数
    }
  })


  $(".pg-bar").progressbar({value: 0});
  $(".pg-bar").progressbar( "option", "max", 100 );

  $("body").on('click', '#UploadBtn', doUpload);
  $("body").on('change', '#uploadFile', preUpload);
}

function preUpload() {
  $("#UploadBtn").removeClass('disabled');
}

function doUpload() {

  $(".pg-wrapper").show();

  var file = $("#uploadFile")[0].files[0];
  var form = new FormData();
  form.append("file", file);

  $.ajax({
    url: "/admin/uploadImg",
    type: "POST",
    data: form,
    async: true,
    processData: false,
    contentType: false,
    success: function(result) {
      startReq = false;
      if (result.code == 0) {
        $("#moocThumb").attr("src",result.data);
        $(".pg-wrapper").hide();
      }
    }
  });
}

function doAddMooc() {

  $.ajax({
    type: "POST",
    url: "/admin/moocCreate",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'moocName': $("#moocName").val(),
      'teacher': $("#teacher").val(),
      'weekCount': $("#weekCount").val(),
      'classHour': $("#classHour").val(),
      'moocThumb': $("#moocThumb").attr("src")
    }),
    success: function(result) {
      if (result.code == 99) {
        notifyInfo(result.msg);
      } else {
        location.href = '/admin/moocList';
        notifyInfo("发布成功！");
      }
    }
  })
}