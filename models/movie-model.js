var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validationRules = {
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  }
};
var MovieSchema = new Schema(validationRules);
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
