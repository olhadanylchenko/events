const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const friendshipSchema = new Schema({
  friend1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  friend2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Friendship = model("Friendship", friendshipSchema);
module.exports = Friendship;
