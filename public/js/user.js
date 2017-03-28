// define a globally-available object, which stores all functions related to a User
// Note: this is a singleton, so we are following the convention of giving a singleton an init capital letter.

var User = {
  controller: {
    index: function () {
      var $content = $('#content');

      User.model.index(
        function success(data) {
          var html = User.view.index(data);

          // set the HTML in the content div
          $content.html(html);
        },
        function error() {
          // TODO: what will you do when an error occurs?
          // Display a message somewhere?
          // What parameters are passed to this anonymous function?
          //   - read the jQuery docs
          //   - use console.log() to confirm
          // See: https://api.jquery.com/jQuery.ajax/
        }
      );
    },
    show: function (userId) {
      User.model.show(
        userId,
        function success(data) {
          var showHtml = User.view.show(data);

          $('#content').html(showHtml);
        },
        function error() {
          // $('#error-message').html(err.responseJSON.message);
        }
      );
    },
    create: function (form) {
      var newUser = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value
      };

      User.model.create(
        newUser,
        function success() {
          User.controller.index();
        },
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
        }
      );
    },
    new: function () {
      var $content = $('#content');

      User.model.create(
        function success() {
          var createHtml = User.view.new();
          $content.html(createHtml);
        },
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
        }
      );
    },
    edit: function (userId) {
      var $content = $('#content');

      User.model.show(
        userId,
        function success(data) {
          var showHtml = User.view.edit(data);

          $content.html(showHtml);
        },
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
        }
      );
    },
    update: function (form) {
      var updatedUser = {
        id: form.userId.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value
      };

      User.model.update(
        updatedUser,
        function success() {
          User.controller.index();
        },
        function error(err) {
          console.log('ERROR: err:', err);
          $('#error-message').html(err.responseJSON.message);
        }
      );
    },
    destroy: function (userId) {
      User.model.destroy(
        userId,
        function success() {
          User.controller.index();
        },
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
        }
      );
    }
  },
  // the following object contains methods related to generating the View - ie, the HTML:
  view: {
    // this maps directly to the `index` route (remember the 7 RESTful routes?)
    index: function (user) {
      var html = `
        <h2>Users</h2>
        <ul>
      `;

      for(var i = 0; i < user.length ; i++) {
        html += `
          <li>
            <a href="#" onclick="User.controller.show('${user[i]._id}')">${user[i].firstName} ${user[i].lastName}</a>
            <button onclick="User.controller.edit('${user[i]._id}')" type="button">edit</button>
            <button onclick="User.controller.destroy('${user[i]._id}')" type="button">delete</button>
          </li>
        `;
      }

      html += `</ul>`;

      html+= `
        <form name="newUser">
          <input type="text" name="firstName" placeholder="First Name">
          <input type="text" name="lastName" placeholder="Last Name">
          <input type="email" name="email" placeholder="Email">
          <button onclick="User.controller.create(newUser)" type="button">Create</button>
        </form>
      `;
      return html;
    },
    edit: function(user) {
      return `
        <h2>Edit User</h2>

        <form name="editUser">
        <input type="hidden" name="userId" value="${user._id}">

        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" value="${user.firstName}">

        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" value="${user.lastName}">

        <label for="email">Email</label>
        <input id="email" name="email" value="${user.email}">

        <button onclick="User.controller.update(editUser)" type="button">Update</button>
        <button onclick="User.controller.index()" type="button">Cancel</button>
      </form>
      `;
    },
    show: function(user) {
      var html = `
        <h2>Show User</h2>

        <p><strong>First name:</strong> ${user.firstName}</p>
        <p><strong>Last name:</strong> ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>

        <p><strong>Movies:</strong></p>
        <ul>
      `;

      for (var i = 0; i < user.movies.length; i++) {
        html += `
          <li>
            <em>${user.movies[i].title}<em>
            (${user.movies[i].year} &ndash; ${user.movies[i].genre})
          </li>
        `;
      }

      html += `
        </ul>

        <button onclick="User.controller.index()" type="button">Back</button>
      `;
      html += `
        <h2>New Movie</h2>

        <form name="newMovie">
          <input type="hidden" name="userId" value="${user._id}">

          <label for="title">Title</label>
          <input id="title" name="title">

          <label for="year">Year</label>
          <input id="year" name="year">

          <label for="genre">Genre</label>
          <input id="genre" name="genre">

          <button onclick="Movie.controller.create(newMovie)" type="button">Create</button>
        </form>
      `;

      return html;
    },
    // generate the HTML to create a new User
    new: function () {
      var createHtml = `
        <h2>New User</h2>

        <form name="newUser">
          <input type="hidden" name="userId">

          <label for="firstName">First Name</label>
          <input id="firstName" name="firstName">

          <label for="lastName">Last Name</label>
          <input id="lastName" name="lastName">

          <label for="email">Email</label>
          <input id="email" name="email">

          <button onclick="User.controller.create(newUser)" type="button">Create</button>
        </form>
      `;
      return createHtml;
    }
    // generate the HTML to edit an existing User
  },
  // the following object contains model-related methods
  // ie AJAX calls to implement the relevant RESTful methods:
  model: {
    // this maps to the `index` route
    // see jQuery docs for `success` and `error` callbacks:
    //  https://api.jquery.com/jQuery.ajax/
    index: function (success, error) {
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/users',
        success: success,
        error: error
      });
    },
    show: function (id, success, error) {
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: `/users/${id}`,
        success: success,
        error: error
      });
    },
    create: function (data, success, error) {
      $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '/users',
        data: data,
        success: success,
        error: error
      });
    },
    update: function (data, success, error) {
      $.ajax({
        method: 'PUT',
        dataType: 'json',
        url: `/users/${data.id}`,
        data: data,
        success: success,
        error: error
      });
    },
    destroy: function (id, success, error) {
      $.ajax({
        method: 'DELETE',
        url: `/users/${id}`,
        success: success,
        error: error
      });
    }
  }
};
