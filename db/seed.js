// TODO: implement seedData()
console.warn('NOTE! This is where you will seed your database.');
console.warn('NOTE! Remember to change User & Movie to your primary & secondary model names... and the comments too!');

var mongoose = require('mongoose');
var User = require('../models/user-model');
var Movie = require('../models/movie-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2-movie';

function seedData() {
  console.warn('NOTE! seedData() needs to be implemented');
  mongoose.connection.close();
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
        console.log('could not drop User collection: err:', err);
        process.exit(1);
      }
      console.log('emptied User collection');
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
