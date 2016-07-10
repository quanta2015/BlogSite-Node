var preChapId, moocId, updateChapId, selectChapId;

$(init);

function init() {

  preChapId = "";
  updateChapId = "";
  moocId = $("#moocId").text();


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


function cbSetChapContent(result) {
  $(".loader-wrapper").hide();

  var content = result.content;

  var md = new Remarkable('full', {
    linkify: true,         // autoconvert URL-like texts to links
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {
        }
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {
      }

      return ''; // use external default escaping
    }
  });

  content = md.render(content);
  $("#moocContent").empty();
  $("#moocContent").append(content);

  hljs.initHighlightingOnLoad();
}

function postData(url, data, cb) {
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

  postData(urlMoocGetChapContOnly, jsonData, cbSetChapContent);
}
