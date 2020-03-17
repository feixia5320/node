var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "id": String,
  "date": String,
  "title": String,
  "content": String
});

module.exports = mongoose.model('Active', produtSchema, 'active');
