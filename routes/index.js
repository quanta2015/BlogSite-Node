var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbHelper');


router.get('/blog', function(req, res, next) {

  dbHelper.findNews(req, function (success, data) {
    // res.send(doc);
    // res.render('blog', { entries: doc , layout: 'main'});
    res.render('blog', {
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
