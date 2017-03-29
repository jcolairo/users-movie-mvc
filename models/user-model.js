var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validationRules = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
};
var UserSchema = new Schema(validationRules);
var User = mongoose.model('User', UserSchema);

module.exports = User;
