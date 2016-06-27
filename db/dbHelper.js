var entries = require('./jsonRes');
var mongoose = require('./db.js');
var User = require('./schema/user');
var News = require('./schema/news');

var webHelper = require('../lib/webHelper');
var md = webHelper.Remarkable();

exports.findUsr = function(data, cb) {

    User.findOne({
        username: data.usr
    }, function(err, doc) {
        var user = (doc !== null) ? doc.toObject() : '';

        if (err) {
            console.log(err)
        } else if (doc === null) {
            entries.code = 99;
            entries.msg = '用户名错误！';
            cb(false, entries);
        } else if (user.password !== data.pwd) {
            entries.code = 99;
            entries.msg = '密码错误！';
            cb(false, entries);
        } else if (user.password === data.pwd) {
            entries.data = user;
            entries.code = 0;
            cb(true, entries);
        }
    })
}

exports.addUser = function(data, cb) {

    var user = new User({
        username: data.usr,
        password: data.pwd,
        email: data.email,
        adr: data.adr
    });

    user.save(function(err, doc) {
        if (err) {
            cb(false, err);
        } else {
            cb(true, entries);
        }
    })
};

exports.addNews = function(data, cb) {


    data.content = md.render(data.content);

    var news = new News({
        title: data.title,
        content: data.content,
        author:data.id
    });

    news.save(function(err,doc){
        if (err) {
            cb(false,err);
        }else{
            cb(true,entries);
        }
    })
};

exports.findNews = function(data, cb) {
    News.find()
        .populate('author')
        .exec(function(err, docs) {

            var newsList=new Array();
            for(var i=0;i<docs.length;i++) {
                newsList.push(docs[i].toObject());
            }
            cb(true,newsList);
        });

};