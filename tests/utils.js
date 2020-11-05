const app = require("../app");
var request = require("supertest")(app);

function reqisterUser(testUserCredentials, auth = {}) {
  return function (done) {
    request
      .post("/api/users/register")
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
      .post("/api/users/authenticate")
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
      .post("/api/users/authenticate")
      .send(testUserCredentials)
      .expect(200)
      .end(function (err, res) {
        if (res.body._id) {
          request
            .delete(`/api/users/${res.body._id}`)
            .set("Authorization", "Bearer " + res.body.token)
            .end(function (err, res) {
              return done();
            });
        } else {
          done();
        }
      });
  };
}

module.exports = { reqisterUser, loginUser, deleteUser };
