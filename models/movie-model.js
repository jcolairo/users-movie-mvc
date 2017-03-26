var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validationRules = {
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  handle: {
    type: String
  }
};
var MovieSchema = new Schema(validationRules);
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
