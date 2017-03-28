var mongoose = require('mongoose');
var User = require('../models/user-model');
var Movie = require('../models/movie-model');

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2-movie';

function seedData() {
  var user = new User();
  var movie1 = new Movie();
  var movie2 = new Movie();

  user.firstName = 'John';
  user.lastName = 'Smith';
  user.email = 'jsmith@example.com';

  user.save(function (err, userSaved) {
    if (err) {
      console.log('could not add', userSaved.firstName, ':', err);
      process.exit(1);
    }
    console.log('userSaved:', userSaved);
    movie1.title = 'Rambo';
    movie1.year = '1985';
    movie1.genre = 'Action';
    movie1.save(function (err, movie1Result) {
      if (err) {
        console.log('could not create movie1: err:', err);
        process.exit(1);
      }
      console.log('movie1 saved:', movie1Result);
      movie2.title = 'Fast and Furious';
      movie2.year = '2016';
      movie2.genre = 'Action';
      movie2.save(function (err, movie2Result) {
        if (err) {
          console.log('could not create movie2: err:', err);
          process.exit(1);
        }
        console.log('movie2 saved:', movie2Result);

        userSaved.movies.push(movie1._id);
        userSaved.movies.push(movie2._id);
        userSaved.save(function (err, userWithMoviesSaved) {
          if (err) {
            console.log('could not update saved user with movies: err:', err);
            process.exit(1);
          }
          console.log('user with movies saved:', userWithMoviesSaved);
          mongoose.connection.close();
        });
      });
    });
  });
}

function initDb() {
  mongoose.connect(MONGODB_URI, {}, function (err) {
    if (err) {
      console.log('could not connect to db: err:', err);
      process.exit(1);
    }
    console.log('connected to', mongoose.connection.name);
    User.remove({}, function(err) {
      if (err) {
        console.log('could not drop user collection: err:', err);
        process.exit(1);
      }
      console.log('emptied user collection');
      Movie.remove({}, function(err) {
        if (err) {
          console.log('could not drop Movie collection: err:', err);
          process.exit(1);
        }
        console.log('emptied Movie collection');
        seedData();
      });
    });
  });
}

initDb();
