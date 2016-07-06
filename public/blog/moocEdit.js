var preChapId, moocId, updateChapId;

$(init);

function init() {
  //preChapId = $("[data-id]").first().data("id");
  preChapId = "";
  moocId = $("#moocId").text();


  $(document).keyup(function(e){
    if (e.keyCode == 13) {
      doUpdateTitle();
    }
  })

  $('body').on('blur', '#chapTitle' , doUpdateTitle);
}



$('[data-toggle="select"]').on('click', function (e) {
  e.preventDefault();
  var $this = $(this);
  var chapId = $this.data('id');
  var content = $("#moocContent").val();

  //编辑按钮激活状态
  $('[data-toggle="select"]').removeClass('mooc-active');
  $this.addClass('mooc-active');

  getChapContent( chapId, content);
});

$('[data-toggle="select"]').on('mouseover', function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.children('.mooc-button').show();
});

$('[data-toggle="select"]').on('mouseout', function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.children('.mooc-button').hide();
});

$('[data-button="edit"]').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);

  updateChapId =  $this.parent().data('id');

  // $("#chapTitle").remove();
  $this.parent().prepend('<input type="text" class="form-control" id="chapTitle">');
  doQueryTitle();



});



function getChapContent( chapId, content ) {

  var jsonData = JSON.stringify({
      'chapId': chapId,
      'preChapId': preChapId,
      'moocId': moocId,
      'content': content
    });

  preChapId = chapId;

  $.ajax({
    type: "post",
    url: "/admin/moocGetChapContent",
    contentType: "application/json",
    dataType: "json",
    data: jsonData,
    success: function(result) {
      
      $("#moocContent").val(result.content);
    }
  })
}

function doQueryTitle() {

  $.ajax({
    type: "post",
    url: "/admin/moocGetChapTitle",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'moocId': moocId,
      'chapId': updateChapId
    }),
    success: function(result) {
      console.log(result);
      $("#chapTitle").val(result.title);
      $("#chapTitle").focus();
    }
  })

}


function doUpdateTitle() {

  var chapTitle = $("#chapTitle").val();
  $("#chapTitle").remove();

  $.ajax({
    type: "post",
    url: "/admin/moocSetChapTitle",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'moocId': moocId,
      'chapTitle': chapTitle,
      'chapId': updateChapId
    }),
    success: function(result) {
      location.href = moocId;
    }
  })

}