const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Friendship = require("../models/Friendship");
const userService = require("../services/user.service");

router.get(
  "/",
  /*middleware goes here?,*/ function (req, res) {
    console.log(req, "friendships");
    Friendship.find({
      $or: [{ friend1: req.user.id }, { friend2: req.user.id }],
    }).then((friendship) => res.json(friendship));
  }
);

router.post(
  "/:id",
  /*middleware goes here?,*/ function (req, res) {
    //console.log(req.body);
  }
);

module.exports = router;
