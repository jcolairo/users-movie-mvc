var User = {
  controller: {
    index: function () {
      var $content = $('#content');

      User.model.index(
        function success(data) {
          var html = User.view.index(data);
          $content.html(html);
        },
        function error() {
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
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
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
  view: {
    index: function (user) {
      var html = `
        <h2 id="userH2">Users</h2>
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
      <h2 class='newUserH2'>Add A New User</h2>
        <form name="newUser" id='formNewUser'>
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
      <h2 class='newUserH2' id='newUserH2'>Edit User</h2>

      <form name="editUser" id='editForm'>
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
      var html =
        `
          <h2 class='newUserH2' id='showUserH2' class='align'>Show User</h2>

          <p class='align' ><strong>First name:</strong> ${user.firstName}</p>
          <p class='align'><strong>Last name:</strong> ${user.lastName}</p>
          <p class='align'><strong>Email:</strong> ${user.email}</p>
          <p class='align' id ='favTitle'><strong>Favourite Movies</strong></p>
          <ul id = 'movieList'>

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
        <button class='backBtn' onclick="User.controller.index()" type="button">Back</button>
        `;
      html += `
        <h2 id='newMovieTitle'>New Movie</h2>

        <form name="newMovie" id='newMovie'>
          <input type="hidden" name="userId" value="${user._id}">

          <input id="title" name="title" placeholder="Title">

          <input id="year" name="year" placeholder="Year">

         <select name="genre" id="genre" placeholder="Genre">
           <option value="Action">Action</option>
           <option value="Comedy">Comedy</option>
           <option value="Thriller">Thriller</option>
           <option value="Romance">Romance</option>
           <option value="Horror">Horror</option>
           <option value="Animation">Animation</option>
           <option value="SciFi">SciFi</option>
           <option value="Drama">Drama</option>
           <option value="Documentary">Documentary</option>
         </select>

          <button onclick="Movie.controller.create(newMovie)" type="button">Create</button>
        </form>
      `;

      return html;
    },
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
  },
  model: {
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
