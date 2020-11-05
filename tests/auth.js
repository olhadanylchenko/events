const app = require("../app");
//const request = require("supertest");
var request = require("supertest")(app);
const should = require("should");
const chai = require("chai");
const testUser1Credentials = {
  email: "fewasnfjckxncjeuws@gmail.com",
  password: "12345678",
  birthDate: "03-06-1994",
  username: "fjewialsdhvjleasdcjiasd",
};
const { reqisterUser, loginUser, deleteUser } = require("./utils");

const testUser2Credentials = {
  email: "2wfueisdzkjsvaknl3wksdj@gmail.com",
  password: "12345678",
  birthDate: "03-06-1994",
  username: "fuheailfeajlveiwiasjdfwe",
};

describe("POST /api/users/register", function () {
  describe("validation", function () {
    it("should validate all required fields", function (done) {
      request
        .post("/api/users/register")
        .send({})
        .expect(400, { message: "All required fields should be filled out" })
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it("should validate password length >7 characters", function (done) {
      request
        .post("/api/users/register")
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
        .post("/api/users/register")
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
        .post("/api/users/register")
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
        .post("/api/users/register")
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
        .post("/api/users/register")
        .send(testUser1Credentials)
        .expect(409, { message: "This email is already taken" })
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
    it("should check that username is unique", function (done) {
      request
        .post("/api/users/register")
        .send({ ...testUser1Credentials, email: "kokoko@ko.ko" })
        .expect(409, { message: "This username is already taken" })
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  describe("valid registration", function () {
    after(deleteUser(testUser2Credentials));
    it("should create a user with valid credentials", function (done) {
      request
        .post("/api/users/register")
        .send(testUser2Credentials)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
