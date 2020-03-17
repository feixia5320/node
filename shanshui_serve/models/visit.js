var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "timestamp": Number,
  "date": String,
  "iplist": [],
  "total": Number,
});

module.exports = mongoose.model('Visits', produtSchema, 'visits');
