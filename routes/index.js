var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbHelper');
var config = require('../config');


var fs = require('fs');
var NodePDF = require('nodepdf');



router.get('/pdf/:id', function (req, res, next) {

  var id = req.params.id;

  var host = req.protocol + '://' + req.get('host') + '/blog/' + id;
  var pdffile = config.site.path + '\\news-' + Date.now() + '.pdf';

  NodePDF.render(host, pdffile, function(err, filePath){
    if (err) {
      console.log(err);
    }else{
      fs.readFile(pdffile , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
      });
    }
  });

  // phantom.create().then(ph => {
  //     _ph = ph;
  //   return _ph.createPage();
  // }).then(page => {
  //     _page = page;
  //   return _page.open(host);
  // }).then(status => {
  //     console.log(status);
  //   return _page.property('content')
  // }).then(content => {
  //     console.log(content);
  //    _page.render(pdffile);
  //
  //   fs.readFile(pdffile , function (err,data){
  //     res.contentType("application/pdf");
  //     res.send(data);
  //     _page.close();
  //     _ph.exit();
  //   });
  // });

// var PDFDocument = require('pdfkit')
// var fs = require('fs');
// var doc = new PDFDocument()
  // var text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';
  // doc.pipe(fs.createWriteStream('/file.pdf'));
  // doc.text(text, 100, 100);
  // doc.pipe(res)
  // doc.end();

})

router.get('/blog/:id', function(req, res, next) {

  var id = req.params.id;
  dbHelper.findNewsOne(req, id, function (success, data) {
    res.render('blog', {
      entries: data,
    });
  })
});


router.get('/blogs', function(req, res, next) {
  dbHelper.findNews(req, function (success, data) {
    res.render('blogs', {
      entries: data.results,
      pageCount: data.pageCount,
      pageNumber: data.pageNumber,
      count: data.count,
    });
  })
});

router.get('/login', function(req, res, next) {
  res.render('login', { layout: 'lg' });
});

router.post('/login', function(req, res, next) {
  dbHelper.findUsr(req.body, function (success, doc) {
    res.send(doc);
  })
});

module.exports = router;
