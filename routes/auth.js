const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");

// routes
router.post("/register", register);
router.post("/authenticate", authenticate);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

async function authenticate(req, res, next) {
  try {
    const user = await userService.authenticate(req.body);
    user
      ? res.json(user)
      : res.status(400).json({ message: "Email or password is incorrect" });
  } catch (err) {
    next(err);
  }
}

async function register(req, res, next) {
  try {
    const user = await userService.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.status) {
      res.status(err.status).json({
        message: err.message,
      });
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

async function getAll(req, res, next) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getCurrent(req, res, next) {
  try {
    const user = await userService.getById(req.user._id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getById(req.params.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    await userService.update(req.params.id, req.body);
    res.json({});
  } catch (err) {
    next(err);
  }
}

async function _delete(req, res, next) {
  try {
    await userService.delete(req.params.id);
    console.log("delete!");
    res.json({});
  } catch (err) {
    next(err);
  }
}
