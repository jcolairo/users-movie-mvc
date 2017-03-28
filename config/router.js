var express = require('express');
var router = express.Router();
var usersController = require('../controller/user-controller');
var moviesController = require('../controller/movie-controller');
// TODO: fill in your router as required

router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);
// router.get('/users/new', usersController.new);
router.post('/users', usersController.create);

// router.get('/movies', moviesController.index);
// router.put('/movies/:id', moviesController.update);
// router.delete('/movies/:id', moviesController.destroy);
router.post('/movies', moviesController.create);


module.exports = router;
