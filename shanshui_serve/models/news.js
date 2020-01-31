var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "title": String,
  "date": String,
  "url": String,
});

module.exports = mongoose.model('News', produtSchema, 'news');
