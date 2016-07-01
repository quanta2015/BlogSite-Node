var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbHelper');
var fs = require('fs');
var NodePDF = require('nodepdf');
var config = require('../config');


router.get('/', function(req, res, next) {
  res.render('login', { layout: 'lg' });
});

router.post('/', function(req, res, next) {
  dbHelper.findUsr(req.body, function (success, doc) {
    req.session.user = doc.data;
    res.send(doc);
  })
});


module.exports = router;
