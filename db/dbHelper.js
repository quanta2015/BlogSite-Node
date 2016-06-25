var mongoose = require('./db.js');
var User = require('./schema/user');
var entries = require('./jsonRes');

exports.findUsr = function (data,cb) {

    User.findOne({username:data.usr}, function (err, doc) {
        var user = (doc !== null )?doc.toObject():'';

        if(err) {
            console.log(err)
        }else if(doc === null ) {
            entries.code = 99;
            entries.msg = '用户名错误！';
            cb(false,entries);
        }else if(user.password !== data.pwd) {
            entries.code = 99;
            entries.msg = '密码错误！';
            cb(false,entries);
        }else if(user.password === data.pwd){
            entries.data = user;
            entries.code = 0;
            cb(true,entries);
        }
    })
}

exports.addUser = function (data,cb) {
    
    var user = new User({
        username: data.usr,
        password: data.pwd,
        email   : data.email,
        adr     : data.adr
    });

    user.save(function(err,doc){
        if (err) {
            cb(false,err);
        }else{
            cb(true,entries);
        }
    })
};


