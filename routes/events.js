const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Organisation = require("../models/Organisation");
const Event = require("../models/Event");
const Friendship = require("../models/Friendship");

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/mine", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      categories,
      startDate,
      endDate,
      visibility,
      attendees,
    } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        categories,
        startDate,
        endDate,
        visibility,
        attendees,
      },
      { new: true }
    );
    res.status(200).json(event);
  } catch (err) {
    json(err);
  }
});

module.exports = router;
