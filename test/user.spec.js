/*  global describe, it, beforeEach */

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
var TestUtils = require('./test-utils');
var expect = chai.expect;
var request;

chai.should();
chai.use(chaiHttp);

describe('Users', function () {
  beforeEach(function () {
    request = chai.request(app);
  });

  describe('GET', function () {
    it('Should retunr error for invalid URL GET', function (done) {
      request
      .get('/invalid_url')
      .end(function (err) {
        expect(err).not.to.be.null;
        done();
      });
    });
    it.only('Should list all users for GET /users', function (done) {
      request
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null;
        res.should.have.status(200);
        // res.should.be.html;
        res.text.should.match(/users/);
        done();
      });
    });
  });

  describe('PUT', function () {
    it('Should return error for non-existing user id', function (done) {
      request
      .put('/users/non-existent-user-id')
      .end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
    it('Should return correct result for existing user', function (done) {
      request
      .get('/users')
      .end(function (err, res) {
        var userId = TestUtils.getFirstUserIdFromUserListHTML(res.text);

        request
        .put('/users' + userId)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ firstName: 'testFirstName', lastName: 'testLastName', email: 'testemail@example.com'})
        .end(function (err, res) {
          res.should.have.status(200);
          res.text.should.match(/testFirstName/);
          res.text.should.match(/testLastName/);
          done();
        });
      });
    });

    describe('DELETE', function () {
      it('Should return error for non-existent user id', function (done) {
        request
        .delete('/users/non-existent-user-id')
        .end(function (err, res) {
          res.should.have.status(404);
          done();
        });
      });
      it('Should return result for existing user', function (done) {
        request
          .get('/users')
          .end(function (err, res) {
            var userId = TestUtils.getFirstUserIdFromUserListHTML(res.text);

            request
              .delete('/users/' + userId)
              .end(function (err, res) {
                res.should.have.status(200);
                done();
              });
          });
      });
    });
  });
});
