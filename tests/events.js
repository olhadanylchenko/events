const app = require("../app");
var request = require("supertest")(app);
const should = require("should");
const chai = require("chai");
const { reqisterUser, loginUser, deleteUser } = require("./utils");

const testUser1Credentials = {
  email: "user-test2@gmail.com",
  password: "12345678",
  birthDate: "03-06-1994",
  username: "olia",
};

describe("GET /events/mine", function () {
  describe("authorisation", function () {
    it("should require authorization", function (done) {
      request
        .get("/api/events/mine")
        .expect(401)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("", function () {
    const auth = {};
    before(reqisterUser(testUser1Credentials));
    before(loginUser(testUser1Credentials, auth));
    after(deleteUser(testUser1Credentials));
    it("should respond with JSON array", function (done) {
      request
        .get("/api/events/mine")
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
});
