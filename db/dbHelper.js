var mongoose = require('./db.js');
var User = require('./schema/user');
var entries = require('./jsonRes');



exports.addUser = function (data,cb) {
    
    var user = new User();
    user.username = data.usr;
    user.password = data.pwd;
    user.email    = data.email;
    user.adr      = data.adr;
    user.meta.updateAt = user.meta.createAt =Date.now();

    user.save(function(err,doc){
        if (err) {
            cb(false,err);
        }else{
            cb(true,entries);
        }
    })
};


