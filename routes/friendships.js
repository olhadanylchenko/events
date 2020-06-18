const express = require("express");
const router = express.Router();

const Friendship = require("../models/Friendship");

router.get("/", async function (req, res) {
  const friendship = await Friendship.find({
    $or: [{ friend1: req.user.id }, { friend2: req.user.id }],
  });
  res.json(friendship);
});

router.post("/:id", async function (req, res) {
  try {
    const friendship = await Friendship.create({
      friend1: req.user.id,
      friend2: req.params.id,
    });
    res.status(200).json({ friendship });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    await Friendship.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
