$(init);

function init() {

  $("body").on('click', '#addNewsBtn', doAddNews);
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
        alert(result.msg);
      } else {
        alert("发布成功！");
      }
    }
  })
}