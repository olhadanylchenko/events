const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");

module.exports = initialize;

function initialize() {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/events", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });

  const MongoStore = require("connect-mongo")(session);
  const app = express();

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  return app;
}
