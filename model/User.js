const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "/assets/images/profilePic.png",
    },
    bio: {
      type: String,
      default: "Greatness، of small steps!",
    },
    tweets: [
      {
        type: Schema.ObjectId,
        ref: "Tweet",
      },
    ],
    likedTweets: [
      {
        type: Schema.ObjectId,
        ref: "Tweet",
      },
    ],
    retweetedTweets: [
      {
        type: Schema.ObjectId,
        ref: "Tweet",
      },
    ],
    bookmarked: [
      {
        type: Schema.ObjectId,
        ref: "Tweet",
      },
    ],
    followers: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
module.exports = model("User", UserSchema);
