var mongoose = require('../db');
var Schema = mongoose.Schema;



var chapterSchema = new Schema({
    moocId: String,
    week: Number,
    chapter: Number,
    content: String,
    meta: {
        updateAt: {type:Date, default: Date.now()},
        createAt: {type:Date, default: Date.now()}
    }
});

chapterSchema.pre('save', function (next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next();
})

module.exports = mongoose.model('Chapter', chapterSchema);
