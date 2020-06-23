const expressJwt = require("express-jwt");

const userService = require("../services/user.service");

module.exports = jwt;

function jwt() {
  const secret = process.env.SESSION_SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register",
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload._id);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
