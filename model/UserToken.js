const mongoose = require("mongoose");

const UserToken = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    ref: "User",
  },
  profilePic: {
    type: String,
    default: "/assets/images/profilePic.png",
    ref: "User",
  },
  bookmarked: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tweet",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d",
  },
});

module.exports = mongoose.model("UserToken", UserToken);
