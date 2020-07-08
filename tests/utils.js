const app = require("../app");
var request = require("supertest")(app);

function reqisterUser(testUserCredentials, auth = {}) {
  return function (done) {
    request
      .post("/users/register")
      .send(testUserCredentials)
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}

function loginUser(testUserCredentials, auth) {
  return function (done) {
    request
      .post("/users/authenticate")
      .send(testUserCredentials)
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}

function deleteUser(testUserCredentials) {
  return function (done) {
    request
      .post("/users/authenticate")
      .send(testUserCredentials)
      .expect(200)
      .end(function (err, res) {
        request
          .delete(`/users/${res.body._id}`)
          .set("Authorization", "Bearer " + res.body.token)
          .end(function (err, res) {
            return done();
          });
      });
  };
}

module.exports = { reqisterUser, loginUser, deleteUser };
