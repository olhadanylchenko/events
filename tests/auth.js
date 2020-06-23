//const expect = require("chai").expect;
const app = require("../app");
//const request = require("supertest");
var request = require("supertest")(app);
const should = require("should");

const userCredentials = {
  email: "user-test1@gmail.com",
  password: "12345678",
};

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
      .send(userCredentials)
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.token;
      console.log(auth);

      return done();
    }
  };
}
