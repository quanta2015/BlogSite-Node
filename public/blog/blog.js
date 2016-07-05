$(init);

function init() {
  var imgUrl = $.cookie('imgurl');
  $(".uig").attr("src",imgUrl);
}
