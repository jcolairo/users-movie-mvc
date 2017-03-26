// TODO: implement seedData()
console.warn('NOTE! This is where you will seed your database.');
console.warn('NOTE! Remember to change Game & Player to your primary & secondary model names... and the comments too!');

var mongoose = require('mongoose');
var User = require('../models/user-model');
var Movie = require('../models/movie-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2-movie';

function seedData() {
  var user1 = new User();
  var user2 = new User();
  var movie = new Movie();
  var userSaved = [];

  user1.firstName = 'John';
  user1.lastName = 'Smith';
  user1.email = 'jsmith@example.com';
  user2.firstName = 'Bob';
  user2.lastName = 'Far';
  user2.email = 'bfar@example.com';

  user1.save(function (err, user1Result) {
    if (err) {
      console.log('could not add', user1.firstName ,'to the menu: err:', err);
      process.exit(1);
    }
    userSaved.push(user1Result);
    user2.save(function (err, user2Result) {
      if (err) {
        console.log('could not add', user2.firstname ,'to the menu: err:', err);
        process.exit(1);
      }
      userSaved.push(user2Result);
      console.log('userSaved:', userSaved);
      user1.firstName = 'John';
      user1.lastName = 'Smith';
      user1.email = 'jsmith@example.com';
      user1.menu.push(userSaved[0]._id);
      user1.menu.push(userSaved[1]._id);
      user1.save(function (err, userResult) {
        if (err) {
          console.log('could not create user: err:', err);
          process.exit(1);
        }
        console.log('user saved:', userResult);
        mongoose.connection.close();
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
          console.log('could not drop Food collection: err:', err);
          process.exit(1);
        }
        console.log('emptied Food collection');
        seedData();
      });
    });
  });
}

initDb();
