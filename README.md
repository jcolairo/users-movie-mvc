# Sparta Global Webdev4 Project 2: Favourite Movies

## Synopsis
This project uses a rMVC approach and utilises HTTP requests. It allows the creation of new users and also updates the database so the user can add their favourite movies.


## Motivation

This project was undertaken to solidify understand of HTTP methods and how this works server side and client side

## Installation

To use this app:
* Clone the [repository](https://github.com/jcolairo/users-movie-mvc.git)
* In the command line `npm install` (this will install all the necessary dependancies stored in the `package.json` file)
* To use locally you will need to run the seed file (pre-created data for users and movies) with this command in the terminal `npm run seed`.
* In order to spin up the server the following command must be inputted to the terminal `npm run nodemon`.

## Functions
* In order to create a user enter a first name, last name and email in the New User form, and press create.
* The app allows the user to edit and delete their details
* The user can also add their favourite movies

##Technologies Used
* The server is running with [`node.js`](https://nodejs.org/en/)
* The database used is [`MongoDb`](https://www.mongodb.com/)
* The model is processed via `mongod`.
* The views are generated via [`AJAX`](https://developer.mozilla.org/en-US/docs/AJAX)
* The app is built with HTML and CSS
* Animations are controlled via CSS
* The apps behaviours (eg click events) are handle via [`jQuery`](https://jquery.com/) and installed via [`bower`](https://bower.io/)

## Contributors

[David Corkett](https://github.com/morkett)
[James Colairo](https://github.com/jcolairo)
