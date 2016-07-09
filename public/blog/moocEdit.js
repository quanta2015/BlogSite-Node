var preChapId, moocId, updateChapId, selectChapId;

$(init);

function init() {
  //preChapId = $("[data-id]").first().data("id");
  preChapId = "";
  updateChapId = "";
  moocId = $("#moocId").text();


  $(document).keyup(function(e){
    if (e.keyCode == 13) {
      doUpdateTitle();
    }
  })

  $('body').on('blur', '#chapTitle' , doUpdateTitle);
}


//点击后取出章节内容
$('[data-toggle="select"]').on('click', function (e) {
  e.preventDefault();
  var $this = $(this);
  var chapId = $this.data('id');
  selectChapId = chapId;
  var content = $("#moocContent").val();

  //编辑按钮激活状态
  $('[data-toggle="select"]').removeClass('mooc-active');
  $this.addClass('mooc-active');

  getChapContent( chapId, content);
});

$('[data-toggle="select"]').on('mouseover', function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.find('.mooc-button').show();
});


$('[data-toggle="select"]').on('mouseout', function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.find('.mooc-button').hide();
});

//编辑章节标题
$('[data-button="edit"]').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);

  updateChapId =  $this.parent().parent().data('id');
  $this.parent().parent().prepend('<input type="text" class="form-control" id="chapTitle">');
  doQueryTitle();
});

//删除章节
$('[data-button="del"]').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);

  updateChapId =  $this.parent().parent().data('id');
  doDeleteChap(updateChapId);
});

//添加章节
$('[data-button="add"]').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);

  doAddChap(selectChapId);
});

//上移章节
$('[data-button="up"]').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);

  doUpChap($this.parent().parent().data('id'));
});

//上移章节
$('[data-button="down"]').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);

  doDownChap($this.parent().parent().data('id'));
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

       $("#chapTitle").select();
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

function doDeleteChap(id) {
  $.ajax({
    type: "post",
    url: "/admin/moocDeleteChap",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'moocId': moocId,
      'chapId': id
    }),
    success: function(result) {
      location.href = moocId;
    }
  })
}


function doAddChap(id) {
  $.ajax({
    type: "post",
    url: "/admin/moocAddChap",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'moocId': moocId,
      'chapId': id
    }),
    success: function(result) {
      location.href = moocId;
    }
  })
}


function doUpChap(id) {
  $.ajax({
    type: "post",
    url: "/admin/moocUpChap",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'moocId': moocId,
      'chapId': id
    }),
    success: function(result) {
      location.href = moocId;
      
    }
  })
}

function doDownChap(id) {
  $.ajax({
    type: "post",
    url: "/admin/moocDownChap",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      'moocId': moocId,
      'chapId': id
    }),
    success: function(result) {
      location.href = moocId;
    }
  })
}