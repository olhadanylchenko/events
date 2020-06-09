const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/artistree/image/upload/v1590111521/artistree/defaultimage2_t4vr0n.png",
    },
    displayName: String,
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
