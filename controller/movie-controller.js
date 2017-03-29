var Movie = require('../models/movie-model');

var User = require('../models/user-model');

// Action: create
function createMovie(req,res) {
  var newMovie = new Movie();

  var userId = req.body.userId;
  newMovie.title = req.body.title;
  newMovie.year = req.body.year;
  newMovie.genre = req.body.genre;

  newMovie.save(function (err, savedMovie) {
    if (err) {
      console.log('Could not create new movie:', err.message);
      res.status(500).json({ message: 'Could not create new movie'});
      return;
    }
    User.findOne({ _id: userId}, function (err, user) {
      if (err) {
        console.log('Could not find user');
      }
      user.movies.push(savedMovie._id);

      user.save(function (err) {
        if (err) {
          console.log('Could not create user with new movie: error:', err);
        }
        res.json({ message: 'Movie successfully added to user'});
      });
    });
  });
}


module.exports = {
  create: createMovie
};
