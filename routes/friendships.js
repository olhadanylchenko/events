const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Friendship = require("../models/Friendship");
const userService = require("../services/user.service");

router.get("/", function (req, res) {
  Friendship.find({
    $or: [{ friend1: req.user.id }, { friend2: req.user.id }],
  }).then((friendship) => res.json(friendship));
});

router.post(
  "/:id",
  /*middleware goes here?,*/ function (req, res) {
    return Friendship.create({
      friend1: req.user.id,
      friend2: req.params.id,
    })
      .then((friendship) => {
        res.status(200).json({ friendship });
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

router.delete("/:id", function (req, res) {
  Friendship.findByIdAndDelete(req.params.id)
    .then((friendship) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
