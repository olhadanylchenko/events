const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Organisation = require("../models/Organisation");
const Event = require("../models/Event");
const Friendship = require("../models/Friendship");

router.post("/", async function (req, res) {
  const {
    host,
    title,
    description,
    categories,
    startDate,
    endDate,
    visibility,
    attendees,
  } = req.body;
  try {
    const event = await Event.create({
      host,
      title,
      description,
      categories,
      startDate,
      endDate,
      visibility,
      attendees,
    });
    console.log("made an event");
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async function (req, res) {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/mine", async function (req, res) {
  try {
    const event = await Event.find({
      $or: [{ attendees: req.user.id }, { host: req.user.id }],
    });
    console.log(event, req.user.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
