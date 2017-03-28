// define a globally-available object, which stores all functions related to a User
// TODO: use the User object as an example of how to implement it.
/* global User */
var Movie = {
  controller: {
    create: function (form) {
      var newMovie = {
        title: form.title.value,
        year: form.year.value,
        genre: form.genre.value,
        userId: form.userId.value

      };
      Movie.model.create(
        newMovie,
        function success() {
          User.controller.show(form.userId.value);
        },
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
        }
      );
    }

  },
  model: {

    create: function (data, success, error) {
      $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '/movies',
        data: data,
        success: success,
        error: error
      });
    }
  }
};
