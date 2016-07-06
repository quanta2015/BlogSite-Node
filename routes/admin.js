var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbHelper');
var formidable = require('formidable');
var entries = require('../db/jsonRes');

//渲染新建新闻页面
router.get('/news', function(req, res, next) {
  res.render('./admin/newsCreate', { title: 'Express', layout: 'admin' });
});

//创建新闻
router.post('/news', function(req, res, next) {
  dbHelper.addNews(req.body, function (success, doc) {
    res.send(doc);
  })
});

//渲染新闻列表页面
router.get('/newsList', function(req, res, next) {

  var msg = req.session['message'] || '';
  req.session['message'] = "";

  dbHelper.findNews(req, function (success, data) {

    res.render('./admin/newsList', {
      entries: data.results,
      pageCount: data.pageCount,
      pageNumber: data.pageNumber,
      count: data.count,
      layout: 'admin',
      message: msg
    });
  })
});


//删除新闻
router.get('/newsDelete/:id', function(req, res, next) {

  var id = req.params.id;
  dbHelper.deleteNews(id, function (success, data) {

    req.session['message'] = data.msg;
    res.redirect("/admin/newsList");
  })
});

//上传图片
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


//渲染新建新闻页面
router.get('/moocList', function(req, res, next) {

  dbHelper.findMooc(req, function (success, data) {

    res.render('./admin/moocList', {
      entries: data.results,
      pageCount: data.pageCount,
      pageNumber: data.pageNumber,
      count: data.count,
      layout: 'admin'
    });
  })

});

//渲染新建慕课页面
router.get('/moocCreate', function(req, res, next) {
  res.render('./admin/moocCreate', { layout: 'admin' });
});

router.post('/moocCreate', function(req, res, next) {
  dbHelper.addMooc(req.body, function (success, doc) {
    res.send(doc);
  })
});

//渲染编辑慕课页面
router.get('/moocEdit/:id', function(req, res, next) {

  var id = req.params.id;

  dbHelper.findMoocOne( id,  function (success, doc) {
    res.render('./admin/moocEdit', { entries: doc, layout: 'admin' });
  })
});

router.post('/moocGetChapContent', function(req, res, next) {


  var moocId    = req.body.moocId;
  var chapId    = req.body.chapId;
  var preChapId = req.body.preChapId;
  var content   = req.body.content;

  dbHelper.findMoocChapContent( moocId, chapId, preChapId, content, function (success, doc) {
    res.send(doc);
  })
});


module.exports = router;
