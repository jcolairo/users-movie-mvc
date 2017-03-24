var express = require('express');
var router = express.Router();
var Users = require('../models/user-model');
// var usersController = require('../controllers/users-controller');

// TODO: fill in your router as required
router.get('/users', function (req, res) {
  // TODO: this is where you'd get your Game data from your database
  // and of course this will be in a separate controller file, as we've done before
  res.json([
    {
      title: 'PacMan'
    },
    {
      title: 'Galaxian'
    },
    {
      title: 'Asteroids'
    }
  ]);
});

module.exports = router;
