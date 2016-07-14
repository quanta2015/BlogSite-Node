var preChapId, moocId, updateChapId, selectChapId;

var defaults = {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // autoconvert URL-like texts to links
  linkTarget:   '',           // set target to open link in
  typographer:  true,         // Enable smartypants and other sweet transforms
  _highlight: true,
  _strict: false,
  _view: 'html'               // html / src / debug
};

defaults.highlight = function (str, lang) {
  if (!defaults._highlight || !window.hljs) { return ''; }

  var hljs = window.hljs;
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (__) {}
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (__) {}

  return '';
};

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
  md = new Remarkable('full', defaults);
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
