var mongoose = require('../db');
var Schema = mongoose.Schema;


/* 用户定义 */
var userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String},
    address: {type: String},
    meta: {
        updateAt: {type:Date, default: Date.now()},
        createAt: {type:Date, default: Date.now()}
    }
});

module.exports = mongoose.model('User', userSchema);
