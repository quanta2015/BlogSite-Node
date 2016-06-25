var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbHelper');


router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Express', layout: 'main' });
});

router.get('/', function(req, res, next) {
  res.render('login', { layout: 'lg' });
});

router.post('/', function(req, res, next) {
  // var usr = req.body.usr;
  // var pwd = req.body.pwd;
  // res.send(JSON.stringify(entries));
  // 
  dbHelper.addUser(req.body,function(success,doc){
    if(success) {
      res.send(doc);
    }else{
      console.log(doc);
    }
  })
});

module.exports = router;
