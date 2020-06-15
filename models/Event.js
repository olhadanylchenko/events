const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "hostModel",
  },
  hostModel: {
    enum: ["User", "Organisation"],
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/artistree/image/upload/v1590111521/artistree/defaultimage2_t4vr0n.png",
  },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  categories: [String],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  privateOrPublic: {
    type: String,
    enum: ["public", "private"],
  },
});

const Event = model("Event", eventSchema);
module.exports = Event;
