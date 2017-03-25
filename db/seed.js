// TODO: implement seedData()
console.warn('NOTE! This is where you will seed your database.');
console.warn('NOTE! Remember to change Game & Player to your primary & secondary model names... and the comments too!');

var mongoose = require('mongoose');
var User = require('../models/user-model');
var Food = require('../models/movie-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2';

function seedData() {
  var movie1 = new Food();
  var movie2 = new Food();
  var user = new User();
  var menuSaved = [];

  movie1.name = 'Krabby Patty';
  movie1.course = 'Main';
  movie1.price = '$100';
  movie2.name = 'Krusty Krab Pizza';
  movie2.course = 'Main';
  movie2.price = '$50';

  movie1.save(function (err, movie1Result) {
    if (err) {
      console.log('could not add', movie1.name ,'to the menu: err:', err);
      process.exit(1);
    }
    menuSaved.push(movie1Result);
    movie2.save(function (err, movie2Result) {
      if (err) {
        console.log('could not add', movie2.name ,'to the menu: err:', err);
        process.exit(1);
      }
      menuSaved.push(movie2Result);
      console.log('menuSaved:', menuSaved);
      user.name = 'Krusty Krab';
      user.location = 'Bikini Bottom';
      user.cuisineStyle = 'Underwater American Glory';
      user.menu.push(menuSaved[0]._id);
      user.menu.push(menuSaved[1]._id);
      user.save(function (err, userResult) {
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
      Food.remove({}, function(err) {
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
