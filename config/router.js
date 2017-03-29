var express = require('express');
var router = express.Router();
var usersController = require('../controller/user-controller');
var moviesController = require('../controller/movie-controller');

router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);
router.post('/users', usersController.create);

router.post('/movies', moviesController.create);


module.exports = router;
