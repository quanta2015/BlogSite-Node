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


module.exports = router;
