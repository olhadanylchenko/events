const app = require("../app");
//const request = require("supertest");
var request = require("supertest")(app);
const should = require("should");
const chai = require("chai");
const { set } = require("../app");
const { post } = require("superagent");

const testUserCredentials = {
  displayName: "Test Olia",
  email: "user-test1@gmail.com",
  password: "12345678",
  birthDate: "03-06-1994",
};

describe("POST /users/register", function () {
  before(deleteUser());

  it("should validate all required fields", function (done) {
    request.post("/users/register").send({}).expect();
    done();
  });

  it("should check that email is unique", function (done) {
    done();
  });
  it("should validate password length >7 characters", function (done) {
    done();
  });
  it("should validate email is a real email", function (done) {
    done();
  });
  it("should validate birthDate is a real date", function (done) {
    done();
  });
});

describe("GET /events/mine", function () {
  it("should require authorization", function (done) {
    request
      .get("/events/mine")
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  const auth = {};
  before(loginUser(auth));

  it("should respond with JSON array", function (done) {
    request
      .get("/events/mine")
      .set("Authorization", "Bearer " + auth.token)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

function loginUser(auth) {
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

function deleteUser() {
  return function (done) {
    request
      .post("/users/authenticate")
      .send(userCredentials)
      .expect(200)
      .end(function (err, res) {
        request
          .delete(`/users/${res._id}`)
          .expect(200)
          .end(function (err, res) {
            return done();
          });
      });
  };
}
