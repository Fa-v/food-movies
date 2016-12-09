var mongoose = require('mongoose');

var Schema = mongoose.Schema;

movieSchema = new Schema ({
  title: String,
  director: String,
  date: String,
  synopsis: String
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;