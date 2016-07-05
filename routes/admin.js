var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbHelper');
var formidable = require('formidable');
var entries = require('../db/jsonRes');

/* GET users listing. */
router.get('/news', function(req, res, next) {
  res.render('./admin/news', { title: 'Express', layout: 'admin' });
});

router.post('/news', function(req, res, next) {
  dbHelper.addNews(req.body, function (success, doc) {
    res.send(doc);
  })
});

router.get('/newsList', function(req, res, next) {
  dbHelper.findNews(req, function (success, data) {

    res.render('./admin/newsList', {
      entries: data.results,
      pageCount: data.pageCount,
      pageNumber: data.pageNumber,
      count: data.count,
      layout: 'admin'
    });
  })

});


router.post('/uploadImg', function(req, res, next) {

  var io = global.io;

  var form = new formidable.IncomingForm();
  var path = "";
  var fields = [];

  form.encoding = 'utf-8';
  form.uploadDir = "upload";
  form.keepExtensions = true;
  form.maxFieldsSize = 30000 * 1024 * 1024;


  var uploadprogress = 0;
  console.log("start:upload----"+uploadprogress);

  form.parse(req);

  form.on('field', function(field, value) {
    console.log(field + ":" + value);
  })
      .on('file', function(field, file) {
        path = '\\' + file.path;
      })
      .on('progress', function(bytesReceived, bytesExpected) {

        uploadprogress = (bytesReceived / bytesExpected * 100).toFixed(0);
        console.log("upload----"+ uploadprogress);
        io.sockets.in('sessionId').emit('uploadProgress', uploadprogress);
      })
      .on('end', function() {

        console.log('-> upload done\n');
        entries.code = 0;
        entries.data = path;
        res.writeHead(200, {
          'content-type': 'text/json'
        });
        res.end(JSON.stringify(entries));
      })
      .on("err",function(err){
        var callback="<script>alert('"+err+"');</script>";
        res.end(callback);//这段文本发回前端就会被同名的函数执行
      }).on("abort",function(){
        var callback="<script>alert('"+ttt+"');</script>";
        res.end(callback);
      });


});


module.exports = router;
