var preChapId, moocId;

$(init);

function init() {
  preChapId = $("[data-id]").first().data("id");
  moocId = $("#moocId").text();
  
}


$('[data-toggle="select"]').on('click', function (e) {
  e.preventDefault();
  var $this = $(this);
  var chapId = $this.data('id');
  var content = $("#moocContent").val();


  getChapContent( chapId, content);
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