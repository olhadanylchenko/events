const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const organisationSchema = new Schema({
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  categories: [String],
  privateOrPublic: {
    type: String,
    enum: ["public", "private"],
  },
});

const Organisation = model("Organisation", organisationSchema);
module.exports = Organisation;
