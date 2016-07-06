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
      doAddNews();  //验证成功则调用添加新闻函数
    }
  })


  $(".pg-bar").progressbar({value: 0});
  $(".pg-bar").progressbar( "option", "max", 100 );

  //$("body").on('click', '#addNewsBtn', doAddNews);
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

        var picUrl = $.format("![Alt text]({0})",result.data)
        $("#newsContent").insertAtCaret(picUrl);
        $(".pg-wrapper").hide();
        // console.log(result.data);
      }
    }
  });
}

function doAddNews() {

  $.ajax({
    type: "POST",
    url: "/admin/news",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'title': $("#newsTitle").val(),
      'content': $("#newsContent").val(),
      'id': $.cookie('id')
    }),
    success: function(result) {
      if (result.code == 99) {
        notifyInfo(result.msg);
      } else {
        notifyInfo("发布成功！");
        location.href = '/pdf/blogPdf/'+ result.data._id;

        // pdf/blogPdf/57777cd9f5faaad84a10e070
      }
    }
  })
}