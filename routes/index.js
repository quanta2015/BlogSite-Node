var express = require('express');
var fs = require('fs');
var NodePDF = require('nodepdf');

var router = express.Router();
var dbHelper = require('../db/dbHelper');
var config = require('../config');



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


router.get('/moocs', function(req, res, next) {
  dbHelper.findMooc(req, function (success, data) {

    res.render('./moocs', {
      entries: data.results,
      pageCount: data.pageCount,
      pageNumber: data.pageNumber,
      count: data.count,
      layout: 'main'
    });
  })
});


router.get('/mooc/:id', function(req, res, next) {

  var id = req.params.id;
  dbHelper.findMoocOne( id,  function (success, doc) {
    res.render('./mooc', { entries: doc, layout: 'main' });
  })
});


router.post('/moocGetChapContentOnly', function(req, res, next) {

  var moocId    = req.body.moocId;
  var chapId    = req.body.chapId;
  var preChapId = req.body.preChapId;
  var content   = req.body.content;

  dbHelper.findMoocChapContentOnly( moocId, chapId, preChapId, content, function (success, doc) {
    res.send(doc);
  })
});

module.exports = router;
