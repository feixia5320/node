var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "userId": { type: String },
  "news": [
    {
      "title": String,
      "date": String,
      "url": String,
    }
  ],
});

module.exports = mongoose.model('News', produtSchema, 'news');
