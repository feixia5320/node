var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "date": String,
  "fileId": String,
  "fileName": String,
});

module.exports = mongoose.model('Uploadfiles', produtSchema, 'uploadfiles');
