var preChapId, moocId, updateChapId, selectChapId;

$(init);

function init() {

  // $('.loader-inner').loaders();

  preChapId = "";
  updateChapId = "";
  moocId = $("#moocId").text();

  $('body').on('keyup', preUpdateTitle)
  $('body').on('blur', '#chapTitle' , doUpdateTitle);
}

function preUpdateTitle(e) {
  if ((e.keyCode == 13)&&(typeof($("#chapTitle").val()) !== "undefined")) {
    doUpdateTitle();
  }
}


//点击后取出章节内容
$('[data-toggle="select"]').on('click', function (e) {
  e.preventDefault();
  var $this = $(this);
  var chapId = $this.data('id');

  if ( typeof(chapId) !== "undefined" ){

    selectChapId = chapId;
    var content = $("#moocContent").val();
    $('[data-toggle="select"]').removeClass('mooc-active');
    $this.addClass('mooc-active');

    getChapContent( chapId, content);
  }
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

function cbSetChapContent(result) {
  $(".loader-wrapper").remove();

  $("#moocContent").val(result.content);
}

function cbQueryTitle(result) {
  $(".loader-wrapper").remove();

  $("#chapTitle").val(result.title);
  $("#chapTitle").select();
}

function cbReload() {
  // $(".loader-wrapper").remove();
  location.href = moocId;
}

function postData(url, data, cb) {

  $('body').append(LOAD_WRAPPER);
  $(".loader-wrapper").show();

  var promise = $.ajax({
    type: "post",
    url: url,
    dataType: "json",
    contentType: "application/json",
    data:data
  });
  promise.done(cb);
}


function getChapContent( chapId, content ) {

  var jsonData = JSON.stringify({
    'chapId': chapId,
    'preChapId': preChapId,
    'moocId': moocId,
    'content': content
  });
  preChapId = chapId;

  postData(urlMoocGetChapCont, jsonData, cbSetChapContent);
}

function doQueryTitle() {

  jsonData = JSON.stringify({ 'moocId': moocId, 'chapId': updateChapId });
  postData(urlMoocGetChapTitle, jsonData, cbQueryTitle);
}

function doUpdateTitle() {

  jsonData = JSON.stringify({ 'moocId': moocId, 'chapId': updateChapId, 'chapTitle': $("#chapTitle").val() });
  $("#chapTitle").remove();
  postData(urlMoocSetChapTitle, jsonData, cbReload);
}

function doDeleteChap(id) {

  jsonData = JSON.stringify({ 'moocId': moocId, 'chapId': id });
  postData(urlMoocDelChap, jsonData, cbReload);
}

function doAddChap(id) {

  jsonData = JSON.stringify({ 'moocId': moocId, 'chapId': id });
  postData(urlMoocAddChap, jsonData, cbReload);
}

function doUpChap(id) {

  jsonData = JSON.stringify({ 'moocId': moocId, 'chapId': id });
  postData(urlMoocUpChap, jsonData, cbReload);
}

function doDownChap(id) {

  jsonData = JSON.stringify({ 'moocId': moocId, 'chapId': id });
  postData(urlMoocDownChap, jsonData, cbReload);
}