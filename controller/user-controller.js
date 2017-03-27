var User = require('../models/user-model');

require('../models/movie-model');

//Action: index
function indexUsers(req, res) {
  User.find({}, function (err, users) {
    if (err) {
      console.log('Could not get list of users:', err.message);
      res.status(500).json({ message: 'Could not get list of users' });
      return;
    }
    res.json(users);
  });
}

// Action: create
function createUser(req, res) {
  var newUser = new User();

  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.email = req.body.email;

  newUser.save(function (err, savedUser) {
    if (err) {
      console.log('Could not create new user: error:', err.message);
      res.status(500).json({ message: 'Could not create new user' });
      return;
    }
    res.status(200).json(savedUser);
  });
}

// Action: update
function updateUser(req, res) {
  var userId = req.params.id;
  var updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  User.findOneAndUpdate({_id: userId}, updatedUser, function (err) {
    if (err) {
      console.log('Could not get existing user to update:', err.message);
      res.status(404).json({ message: 'Could not get existing user to update' });
      return;
    }
    res.status(200).json(updatedUser);
  });
}

// Action: show
function showUser (req, res) {
  var userId = req.params.id;

  User.findOne({_id: userId}).populate('movies').exec(
    function (err, user) {
      if (err) {
        console.log('Could not get user:', err.message);
        res.status(404).json({ message: 'Could not get user' });
        return;
      }
      res.status(200).json(user);
    }
  );
}

// Action: destroy
function destroyUser(req, res) {
  var userId = req.params.id;

  User.deleteOne({_id: userId}, function (err) {
    if (err) {
      console.log('Could not get user to delete:', err.message);
      res.status(404).json({ message: 'Could not get user to delete' });
      return;
    }
    res.status(200).json({ message: 'User successfully deleted' });
  });
}

module.exports = {
  index: indexUsers,
  create: createUser,
  update: updateUser,
  show: showUser,
  destroy: destroyUser
};
