/**
 * test/test.js
 * Basic tests for Auth system API
 */
const chai = require("chai");
const expect = chai.expect;

//start app
const app = require("../app");

describe("App", () => {
  it("Should exist", () => {
    expect(app).to.be.a("function");
  });
});
