/* global User, Movie */

$(function () {
  console.log('document loaded');
  console.log('User:', User);
  console.log('Movie:', Movie);
  // default screen:
  User.controller.index();
});
