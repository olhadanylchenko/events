const app = require("../app");
//const request = require("supertest");
var request = require("supertest")(app);
const should = require("should");
const chai = require("chai");
const testUser1Credentials = {
  email: "user-test2@gmail.com",
  password: "12345678",
  birthDate: "03-06-1994",
  username: "olia",
};

const testUser2Credentials = {
  email: "user-test4@gmail.com",
  password: "12345678",
  birthDate: "03-06-1994",
  username: "spencer",
};

describe("POST /users/register", function () {
  describe("validation", function () {
    it("should validate all required fields", function (done) {
      request
        .post("/users/register")
        .send({})
        .expect(400, { message: "All required fields should be filled out" })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it("should validate password length >7 characters", function (done) {
      request
        .post("/users/register")
        .send({ ...testUser1Credentials, password: "1234567" })
        .expect(422, {
          message: "Password must be at least 8 characters long",
        })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it("should validate email is a real email", function (done) {
      request
        .post("/users/register")
        .send({ ...testUser1Credentials, email: "olia" })
        .expect(422, {
          message: "Invalid email",
        })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    it("should validate birthDate is a real date", function (done) {
      request
        .post("/users/register")
        .send({ ...testUser1Credentials, birthDate: "butts" })
        .expect(422, {
          message: "Invalid birth date",
        })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it("should validate username is urlSafe", function (done) {
      request
        .post("/users/register")
        .send({ ...testUser1Credentials, username: "    ??" })
        .expect(422, { message: "Invalid username" })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("unique data", function () {
    beforeEach(reqisterUser(testUser1Credentials));
    afterEach(deleteUser(testUser1Credentials));
    it("should check that email is unique", function (done) {
      request
        .post("/users/register")
        .send(testUser1Credentials)
        .expect(409, { message: "This email is already taken" })
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should check that username is unique", function (done) {
      request
        .post("/users/register")
        .send({ ...testUser1Credentials, email: "kokoko@ko.ko" })
        .expect(409, { message: "This username is already taken" })
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  describe("valid registration", function () {
    after(deleteUser(testUser1Credentials));
    it("should create a user with valid credentials", function (done) {
      request
        .post("/user/register")
        .send(testUser1Credentials)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});

// describe("GET /events/mine", function () {
//   it("should require authorization", function (done) {
//     request
//       .get("/events/mine")
//       .expect(401)
//       .end(function (err, res) {
//         if (err) return done(err);
//         done();
//       });
//   });

//   const auth = {};
//   before(loginUser(auth));

//   it("should respond with JSON array", function (done) {
//     request
//       .get("/events/mine")
//       .set("Authorization", "Bearer " + auth.token)
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .end(function (err, res) {
//         if (err) return done(err);
//         res.body.should.be.instanceof(Array);
//         done();
//       });
//   });
// });

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
